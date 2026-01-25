<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto('/config', { replaceState: true });
	});
</script>

<div class="flex min-h-screen items-center justify-center">
	<p class="text-gray-500">Redirecting to settings...</p>
</div>
