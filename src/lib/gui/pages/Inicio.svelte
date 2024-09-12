<script lang="ts">
    import text, { capitalizeFirstLetter } from "$lib/text";
    import { onMount } from "svelte";
    import VistaBeneficio from "../VistaBeneficio.svelte";
    import {
        Oferta,
        Producto,
        type Beneficio,
        type Descuento,
    } from "$lib/beneficios";
    import { data } from "$lib/data";
    import { z } from "zod";
    import { KEY_PRODUCTOS } from "$lib/session";

    let infoDias: InfoDia[] = [];

    let fecha: string = "";

    let productosUsuario: Producto[] = [];

    const InfoProducto = Producto.extend({
        ofertas: Oferta.array(),
    });

    type InfoProducto = z.infer<typeof InfoProducto>;

    const InfoDia = z.object({
        dia: z.string(),
        orden: z.number(),
        productos: InfoProducto.array(),
    });

    type InfoDia = z.infer<typeof InfoDia>;

    function filtrarDescuentos(descuentos: Descuento[]): void {
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
                        x.proveedor === descuento.proveedor &&
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
                (x) => x.nombre === descuento.producto,
            );

            if (indexProducto < 0) {
                infoDias[indexDia].productos.push({
                    nombre: descuento.producto,
                    proveedor: descuento.proveedor,
                    ofertas: [],
                });

                indexProducto = infoDias[indexDia].productos.length - 1;
            }

            let indexOferta = infoDias[indexDia].productos[
                indexProducto
            ].ofertas.findIndex((x) => x.tienda === descuento.tienda);

            if (indexOferta < 0) {
                infoDias[indexDia].productos[indexProducto].ofertas.push({
                    tienda: descuento.tienda,
                    descuento: descuento.descuento,
                });
            }
        }

        infoDias.sort((a, b) => {
            if (a.orden > b.orden) {
                return 1;
            }

            if (a.orden < b.orden) {
                return -1;
            }

            return 0;
        });

        infoDias = [...infoDias];

        console.log(infoDias);
    }

    onMount(() => {
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

        filtrarDescuentos(data);
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

    <div class="descuentos mt-4">
        {#each infoDias as dia}
            <div class="dia">
                <div class="subtitulo">Septiembre: {dia.dia}</div>

                {#each dia.productos as producto}
                    <div>{producto.proveedor} - {producto.nombre}</div>

                    {#each producto.ofertas as oferta}
                        <div class="oferta">
                            <span>{oferta.tienda}</span>
                            <span>{oferta.descuento} %</span>
                        </div>
                    {/each}
                {/each}
            </div>
        {/each}
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

    .opciones button {
        font-size: large;
    }

    .button {
        background-color: var(--color2);
    }

    .dia {
        background-color: var(--color2);
        border-radius: 0.5rem;
        margin-bottom: 0.7rem;
        padding: 0.7rem;
        font-weight: bold;
        color: white;
    }

    .subtitulo {
        font-size: small;
        color: rgb(173, 173, 173);
    }

    .oferta {
        color: rgb(120, 204, 85);
        display: flex;
        justify-content: space-between;
    }
</style>
