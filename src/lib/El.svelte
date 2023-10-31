<script lang="ts">
	export let what: string
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 32 32"
	class=" hidden h-16 w-16"
>
	<path
		d="M 0 0 L 32 0 L 32 32 L 0 32 L 0 0"
		stroke="#000000"
		stroke-width="5"
		fill="#ffffff"
	/>
	<text
		x="50%"
		y="50%"
		dominant-baseline="middle"
		text-anchor="middle"
		font-size="10"
		fill="#000000"
	>
		{what}
	</text>
</svg>
