<script lang="ts">
	import { enhance } from '$app/forms'
	import { instToString } from '$lib'
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
			<li>ADDI, SUBI, MULTI: op $d, $s, imm;</li>
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
		class="mt-4 grid h-[calc(100vh-2rem)] outline outline-black"
	>
		<Toolbar maxClockCycle={form?.maxClock} />
		<div class="grid grid-cols-[24px,1fr] overflow-scroll">
			<div
				id="instNumber"
				class="pl-auto sticky left-0 top-0 bg-white"
			>
				<div class="flex flex-col gap-3 p-2">
					{#each Array.from(Array(form?.instructionSet.length), (_, i) => i + 1) as i}
						<span
							class="flex h-16 place-items-center text-center"
							title={instToString(form?.instructionSet[i - 1])}>i{i}</span
						>
					{/each}
				</div>
			</div>
			<div class="space-y-3 p-2">
				{#each pipelineT as item}
					<Pipeline
						offset={item.offset}
						bubble={item.bubble}
					/>
				{/each}
			</div>
		</div>
	</div>
{/if}
