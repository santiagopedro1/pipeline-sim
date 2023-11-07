<script lang="ts">
	import { SkipForward, SkipBack, ArrowRightToLine, ArrowLeftToLine } from 'lucide-svelte'

	export let currentClockCycle: number = 0
	export let maxClockCycle: number

	function step(ev: Event) {
		const { id } = ev.target as HTMLButtonElement
		const pipes = document.querySelectorAll('#pipeline')

		if (id === 'back') {
			currentClockCycle = Math.max(0, currentClockCycle - 1)
			for (const pipe of pipes) {
				if (pipe.children[currentClockCycle]) {
					pipe.children[currentClockCycle].classList.add('hidden')
				}
			}
		} else {
			currentClockCycle = Math.min(maxClockCycle, currentClockCycle + 1)
			for (const pipe of pipes) {
				if (pipe.children[currentClockCycle - 1]) {
					pipe.children[currentClockCycle - 1].classList.remove('hidden')
					pipe.children[currentClockCycle - 1].classList.add('flex')
				}
			}
		}
	}

	function jump(ev: Event) {
		const { id } = ev.target as HTMLButtonElement

		if (id === 'back') {
			while (currentClockCycle > 0) {
				step(ev)
			}
		} else {
			while (currentClockCycle < maxClockCycle) {
				step(ev)
			}
		}
	}
</script>

<div class="sticky inset-0 z-10 flex h-12 w-full items-center justify-center gap-6 bg-white p-2">
	<div>
		<button
			class="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
			on:click={jump}
			id="back"
		>
			<ArrowLeftToLine
				size={16}
				class="pointer-events-none"
			/>
		</button>
		<button
			class="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
			on:click={step}
			id="back"
		>
			<SkipBack
				size={16}
				class="pointer-events-none"
			/>
		</button>
		<button
			class="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
			on:click={step}
			id="next"
		>
			<SkipForward
				size={16}
				class="pointer-events-none"
			/>
		</button>
		<button
			class="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
			on:click={jump}
			id="next"
		>
			<ArrowRightToLine
				size={16}
				class="pointer-events-none"
			/>
		</button>
	</div>
	<p class="w-[15ch] text-center">Clock atual: {currentClockCycle}</p>
	<progress
		id="clockProgress"
		max={maxClockCycle}
		value={currentClockCycle}
		class="w-48"
	></progress>
</div>

<style lang="postcss">
	progress::-webkit-progress-value {
		@apply bg-cyan-400;
	}

	progress::-webkit-progress-bar {
		@apply bg-gray-600;
	}
</style>
