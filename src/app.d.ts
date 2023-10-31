// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	interface RInstruction {
		op: 'add' | 'sub' | 'mult'
		rd: string
		rs: string
		rt: string
	}
	interface IInstruction {
		op: 'addi' | 'subi'
		rt: string
		rs: string
		imm: number
	}
	interface DivInstruction {
		op: 'div'
		rs: string
		rt: string
	}
	interface LSInstruction {
		op: 'lw' | 'sw'
		rt: string
		imm: number
		rs: string
	}
	interface MFInstruction {
		op: 'mfhi' | 'mflo'
		rd: string
	}
	type Instruction = RInstruction | IInstruction | DivInstruction | LSInstruction | MFInstruction
}

export {}
