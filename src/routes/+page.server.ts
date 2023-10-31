import type { Actions } from './$types'
import { createRI, createII, createDI, createLSI, createMFI } from '$lib'
import { isAllowedOP } from '$lib'
import { checkForConflicts } from '$lib'

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

			if (!isAllowedOP(op)) throw new Error('Invalid OP code')

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
					instructionSet.push(createII(op, rt, rs, parseInt(imm)))
					break
				case 'div':
					;[rs, rt] = rest.split(',')
					instructionSet.push(createDI(op, rs, rt))
					break
				case 'lw':
				case 'sw':
					let temp: string
					;[rt, temp] = rest.split(',')
					;[imm, rs] = temp.split('(')
					rs = rs.replace(')', '')
					instructionSet.push(createLSI(op, rt, parseInt(imm), rs))
					break
				case 'mfhi':
				case 'mflo':
					;[rd] = rest.split(',')
					instructionSet.push(createMFI(op, rd))
					break
			}
		})

		const pipeline = checkForConflicts(instructionSet)

		console.log(pipeline[pipeline.length - 1])

		const maxClock =
			5 +
			pipeline[pipeline.length - 1].offset +
			(pipeline[pipeline.length - 1].bubble > 0 ? 1 : 0)

		return {
			ok: true,
			instructionSet,
			pipeline,
			maxClock
		}
	}
} satisfies Actions

// LW $t0, 0($t1)
// LW $t2, 4($t1)
// ADD $t3, $t0, $t2
// SW $t3, 8($t1)
// LW $t4, 8($t1)
