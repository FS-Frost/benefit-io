<script lang="ts">
    import BusquedaBeneficios from "$lib/gui/BusquedaBeneficios.svelte";
    import Opciones from "$lib/gui/Opciones.svelte";
    import text, { capitalizeFirstLetter } from "$lib/text";
    import { onMount } from "svelte";
    import Router from "./Router.svelte";
    import { z } from "zod";

    const BuildInfo = z.object({
        time: z.number().default(0),
    });

    type BuildInfo = z.infer<typeof BuildInfo>;

    let fechaActualizacion: string = "";

    onMount(async () => {
        const response = await fetch("build-info.json");
        if (response.headers.get("content-type") !== "application/json") {
            console.log(
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
    });
</script>

<BusquedaBeneficios />

<!-- Título -->
<div class="title is-3">{text.appName}</div>

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

<style>
    .title {
        margin: 0;
    }

    .actualizacion {
        font-size: small;
    }

    hr {
        background-color: #4c4c4c;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    .router {
        height: 22rem;
        overflow: auto;
    }
</style>
