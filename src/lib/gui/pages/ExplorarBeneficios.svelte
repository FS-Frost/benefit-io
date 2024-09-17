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

    let instituciones: string[] = [];

    let productos: string[] = [];

    let dias: string[] = [];

    let locales: string[] = [];

    let institucionSeleccionada: string = "";

    let productoSeleccionado: string = "";

    let diaSeleccionado: string = "";

    let localSeleccionado: string = "";

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

    function filtrarInstituciones(): void {
        instituciones = [];
        productos = [];
        dias = [];
        locales = [];
        institucionSeleccionada = "";
        productoSeleccionado = "";
        diaSeleccionado = "";
        localSeleccionado = "";

        for (const descuento of descuentos) {
            if (!instituciones.includes(descuento.institucion)) {
                instituciones.push(descuento.institucion);
            }
        }

        instituciones.sort((a, b) => a.localeCompare(b));
        instituciones = [...instituciones];
    }

    function filtrarProductos(): void {
        console.log("filtrarProductos");
        diaSeleccionado = "";
        localSeleccionado = "";
        productos = [];
        dias = [];
        locales = [];

        for (const descuento of descuentos) {
            if (institucionSeleccionada.length > 0) {
                if (descuento.institucion !== institucionSeleccionada) {
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
        localSeleccionado = "";
        dias = [];
        locales = [];

        for (const descuento of descuentos) {
            if (descuento.dia.split(" ").length > 1) {
                continue;
            }

            if (institucionSeleccionada.length > 0) {
                if (descuento.institucion !== institucionSeleccionada) {
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

    function filtrarLocales(): void {
        locales = [];

        for (const descuento of descuentos) {
            if (institucionSeleccionada.length > 0) {
                if (descuento.institucion !== institucionSeleccionada) {
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

            if (!locales.includes(descuento.local)) {
                locales.push(descuento.local);
            }
        }

        locales.sort((a, b) => a.localeCompare(b));
        locales = [...locales];
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
                institucionSeleccionada.length > 0 &&
                descuento.institucion !== institucionSeleccionada
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
                localSeleccionado.length > 0 &&
                descuento.local !== localSeleccionado
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
        instituciones = [...instituciones];
        console.log(infoDias);
    }

    onMount(async () => {
        descuentos = obtenerDescuentos();
        filtrarDescuentos();
        filtrarInstituciones();
        filtrarProductos();
        filtrarDias();
        filtrarLocales();

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
            <div class="title is-4">{text.paginaExplorar}</div>
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
                        bind:value={institucionSeleccionada}
                        on:change={() => {
                            filtrarProductos();
                            filtrarDescuentos();
                        }}
                    >
                        <option value="">Ninguna</option>

                        {#each instituciones as institucion}
                            <option value={institucion}>
                                {institucion}
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
                            filtrarLocales();
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
                        bind:value={localSeleccionado}
                        on:change={() => {
                            filtrarDescuentos();
                        }}
                    >
                        <option value="">Ninguno</option>

                        {#each locales as local}
                            <option value={local}>
                                {local}
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
