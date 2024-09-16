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

export async function iniciarSesionGoogle(): Promise<AuthModel | null> {
    let model: AuthModel | null = null;

    try {
        const pb = new PocketBase(POCKETBASE_URL);

        if (pb.authStore.isValid) {
            model = pb.authStore.model;
            return model;
        }

        const authData = await pb
            .collection("users")
            .authWithOAuth2({ provider: "google" });

        model = authData.record;
        return model;
    } catch (error) {
        console.error("error al iniciar sesión con google", error);
        return null;
    } finally {
        if (model != null && "email" in model) {
            const correo = model["email"];
            storeUsuario.set(correo);
        }
    }
}

export function sesionEsValida(): boolean {
    const pb = new PocketBase(POCKETBASE_URL);
    return pb.authStore.isValid;
}

export function cerrarSesion(): void {
    const pb = new PocketBase(POCKETBASE_URL);
    pb.authStore.clear();
}
