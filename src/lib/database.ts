import PocketBase from "pocketbase";
import type { MesRecord, TypedPocketBase } from "$lib/dbTypes";

export const POCKETBASE_URL: string = "https://benefit.pockethost.io";

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