<script lang="ts">
    import { Descuento, InfoDia, ordenarInfoDias } from "$lib/beneficios";
    import { capitalizeFirstLetter, quitarTildes } from "$lib/text";
    import { onMount } from "svelte";
    import VistaInfoDia from "./VistaInfoDia.svelte";
    import { obtenerDescuentos } from "$lib/data";

    let descuentos: Descuento[] = [];

    let busqueda: string = "";

    let infoDias: InfoDia[] = [];

    let hoy: string = "";

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
        console.log("infoDias", infoDias);
    }

    onMount(() => {
        hoy = capitalizeFirstLetter(
            new Date().toLocaleDateString("es-ES", {
                weekday: "long",
            }),
        ).toLowerCase();

        descuentos = obtenerDescuentos();

        filtrarDescuentos();
    });
</script>

<div class="field">
    <div class="control has-icons-left has-icons-right">
        <input
            class="input"
            type="search"
            placeholder={hoy}
            bind:value={busqueda}
            on:input={() => filtrarDescuentos()}
        />
        <span class="icon is-small is-left">
            <i class="fas fa-magnifying-glass"></i>
        </span>
    </div>

    {#if infoDias.length > 0}
        <div class="mt-3">
            {#each infoDias as dia}
                <VistaInfoDia {dia} />
            {/each}
        </div>
    {/if}
</div>
