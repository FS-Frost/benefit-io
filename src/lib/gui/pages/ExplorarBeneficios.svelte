<script lang="ts">
    import text, { capitalizeFirstLetter } from "$lib/text";
    import { onMount, tick } from "svelte";
    import {
        Descuento,
        Oferta,
        ordenarInfoDias,
        Producto,
    } from "$lib/beneficios";
    import { z } from "zod";
    import VistaInfoDia from "../VistaInfoDia.svelte";
    import { obtenerDescuentos } from "$lib/data";

    let descuentos: Descuento[] = [];

    let infoDias: InfoDia[] = [];

    let proveedores: string[] = [];

    let productos: string[] = [];

    let dias: string[] = [];

    let tiendas: string[] = [];

    let proveedorSeleccionado: string = "";

    let productoSeleccionado: string = "";

    let diaSeleccionado: string = "";

    let tiendaSeleccionada: string = "";

    let filtrosVisibles: boolean = false;

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

    function filtrarProveedores(): void {
        console.log("filtrarProveedores");
        proveedores = [];
        productos = [];
        dias = [];
        tiendas = [];
        proveedorSeleccionado = "";
        productoSeleccionado = "";
        diaSeleccionado = "";
        tiendaSeleccionada = "";

        for (const descuento of descuentos) {
            if (!proveedores.includes(descuento.proveedor)) {
                proveedores.push(descuento.proveedor);
            }
        }

        proveedores.sort((a, b) => a.localeCompare(b));
        proveedores = [...proveedores];
    }

    function filtrarProductos(): void {
        console.log("filtrarProductos");
        diaSeleccionado = "";
        tiendaSeleccionada = "";
        productos = [];
        dias = [];
        tiendas = [];

        for (const descuento of descuentos) {
            if (proveedorSeleccionado.length > 0) {
                if (descuento.proveedor !== proveedorSeleccionado) {
                    continue;
                }
            }

            if (!productos.includes(descuento.producto)) {
                productos.push(descuento.producto);
            }
        }

        productos.sort((a, b) => a.localeCompare(b));
        productos = [...productos];
    }

    function filtrarDias(): void {
        console.log("filtrarDias");
        tiendaSeleccionada = "";
        dias = [];
        tiendas = [];

        for (const descuento of descuentos) {
            if (descuento.dia.split(" ").length > 1) {
                continue;
            }

            if (proveedorSeleccionado.length > 0) {
                if (descuento.proveedor !== proveedorSeleccionado) {
                    continue;
                }
            }

            if (productoSeleccionado.length > 0) {
                if (descuento.producto !== productoSeleccionado) {
                    continue;
                }
            }

            if (!dias.includes(descuento.dia)) {
                dias.push(descuento.dia);
            }
        }

        dias = [
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
        ]
            .filter((x) => dias.map((d) => d.toLowerCase()).includes(x))
            .map((x) => capitalizeFirstLetter(x));

        dias = [...dias];
    }

    function filtrarTiendas(): void {
        console.log("filtrarTiendas");
        tiendas = [];

        for (const descuento of descuentos) {
            if (proveedorSeleccionado.length > 0) {
                if (descuento.proveedor !== proveedorSeleccionado) {
                    continue;
                }
            }

            if (productoSeleccionado.length > 0) {
                if (descuento.producto !== productoSeleccionado) {
                    continue;
                }
            }

            if (diaSeleccionado.length > 0) {
                if (descuento.dia !== diaSeleccionado) {
                    continue;
                }
            }

            if (!tiendas.includes(descuento.tienda)) {
                tiendas.push(descuento.tienda);
            }
        }

        tiendas.sort((a, b) => a.localeCompare(b));
        tiendas = [...tiendas];
    }

    function filtrarDescuentos(): void {
        console.log("filtrarDescuentos");
        infoDias = [];

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

            if (
                proveedorSeleccionado.length > 0 &&
                descuento.proveedor !== proveedorSeleccionado
            ) {
                continue;
            }

            if (
                productoSeleccionado.length > 0 &&
                descuento.producto !== productoSeleccionado
            ) {
                continue;
            }

            if (
                diaSeleccionado.length > 0 &&
                descuento.dia !== diaSeleccionado
            ) {
                continue;
            }

            if (
                tiendaSeleccionada.length > 0 &&
                descuento.tienda !== tiendaSeleccionada
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
                    x.proveedor === descuento.proveedor &&
                    x.nombre === descuento.producto,
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

        ordenarInfoDias(infoDias);
        infoDias = [...infoDias];
        proveedores = [...proveedores];
        console.log(infoDias);
    }

    onMount(async () => {
        descuentos = obtenerDescuentos();
        filtrarDescuentos();
        filtrarProveedores();
        filtrarProductos();
        filtrarDias();
        filtrarTiendas();

        await tick();

        const hoy = capitalizeFirstLetter(
            new Date().toLocaleDateString("es-ES", {
                weekday: "long",
            }),
        ).toLowerCase();

        const elementInfoDiaHoy = document.querySelector(
            `#explorar-dia-${hoy}`,
        );

        console.log(`explorar-dia-${hoy}`);
        if (elementInfoDiaHoy != null) {
            console.log("scroll");
            elementInfoDiaHoy.scrollIntoView();
        }
    });
</script>

<svelte:head>
    <title>{text.appName}</title>
</svelte:head>

<section class="inicio">
    <div class="mis-beneficios mb-4">
        <div class="titulo-beneficios">
            <div class="title is-3">{text.paginaExplorar}</div>
        </div>
    </div>

    <button
        class="button is-link"
        on:click={() => (filtrosVisibles = !filtrosVisibles)}
    >
        Filtrar beneficios
    </button>

    {#if filtrosVisibles}
        <div class="filtros mt-2">
            <div class="field">
                <label class="label" for="">Institución</label>
                <div class="select">
                    <select
                        bind:value={proveedorSeleccionado}
                        on:change={() => {
                            filtrarProductos();
                            filtrarDescuentos();
                        }}
                    >
                        <option value="">Ninguna</option>

                        {#each proveedores as proveedor}
                            <option value={proveedor}>
                                {proveedor}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label" for="">Producto</label>
                <div class="select">
                    <select
                        bind:value={productoSeleccionado}
                        on:change={() => {
                            filtrarDias();
                            filtrarDescuentos();
                        }}
                    >
                        <option value="">Ninguno</option>

                        {#each productos as producto}
                            <option value={producto}>
                                {producto}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label" for="">Día de la semana</label>
                <div class="select">
                    <select
                        bind:value={diaSeleccionado}
                        on:change={() => {
                            filtrarTiendas();
                            filtrarDescuentos();
                        }}
                    >
                        <option value="">Ninguno</option>

                        {#each dias as dia}
                            <option value={dia}>
                                {dia}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label" for="">Local</label>
                <div class="select">
                    <select
                        bind:value={tiendaSeleccionada}
                        on:change={() => {
                            filtrarDescuentos();
                        }}
                    >
                        <option value="">Ninguno</option>

                        {#each tiendas as tienda}
                            <option value={tienda}>
                                {tienda}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}

    <div class="descuentos mt-4">
        {#each infoDias as dia}
            <span id={`explorar-dia-${dia.dia.toLowerCase()}`}></span>
            <VistaInfoDia {dia} />
        {/each}
    </div>
</section>

<style>
    .title {
        font-weight: 500;
    }

    .mis-beneficios {
        display: flex;
        justify-content: space-between;
    }

    .filtros {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    button,
    select,
    .select {
        width: 100%;
    }
</style>
