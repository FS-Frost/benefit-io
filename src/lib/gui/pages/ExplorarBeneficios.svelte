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

    let selectInstitucion: HTMLElement | null = null;
    let selectProducto: HTMLElement | null = null;
    let selectDia: HTMLElement | null = null;
    let selectLocal: HTMLElement | null = null;
    let divDescuentos: HTMLElement;
    let descuentos: Descuento[] = [];
    let infoDias: InfoDia[] = [];
    let opcionesInstitucion: string[] = [];
    let opcionesProducto: string[] = [];
    let opcionesDia: string[] = [];
    let opcionesLocal: string[] = [];
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
        opcionesInstitucion = [];
        opcionesProducto = [];
        opcionesDia = [];
        opcionesLocal = [];
        institucionSeleccionada = "";
        productoSeleccionado = "";
        diaSeleccionado = "";
        localSeleccionado = "";

        for (const descuento of descuentos) {
            if (!opcionesInstitucion.includes(descuento.producto.institucion)) {
                opcionesInstitucion.push(descuento.producto.institucion);
            }
        }

        opcionesInstitucion.sort((a, b) => a.localeCompare(b));
        opcionesInstitucion = [...opcionesInstitucion];
    }

    function filtrarProductos(): void {
        diaSeleccionado = "";
        localSeleccionado = "";
        opcionesProducto = [];
        opcionesDia = [];
        opcionesLocal = [];

        for (const descuento of descuentos) {
            if (institucionSeleccionada.length > 0) {
                if (
                    descuento.producto.institucion !== institucionSeleccionada
                ) {
                    continue;
                }
            }

            if (!opcionesProducto.includes(descuento.producto.nombre)) {
                opcionesProducto.push(descuento.producto.nombre);
            }
        }

        opcionesProducto.sort((a, b) => a.localeCompare(b));
        opcionesProducto = [...opcionesProducto];
    }

    function filtrarDias(): void {
        localSeleccionado = "";
        opcionesDia = [];
        opcionesLocal = [];

        for (const descuento of descuentos) {
            if (descuento.dia.split(" ").length > 1) {
                continue;
            }

            if (institucionSeleccionada.length > 0) {
                if (
                    descuento.producto.institucion !== institucionSeleccionada
                ) {
                    continue;
                }
            }

            if (productoSeleccionado.length > 0) {
                if (descuento.producto.nombre !== productoSeleccionado) {
                    continue;
                }
            }

            if (!opcionesDia.includes(descuento.dia)) {
                opcionesDia.push(descuento.dia);
            }
        }

        opcionesDia = [
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
        ]
            .filter((x) => opcionesDia.map((d) => d.toLowerCase()).includes(x))
            .map((x) => capitalizeFirstLetter(x));

        opcionesDia = [...opcionesDia];
    }

    function filtrarLocales(): void {
        opcionesLocal = [];

        for (const descuento of descuentos) {
            if (institucionSeleccionada.length > 0) {
                if (
                    descuento.producto.institucion !== institucionSeleccionada
                ) {
                    continue;
                }
            }

            if (productoSeleccionado.length > 0) {
                if (descuento.producto.nombre !== productoSeleccionado) {
                    continue;
                }
            }

            if (diaSeleccionado.length > 0) {
                if (descuento.dia !== diaSeleccionado) {
                    continue;
                }
            }

            if (!opcionesLocal.includes(descuento.local)) {
                opcionesLocal.push(descuento.local);
            }
        }

        opcionesLocal.sort((a, b) => a.localeCompare(b));
        opcionesLocal = [...opcionesLocal];
    }

    function filtrarDescuentos(): void {
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
                descuento.producto.institucion !== institucionSeleccionada
            ) {
                continue;
            }

            if (
                productoSeleccionado.length > 0 &&
                descuento.producto.nombre !== productoSeleccionado
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
                    x.institucion === descuento.producto.institucion &&
                    x.nombre === descuento.producto.nombre &&
                    x.marca === descuento.producto.marca &&
                    x.segmento === descuento.producto.segmento &&
                    x.categoria === descuento.producto.categoria,
            );

            if (indexProducto < 0) {
                infoDias[indexDia].productos.push({
                    nombre: descuento.producto.nombre,
                    institucion: descuento.producto.institucion,
                    marca: descuento.producto.marca,
                    segmento: descuento.producto.segmento,
                    categoria: descuento.producto.categoria,
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
                    observacion: descuento.observacion,
                    info: descuento.info,
                });
            }
        }

        ordenarInfoDias(infoDias);
        infoDias = [...infoDias];
        opcionesInstitucion = [...opcionesInstitucion];
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

        if (elementInfoDiaHoy != null) {
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
            <div class="field" bind:this={selectInstitucion}>
                <label class="label" for="">Institución</label>
                <div class="select">
                    <select
                        bind:value={institucionSeleccionada}
                        disabled={opcionesInstitucion.length === 0}
                        on:change={async () => {
                            filtrarProductos();
                            filtrarDescuentos();
                            await tick();
                            if (selectProducto != null) {
                                selectProducto.scrollIntoView();
                            }
                        }}
                    >
                        <option value="">Ninguna</option>

                        {#each opcionesInstitucion as institucion}
                            <option value={institucion}>
                                {institucion}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field" bind:this={selectProducto}>
                <label class="label" for="">Producto</label>
                <div class="select">
                    <select
                        bind:value={productoSeleccionado}
                        disabled={opcionesProducto.length === 0}
                        on:change={async () => {
                            filtrarDias();
                            filtrarDescuentos();

                            await tick();
                            if (selectDia != null) {
                                selectDia.scrollIntoView();
                            }
                        }}
                    >
                        <option value="">Ninguno</option>

                        {#each opcionesProducto as producto}
                            <option value={producto}>
                                {producto}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field" bind:this={selectDia}>
                <label class="label" for="">Día de la semana</label>
                <div class="select">
                    <select
                        bind:value={diaSeleccionado}
                        disabled={opcionesDia.length === 0}
                        on:change={async () => {
                            filtrarLocales();
                            filtrarDescuentos();

                            await tick();
                            if (selectLocal != null) {
                                selectLocal.scrollIntoView();
                            }
                        }}
                    >
                        <option value="">Ninguno</option>

                        {#each opcionesDia as dia}
                            <option value={dia}>
                                {dia}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field" bind:this={selectLocal}>
                <label class="label" for="">Local</label>
                <div class="select">
                    <select
                        bind:value={localSeleccionado}
                        disabled={opcionesLocal.length === 0}
                        on:change={() => {
                            filtrarDescuentos();
                            divDescuentos.scrollIntoView();
                        }}
                    >
                        <option value="">Ninguno</option>

                        {#each opcionesLocal as local}
                            <option value={local}>
                                {local}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}

    <div class="descuentos mt-4" bind:this={divDescuentos}>
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
