<script lang="ts">
    import {
        Descuento,
        InfoDia,
        ordenarInfoDias,
        Producto,
    } from "$lib/beneficios";
    import { capitalizeFirstLetter, quitarTildes } from "$lib/text";
    import { onMount } from "svelte";
    import VistaInfoDia from "./VistaInfoDia.svelte";
    import { obtenerDescuentos } from "$lib/data";
    import { KEY_PRODUCTOS } from "$lib/session";

    let descuentos: Descuento[] = [];

    let busqueda: string = "";

    let infoDias: InfoDia[] = [];

    let hoy: string = "";

    let placeholderBusqueda: string = "";

    function filtrarDescuentos(): void {
        infoDias = [];

        const filtro = quitarTildes(busqueda.toLowerCase());
        const esMatch = (input: string): boolean => {
            const subfiltros = filtro.split(" ");
            for (const subfiltro of subfiltros) {
                if (!quitarTildes(input.toLowerCase()).includes(subfiltro)) {
                    return false;
                }
            }

            return true;
        };

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

            if (!(filtro.length > 0 && esMatch(JSON.stringify(descuento)))) {
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
                });
            }
        }

        ordenarInfoDias(infoDias);
        infoDias = [...infoDias];
    }

    onMount(() => {
        hoy = capitalizeFirstLetter(
            new Date().toLocaleDateString("es-ES", {
                weekday: "long",
            }),
        ).toLowerCase();

        descuentos = obtenerDescuentos();

        let productosUsuario: Producto[] = [];

        try {
            const rawProductosUsuario =
                localStorage.getItem(KEY_PRODUCTOS) ?? "[]";

            productosUsuario = Producto.array().parse(
                JSON.parse(rawProductosUsuario),
            );
        } catch (error) {
            console.error("error al obtener productos guardados", error);
        }

        placeholderBusqueda = `${hoy}`;

        for (const descuento of descuentos) {
            if (descuento.dia.toLowerCase() !== hoy) {
                continue;
            }

            if (
                productosUsuario.length > 0 &&
                !productosUsuario.some(
                    (x) =>
                        x.institucion === descuento.producto.institucion &&
                        x.nombre === descuento.producto.nombre &&
                        x.marca === descuento.producto.marca &&
                        x.segmento === descuento.producto.segmento &&
                        x.categoria === descuento.producto.categoria,
                )
            ) {
                continue;
            }

            placeholderBusqueda = `${hoy} ${descuento.local.toLowerCase()}`;
            break;
        }

        filtrarDescuentos();
    });
</script>

<div class="field">
    <div class="control has-icons-left has-icons-right">
        <input
            class="input"
            type="search"
            placeholder={placeholderBusqueda}
            bind:value={busqueda}
            on:input={() => filtrarDescuentos()}
        />
        <span class="icon is-small is-left">
            <i class="fas fa-magnifying-glass"></i>
        </span>
    </div>

    {#if busqueda.length > 0 && infoDias.length === 0}
        <p class="mt-2">Búsqueda sin resultados.</p>
    {/if}

    {#if infoDias.length > 0}
        <div class="mt-3">
            {#each infoDias as dia}
                <VistaInfoDia {dia} />
            {/each}
        </div>
    {/if}
</div>
