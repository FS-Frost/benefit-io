import PocketBase from "pocketbase";
import type { MesRecord, TypedPocketBase } from "$lib/dbTypes";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";

export const POCKETBASE_URL: string = PUBLIC_POCKETBASE_URL;

export function newDatabaseConnection(): TypedPocketBase {
    return new PocketBase(POCKETBASE_URL);
}

export async function obtenerMeses(): Promise<MesRecord[]> {
    const pb = newDatabaseConnection();
    const meses = await pb.collection("mes").getFullList({
        fields: "nombre, orden",
    });
    console.log("MESES", meses);
    return meses;
}
