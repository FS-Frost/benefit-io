<script lang="ts">
    import text, { capitalizeFirstLetter } from "$lib/text";
    import { onMount } from "svelte";
    import VistaBeneficio from "../VistaBeneficio.svelte";
    import type { Beneficio } from "$lib/beneficios";

    let fecha: string = "";

    let beneficios: Beneficio[] = [];

    onMount(() => {
        fecha = capitalizeFirstLetter(
            new Date().toLocaleDateString("es-ES", {
                year: "numeric",
                day: "numeric",
                month: "long",
                weekday: "long",
            }),
        );

        beneficios = [
            {
                proveedor: "Banco de Chile",
                producto: "Crédito Visa",
                ofertas: [
                    {
                        tienda: "NAOKI",
                        descuento: 40,
                    },
                ],
            },
            {
                proveedor: "Banco Santander",
                producto: "Crédito WM LIM",
                ofertas: [
                    {
                        tienda: "NAOKI",
                        descuento: 40,
                    },
                    {
                        tienda: "RISHTEDAR",
                        descuento: 40,
                    },
                ],
            },
            {
                proveedor: "Banco Falabella",
                producto: "Débito",
                ofertas: [
                    {
                        tienda: "TIGRE BRAVO",
                        descuento: 40,
                    },
                    {
                        tienda: "MIRADOR GOURMET",
                        descuento: 40,
                    },
                ],
            },
        ];
    });
</script>

<svelte:head>
    <title>{text.appName}</title>
</svelte:head>

<section class="inicio">
    <div class="mis-beneficios mb-4">
        <div class="titulo-beneficios">
            <div class="title is-3">Mis beneficios</div>

            <div class="title subtitle mt-2 is-6">{fecha}</div>
        </div>

        <div class="opciones">
            <button class="button" on:click={() => alert("No implementado.")}>
                <i class="fa-solid fa-sliders"></i>
            </button>
        </div>
    </div>

    {#each beneficios as beneficio}
        <VistaBeneficio {beneficio} />
    {/each}
</section>

<style>
    .title {
        font-weight: 500;
    }

    .subtitle {
        color: rgb(183, 183, 183);
    }

    .mis-beneficios {
        display: flex;
        justify-content: space-between;
    }

    .opciones button {
        font-size: large;
    }

    .button {
        background-color: var(--color2);
    }
</style>
