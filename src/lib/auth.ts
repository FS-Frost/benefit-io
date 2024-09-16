import { writable } from "svelte/store";
import { z } from "zod";
import { newDatabaseConnection } from "./database";

export const storeUsuario = writable<Usuario | null>();

export const Usuario = z.object({
    email: z.string(),
});

export type Usuario = z.infer<typeof Usuario>;

export function obtenerUsuario(): Usuario | null {
    const pb = newDatabaseConnection();
    if (!pb.authStore.isValid) {
        return null;
    }

    try {
        const usuario = Usuario.parse(pb.authStore.model);
        console.log("Sesión mantenida");
        return usuario;
    } catch (error) {
        console.error("error al validar usuario", error);
        return null;
    }
}

export async function iniciarSesionGoogle(): Promise<Usuario | null> {
    let usuario: Usuario | null = null;

    AUTH: {
        try {
            const pb = newDatabaseConnection();

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
    const pb = newDatabaseConnection();
    return pb.authStore.isValid;
}

export function cerrarSesion(): void {
    const pb = newDatabaseConnection();
    pb.authStore.clear();
    storeUsuario.set(null);
}
