// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { User } from '$lib/db/types';

declare global {
	namespace App {
		interface Locals {
			user: User | null;
			token: string | null;
		}
		interface PageData {
			user: User | null;
		}
	}
}

export {};
