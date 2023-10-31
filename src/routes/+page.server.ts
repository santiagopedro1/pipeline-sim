import type { Actions } from './$types'
import { instructions, createRI, createII, createDI, createLSI, createMFI } from '$lib'

export const actions = {
	default: async ({ request }) => {
		let instString = (await request.formData()).get('inst') as string
		instString = instString.toLowerCase()
		instString = instString.replace(/, /g, ',')

		const instructionSet: Instruction[] = []

		instString.split('\r\n').forEach((inst) => {
			if (inst === '') return
			const [op, rest] = inst.split(' ')
			let rd: string, rs: string, rt: string, imm: string

			switch (op) {
				case 'add':
				case 'sub':
				case 'mult':
					;[rd, rs, rt] = rest.split(',')
					instructionSet.push(createRI(op, rd, rs, rt))
					break
				case 'addi':
				case 'subi':
					;[rt, rs, imm] = rest.split(',')
					instructionSet.push(createII(op, rt, rs, Number(imm)))
					break
				case 'div':
					;[rs, rt] = rest.split(',')
					instructionSet.push(createDI(op, rs, rt))
					break
				case 'lw':
				case 'sw':
					// LW $t0, 0($t1)
					let temp: string
					;[rt, temp] = rest.split(',')
					;[imm, rs] = temp.split('(')
					rs = rs.replace(')', '')
					instructionSet.push(createLSI(op, rt, Number(imm), rs))
					break
				case 'mfhi':
				case 'mflo':
					;[rd] = rest.split(',')
					instructionSet.push(createMFI(op, rd))
					break
			}
		})
		return {
			ok: true,
			instructionSet
		}
	}
} satisfies Actions

// LW $t0, 0($t1)
// LW $t2, 4($t1)
// ADD $t3, $t0, $t2
// SW $t3, 8($t1)
// LW $t4, 8($t1)
