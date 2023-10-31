<script lang="ts">
	import { Cloud } from 'lucide-svelte'
	import El from './El.svelte'
	export let offset: number
	export let bubble: number
</script>

<div
	class="pointer-events-none flex gap-3"
	id="pipeline"
>
	{#each [...Array(offset).keys()] as _}
		<div class=" h-16 w-16"></div>
	{/each}

	<El what="BI" />

	{#if bubble === 1}
		<div class="hidden">
			<Cloud
				size={64}
				class="text-sky-500"
			/>
		</div>
	{/if}

	<El what="DI" />

	{#if bubble === 2}
		<div class="hidden">
			<Cloud
				size={64}
				class="text-sky-500"
			/>
		</div>
	{/if}

	<El what="ULA" />
	<El what="MEM" />
	<El what="AR" />
</div>
