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
	class="mx-auto grid max-w-4xl grid-cols-3 place-items-center gap-4 p-3 text-lg shadow-md"
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
	<div class="place-self-center">
		<p>Como usar:</p>
		<ul class="list-disc text-base">
			<li>
				Siga o padrão MIPS assembly language <a
					href="https://student.cs.uwaterloo.ca/~cs241/mips/mipsasm.html"
					class="text-cyan-600 underline">descrito aqui</a
				>;
			</li>
			<li>Separe instruções com uma nova linha;</li>
			<li>Instruções suportadas são: LW, SW, ADD, SUB, AND, MUL, DIV</li>
		</ul>
	</div>
	<div>
		<button class="bg-cyan-900 px-4 py-2 text-white">Submit</button>
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
