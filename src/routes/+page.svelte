<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	export let form: ActionData

	$: if (form?.ok) {
		setTimeout(() => {
			const el = document.getElementById('aqui')
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' })
			}
		}, 0)
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
	<div id="aqui" class="mt-4 h-[calc(100vh-2rem)] w-full bg-red-600 text-white">
		{#each form?.instructionSet as inst}
			<p class="p-2">{JSON.stringify(inst, null, 4)}</p>
		{/each}
	</div>
{/if}
