<script lang="ts">
    import text from "$lib/text";
    import { onMount } from "svelte";
    import { Oferta, Producto, type Proveedor } from "$lib/beneficios";
    import { data } from "$lib/data";
    import { z } from "zod";

    let dias: InfoDia[] = [];

    let proveedores: Proveedor[] = [];

    let proveedorSeleccionado: string = "";

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

    onMount(() => {
        const nombresDias: string[] = [
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
            "domingo",
        ];

        for (const descuento of data) {
            if (descuento.dia.split(" ").length > 1) {
                continue;
            }

            let indexDia = dias.findIndex((x) => x.dia === descuento.dia);

            if (indexDia < 0) {
                dias.push({
                    dia: descuento.dia,
                    productos: [],
                    orden: nombresDias.indexOf(descuento.dia.toLowerCase()),
                });

                indexDia = dias.length - 1;
            }

            let indexProducto = dias[indexDia].productos.findIndex(
                (x) => x.nombre === descuento.producto,
            );

            if (indexProducto < 0) {
                dias[indexDia].productos.push({
                    nombre: descuento.producto,
                    proveedor: descuento.proveedor,
                    ofertas: [],
                });

                indexProducto = dias[indexDia].productos.length - 1;
            }

            let indexOferta = dias[indexDia].productos[
                indexProducto
            ].ofertas.findIndex((x) => x.tienda === descuento.tienda);

            if (indexOferta < 0) {
                dias[indexDia].productos[indexProducto].ofertas.push({
                    tienda: descuento.tienda,
                    descuento: descuento.descuento,
                });
            }
        }

        dias.sort((a, b) => {
            if (a.orden > b.orden) {
                return 1;
            }

            if (a.orden < b.orden) {
                return -1;
            }

            return 0;
        });

        dias = [...dias];

        console.log(dias);
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
                    <select bind:value={proveedorSeleccionado}>
                        {#each proveedores as proveedor}
                            <option value={proveedor.nombre}>
                                {proveedor.nombre}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label" for="">Producto</label>
                <div class="select">
                    <select bind:value={proveedorSeleccionado}>
                        {#each proveedores as proveedor}
                            <option value={proveedor.nombre}>
                                {proveedor.nombre}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label" for="">Día de la semana</label>
                <div class="select">
                    <select bind:value={proveedorSeleccionado}>
                        {#each proveedores as proveedor}
                            <option value={proveedor.nombre}>
                                {proveedor.nombre}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>

            <div class="field">
                <label class="label" for="">Local</label>
                <div class="select">
                    <select bind:value={proveedorSeleccionado}>
                        {#each proveedores as proveedor}
                            <option value={proveedor.nombre}>
                                {proveedor.nombre}
                            </option>
                        {/each}
                    </select>
                </div>
            </div>
        </div>
    {/if}

    <div class="descuentos mt-4">
        {#each dias as dia}
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
