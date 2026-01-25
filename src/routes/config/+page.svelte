<!-- routes/config/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { settingsStore, type SpeechLang } from '$lib/stores/settings.store';
	import { apiKey } from '$lib/stores/status.cache';

	const languages: { value: SpeechLang; label: string; flag: string }[] = [
		{ value: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
		{ value: 'en-US', label: 'English', flag: '🇺🇸' },
		{ value: 'ja-JP', label: '日本語', flag: '🇯🇵' }
	];

	let keyInput = $state('');

	function selectLang(lang: SpeechLang) {
		$settingsStore.speechLang = lang;
	}

	function setKey() {
		if (keyInput.trim()) {
			apiKey.set(keyInput.trim());
			keyInput = '';
		}
	}

	function clearKey() {
		apiKey.set('');
	}

	function goBack() {
		goto('/');
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 p-4">
	<div class="mx-auto max-w-md">
		<div class="mb-6 flex items-center justify-between pt-8">
			<button
				onclick={goBack}
				class="flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
			>
				← Back
			</button>
			<h1 class="text-2xl font-bold text-white">Settings</h1>
			<div class="w-20"></div>
		</div>

		<!-- Speech Language -->
		<div class="mb-4 rounded-3xl bg-white p-6 shadow-2xl">
			<h2 class="mb-2 text-xl font-bold text-gray-800">Speech Language</h2>
			<p class="mb-4 text-sm text-gray-500">Select the language for voice input</p>

			<div class="space-y-2">
				{#each languages as lang}
					<button
						onclick={() => selectLang(lang.value)}
						class="flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3 transition-all
							{$settingsStore.speechLang === lang.value
							? 'border-purple-500 bg-purple-50'
							: 'border-transparent bg-gray-50 hover:border-purple-200 hover:bg-purple-50/50'}"
					>
						<div class="flex items-center gap-3">
							<span class="text-2xl">{lang.flag}</span>
							<span class="font-medium text-gray-800">{lang.label}</span>
						</div>
						{#if $settingsStore.speechLang === lang.value}
							<span class="text-xl text-purple-500">✓</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<!-- API Key -->
		<div class="rounded-3xl bg-white p-6 shadow-2xl">
			<h2 class="mb-2 text-xl font-bold text-gray-800">API Key</h2>
			<p class="mb-4 text-sm text-gray-500">Gemini API key for AI chat</p>

			<!-- Current Key Display -->
			<div class="mb-4 rounded-xl bg-gray-50 p-3">
				<p class="text-xs text-gray-500">Current key</p>
				<p class="font-mono text-sm text-gray-800 truncate">
					{$apiKey ? `${$apiKey.slice(0, 8)}...${$apiKey.slice(-4)}` : '(not set)'}
				</p>
			</div>

			<!-- Input -->
			<input
				type="password"
				bind:value={keyInput}
				placeholder="Enter API key..."
				class="mb-3 w-full rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-purple-400 focus:outline-none"
			/>

			<!-- Buttons -->
			<div class="flex gap-2">
				<button
					onclick={setKey}
					disabled={!keyInput.trim()}
					class="flex-1 rounded-xl bg-purple-500 py-3 font-semibold text-white transition-all hover:bg-purple-600 disabled:opacity-40"
				>
					Save Key
				</button>
				<button
					onclick={clearKey}
					disabled={!$apiKey}
					class="rounded-xl bg-red-100 px-4 py-3 font-semibold text-red-600 transition-all hover:bg-red-200 disabled:opacity-40"
				>
					Clear
				</button>
			</div>
		</div>
	</div>
</div>
