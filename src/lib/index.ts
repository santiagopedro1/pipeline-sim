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
