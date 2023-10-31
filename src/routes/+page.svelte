<script lang="ts">
	import { enhance } from '$app/forms'
	import { instructions } from '$lib'
	import type { ActionData } from './$types'

	import Toolbar from '$lib/Toolbar.svelte'
	import Pipeline from '$lib/Pipeline.svelte'

	export let form: ActionData

	let pipelineT: any

	$: if (form?.ok) {
		setTimeout(() => {
			const el = document.getElementById('aqui')
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' })
			}
		}, 0)
		instructions.set(form.instructionSet)
		pipelineT = form.pipeline
	}
</script>

<form
	class="mx-auto flex max-w-4xl items-center justify-around p-3 text-lg shadow-md"
	method="POST"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false })
		}
	}}
>
	<div class="flex flex-col gap-2 place-self-start">
		<label for="inst">Instruções:</label>
		<textarea
			name="inst"
			id="inst"
			cols="20"
			rows="6"
			class="resize-none rounded-md border border-gray-300 p-2"
		></textarea>
	</div>
	<div>
		<p>Instruções suportadas:</p>
		<ul class="list-disc pl-4 text-base">
			<li>LW, SW: op $t, offset($s);</li>
			<li>ADD, SUB, MULT: op $d, $s, $t;</li>
			<li>ADDI, SUBI: op $d, $s, imm;</li>
			<li>DIV: div $s, $t;</li>
			<li>MFHI, MFLO: op $d.</li>
		</ul>
		<p><code>$d, $t, $s</code> são registradores.</p>
		<p><code>offset</code> e <code>imm</code> são valores inteiros.</p>
	</div>
	<div>
		<button class="bg-cyan-900 px-4 py-2 text-white">Simular</button>
	</div>
</form>

{#if form?.ok}
	<div
		id="aqui"
		class="mt-4 grid h-[calc(100vh-2rem)] overflow-scroll outline outline-black"
	>
		<Toolbar maxClockCycle={form?.maxClock} />
		<div class="space-y-3 p-2">
			{#each pipelineT as item}
				<Pipeline
					offset={item.offset}
					bubble={item.bubble}
				/>
			{/each}
		</div>
	</div>
{/if}
