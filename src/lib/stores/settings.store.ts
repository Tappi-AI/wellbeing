// lib/stores/settings.store.ts

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type SpeechLang = 'zh-TW' | 'en-US' | 'ja-JP';

export interface Settings {
	speechLang: SpeechLang;
}

const STORAGE_KEY = 'settings';

const defaultSettings: Settings = {
	speechLang: 'zh-TW'
};

function load(): Settings {
	if (!browser) return defaultSettings;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
	} catch {
		return defaultSettings;
	}
}

export const settingsStore = writable<Settings>(load());

if (browser) {
	settingsStore.subscribe((v) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
	});
}
