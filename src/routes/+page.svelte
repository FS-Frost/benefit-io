<script lang="ts">
    import BusquedaBeneficios from "$lib/gui/BusquedaBeneficios.svelte";
    import Opciones from "$lib/gui/Opciones.svelte";
    import { onMount } from "svelte";
    import Router from "./Router.svelte";
    import { z } from "zod";
    import { storeUsuario, Usuario } from "$lib/auth";

    const BuildInfo = z.object({
        time: z.number().default(0),
    });

    type BuildInfo = z.infer<typeof BuildInfo>;

    let usuario: Usuario | null = null;

    let fechaActualizacion: string = "";

    async function obtenerVersion(): Promise<void> {
        const response = await fetch("build-info.json");
        if (
            !response.headers.get("content-type")?.includes("application/json")
        ) {
            console.error(
                "fetch build info",
                response.status,
                await response.text(),
            );
            return;
        }

        const buildInfo = BuildInfo.parse(await response.json());
        if (buildInfo.time <= 0) {
            return;
        }

        const date = new Date(buildInfo.time * 1000);

        fechaActualizacion = date
            .toLocaleDateString("es-ES", {
                year: "numeric",
                day: "numeric",
                month: "long",
                weekday: "long",
            })
            .replaceAll(",", "");
    }

    onMount(async () => {
        await obtenerVersion();
        storeUsuario.subscribe((valor) => (usuario = valor));
    });
</script>

{#if usuario != null}
    <BusquedaBeneficios />

    <p class="usuario">¡Hola, {usuario.email}!</p>

    {#if fechaActualizacion.length > 0}
        <p class="actualizacion">Actualizado el {fechaActualizacion}</p>
    {/if}

    <hr />

    <!-- Contenido -->
    <div class="router">
        <Router />
    </div>

    <hr />

    <Opciones />
{/if}

<style>
    .usuario,
    .actualizacion {
        font-size: small;
    }

    hr {
        background-color: #4c4c4c;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    .router {
        height: 48vh;
        overflow: auto;
    }
</style>
