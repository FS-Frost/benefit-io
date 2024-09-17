<script lang="ts">
    import text, { capitalizeFirstLetter } from "$lib/text";
    import { onMount } from "svelte";
    import {
        InfoDia,
        ordenarInfoDias,
        Producto,
        type Descuento,
    } from "$lib/beneficios";
    import { KEY_PRODUCTOS } from "$lib/session";
    import VistaInfoDia from "../VistaInfoDia.svelte";
    import { obtenerDescuentos } from "$lib/data";

    let descuentos: Descuento[] = [];
    let infoDias: InfoDia[] = [];
    let fecha: string = "";
    let productosUsuario: Producto[] = [];

    function filtrarDescuentos(): void {
        console.log("filtrarDescuentos");
        infoDias = [];

        const hoy = capitalizeFirstLetter(
            new Date().toLocaleDateString("es-ES", {
                weekday: "long",
            }),
        ).toLowerCase();

        const nombresDias: string[] = [
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
        ];

        for (const descuento of descuentos) {
            if (descuento.dia.split(" ").length > 1) {
                continue;
            }

            if (descuento.dia.toLowerCase() !== hoy) {
                continue;
            }

            if (
                !productosUsuario.some(
                    (x) =>
                        x.institucion === descuento.institucion &&
                        x.nombre === descuento.producto,
                )
            ) {
                continue;
            }

            let indexDia = infoDias.findIndex((x) => x.dia === descuento.dia);

            if (indexDia < 0) {
                infoDias.push({
                    dia: descuento.dia,
                    productos: [],
                    orden: nombresDias.indexOf(descuento.dia.toLowerCase()),
                });

                indexDia = infoDias.length - 1;
            }

            let indexProducto = infoDias[indexDia].productos.findIndex(
                (x) =>
                    x.institucion === descuento.institucion &&
                    x.nombre === descuento.producto,
            );

            if (indexProducto < 0) {
                infoDias[indexDia].productos.push({
                    nombre: descuento.producto,
                    institucion: descuento.institucion,
                    ofertas: [],
                });

                indexProducto = infoDias[indexDia].productos.length - 1;
            }

            let indexOferta = infoDias[indexDia].productos[
                indexProducto
            ].ofertas.findIndex((x) => x.local === descuento.local);

            if (indexOferta < 0) {
                infoDias[indexDia].productos[indexProducto].ofertas.push({
                    local: descuento.local,
                    descuento: descuento.descuento,
                });
            }
        }

        ordenarInfoDias(infoDias);
        infoDias = [...infoDias];
        console.log(infoDias);
    }

    onMount(() => {
        descuentos = obtenerDescuentos();

        fecha = capitalizeFirstLetter(
            new Date().toLocaleDateString("es-ES", {
                year: "numeric",
                day: "numeric",
                month: "long",
                weekday: "long",
            }),
        );

        try {
            const rawProductosUsuario =
                localStorage.getItem(KEY_PRODUCTOS) ?? "[]";

            productosUsuario = Producto.array().parse(
                JSON.parse(rawProductosUsuario),
            );
        } catch (error) {
            console.error("error al obtener productos guardados", error);
        }

        productosUsuario = [...productosUsuario];

        filtrarDescuentos();
    });
</script>

<svelte:head>
    <title>{text.appName}</title>
</svelte:head>

<section class="inicio">
    <div class="mis-beneficios mb-4">
        <div class="titulo-beneficios">
            <div class="title is-4">Mis beneficios</div>

            <div class="title subtitle mt-2 is-6">{fecha}</div>
        </div>

        <!-- <div class="opciones">
            <button
                class="button button-opciones"
                on:click={() => alert("No implementado.")}
            >
                <i class="fa-solid fa-sliders"></i>
            </button>
        </div> -->
    </div>

    <div class="descuentos mt-4">
        {#if productosUsuario.length === 0}
            <p class="mb-4">{text.sinProductos}</p>
        {:else if infoDias.length == 0}
            <p class="mb-4">No tienes beneficios para hoy.</p>
        {:else}
            {#each infoDias as dia}
                <VistaInfoDia {dia} />
            {/each}
        {/if}
    </div>
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

    /* .opciones button {
        font-size: large;
    }

    button {
        color: white;
        font-weight: bold;
        width: 100%;
    }

    .button-opciones {
        background-color: var(--color2);
    } */
</style>
