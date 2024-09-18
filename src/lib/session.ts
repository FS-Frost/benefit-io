import { writable } from "svelte/store";

export const KEY_PRODUCTOS: string = "benefit.productos";

export type ViewMode = "user" | "admin";

export const storeViewMode = writable<ViewMode>("user");
