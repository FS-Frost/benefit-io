<script lang="ts">
    import text, { capitalizeFirstLetter, titleCase } from "$lib/text";
    import { onMount } from "svelte";
    import VistaBeneficio from "../VistaBeneficio.svelte";
    import type { Beneficio } from "$lib/beneficios";
    import Opciones from "../Opciones.svelte";

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
                medio: "Crédito Visa",
                ofertas: [
                    {
                        tienda: "NAOKI",
                        descuento: 40,
                    },
                ],
            },
            {
                proveedor: "Banco Santander",
                medio: "Crédito WM LIM",
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
                medio: "Débito",
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
    <!-- Buscar beneficios -->
    <div class="field">
        <div class="control has-icons-left has-icons-right">
            <input
                class="input"
                type="search"
                placeholder="Buscar beneficios"
            />
            <span class="icon is-small is-left">
                <i class="fas fa-magnifying-glass"></i>
            </span>
        </div>
    </div>

    <!-- Título -->
    <div class="title is-3">{text.appName}</div>

    <hr />

    <!-- Mis beneficios -->
    <div class="mis-beneficios mb-4">
        <div class="titulo-beneficios">
            <div class="title is-3">Mis beneficios</div>

            <div class="title subtitle mt-2 is-6">{fecha}</div>
        </div>

        <div class="opciones">
            <button class="button">
                <i class="fa-solid fa-sliders"></i>
            </button>
        </div>
    </div>

    {#each beneficios as beneficio}
        <VistaBeneficio {beneficio} />
    {/each}

    <Opciones />
</section>

<style>
    .title {
        font-weight: 500;
    }

    .subtitle {
        color: rgb(183, 183, 183);
    }

    hr {
        background-color: #4c4c4c;
    }

    .mis-beneficios {
        display: flex;
        justify-content: space-between;
    }
</style>
