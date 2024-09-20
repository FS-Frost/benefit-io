import { writable } from "svelte/store";
import PocketBase from "pocketbase";
import { z } from "zod";

export const POCKETBASE_URL: string = "https://benefit.pockethost.io";

export const storeUsuario = writable<Usuario | null>();

export const Usuario = z.object({
    avatar: z.string(),
    collectionId: z.string(),
    collectionName: z.string(),
    created: z.string(),
    email: z.string(),
    emailVisibility: z.boolean(),
    id: z.string(),
    name: z.string(),
    updated: z.string(),
    username: z.string(),
    verified: z.boolean(),
});

export type Usuario = z.infer<typeof Usuario>;

export const AuthData = z.object({
    token: z.string(),
    meta: z.object({
        isNew: z.boolean(),
        email: z.string(),
        avatarUrl: z.string().nullish(),
        rawUser: z.object({
            family_name: z.string().nullish(),
            given_name: z.string().nullish(),
            name: z.string().nullish(),
        }),
    }).nullish(),
    record: Usuario,
});

export type AuthData = z.infer<typeof AuthData>;

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

            const authResponse = await pb
                .collection("users")
                .authWithOAuth2({ provider: "google" });

            const authData = AuthData.parse(authResponse);
            usuario = authData.record;
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
