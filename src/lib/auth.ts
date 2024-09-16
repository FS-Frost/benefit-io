import { writable } from "svelte/store";
import PocketBase, { type AuthModel } from "pocketbase";
import { z } from "zod";

export const POCKETBASE_URL: string = "https://benefit.pockethost.io";

export const storeUsuario = writable<Usuario | null>();

export const Usuario = z.object({
    email: z.string(),
});

export type Usuario = z.infer<typeof Usuario>;

export function obtenerUsuario(): Usuario | null {
    const pb = new PocketBase(POCKETBASE_URL);
    if (!pb.authStore.isValid) {
        return null;
    }

    try {
        return Usuario.parse(pb.authStore.model);
    } catch (error) {
        console.error("error al validar usuario", error);
        return null;
    }
}

export async function iniciarSesionGoogle(): Promise<Usuario | null> {
    let usuario: Usuario | null = null;

    AUTH: {
        try {
            const pb = new PocketBase(POCKETBASE_URL);

            if (pb.authStore.isValid) {
                usuario = Usuario.parse(pb.authStore.model);
                break AUTH;
            }

            const authData = await pb
                .collection("users")
                .authWithOAuth2({ provider: "google" });

            usuario = Usuario.parse(authData.record);
        } catch (error) {
            console.error("error al iniciar sesión con google", error);
            return null;
        }
    }

    storeUsuario.set(usuario);
    return usuario;
}

export function sesionEsValida(): boolean {
    const pb = new PocketBase(POCKETBASE_URL);
    return pb.authStore.isValid;
}

export function cerrarSesion(): void {
    const pb = new PocketBase(POCKETBASE_URL);
    pb.authStore.clear();
    storeUsuario.set(null);
}
