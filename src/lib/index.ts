import { writable } from 'svelte/store'

export const instructions = writable<Instruction[]>([])

export const createRI = (
	op: RInstruction['op'],
	rd: string,
	rs: string,
	rt: string
): RInstruction => ({ op, rd, rs, rt })

export const createII = (
	op: IInstruction['op'],
	rt: string,
	rs: string,
	imm: number
): IInstruction => ({ op, rt, rs, imm })

export const createDI = (op: DivInstruction['op'], rs: string, rt: string): DivInstruction => ({
	op,
	rs,
	rt
})

export const createLSI = (
	op: LSInstruction['op'],
	rt: string,
	imm: number,
	rs: string
): LSInstruction => ({ op, rt, imm, rs })

export const createMFI = (op: MFInstruction['op'], rd: string): MFInstruction => ({ op, rd })

export const isAllowedOP = (op: string): op is AllowedOPs =>
	['add', 'sub', 'mult', 'addi', 'subi', 'div', 'lw', 'sw', 'mfhi', 'mflo'].includes(op)

export const isRInstruction = (inst: Instruction): inst is RInstruction =>
	['add', 'sub', 'mult'].includes(inst.op)

export const isIInstruction = (inst: Instruction): inst is IInstruction =>
	['addi', 'subi'].includes(inst.op)

export const isDivInstruction = (inst: Instruction): inst is DivInstruction => inst.op === 'div'

export const isLSInstruction = (inst: Instruction): inst is LSInstruction =>
	['lw', 'sw'].includes(inst.op)

export const isMFInstruction = (inst: Instruction): inst is MFInstruction =>
	['mfhi', 'mflo'].includes(inst.op)

export const instToString = (inst: Instruction) => {
	if (isRInstruction(inst)) return `${inst.op} ${inst.rd}, ${inst.rs}, ${inst.rt}`
	else if (isIInstruction(inst)) return `${inst.op} ${inst.rt}, ${inst.rs}, ${inst.imm}`
	else if (isDivInstruction(inst)) return `${inst.op} ${inst.rs}, ${inst.rt}`
	else if (isLSInstruction(inst)) return `${inst.op} ${inst.rt}, ${inst.imm}(${inst.rs})`
	else if (isMFInstruction(inst)) return `${inst.op} ${inst.rd}`
}

// export const checkForConflict = (instructions: InstructionList) => {
//     let bubble = 0
//     let comp = 0
//     let result = []
//     for (let i = 0; i < instructions.length; i++) {
//         if (!instructions[i + 1]) break
//         if (isMemOP(instructions[i].OPcode)) {
//             const atual = instructions[i] as MemInstruction
//             if (isULAOP(instructions[i + 1].OPcode)) {
//                 const prox = instructions[i + 1] as ULAInstruction
//                 if (
//                     atual.RD === prox.Operando1 ||
//                     atual.RD === prox.Operando2
//                 ) {
//                     bubble = 2
//                     prox.LugarBolha = bubble
//                     prox.Espaços = comp + i + 1
//                 }
//             }
//         } else {
//             instructions[i + 1].LugarBolha = bubble
//             instructions[i + 1].Espaços = comp + i + 1
//         }
//         if (bubble > 0) {
//             bubble--
//             if (bubble === 0) comp++
//         }
//         result.push({offset: i, bubblePosition: bubble})
//     }
//     return result
// }
// this but in typescript

export const checkForConflicts = (instructions: Instruction[]) => {
	let bubble = 0
	let comp = 0
	let result = []
	for (let i = 0; i < instructions.length; i++) {
		if (!instructions[i + 1]) break
		if (isLSInstruction(instructions[i])) {
			const atual = instructions[i] as LSInstruction
			if (isRInstruction(instructions[i + 1])) {
				const prox = instructions[i + 1] as RInstruction
				if (atual.rt === prox.rs || atual.rt === prox.rt) {
					bubble = 2
				}
			}
		}
		result.push({ offset: comp + i, bubble: bubble })

		if (bubble > 0) {
			bubble--
			if (bubble === 0) comp++
		}
	}
	return result
}
