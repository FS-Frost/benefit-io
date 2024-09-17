<script lang="ts">
    import type { InfoDia, Oferta } from "$lib/beneficios";
    import { onMount } from "svelte";

    export let dia: InfoDia;

    let hoy: string = "";

    function mostrarOferta(oferta: Oferta): void {
        alert(`${oferta.local}: ${oferta.descuento} %`);
    }

    onMount(() => {
        hoy = new Date()
            .toLocaleDateString("es-ES", {
                weekday: "long",
            })
            .toLowerCase();

        dia.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));

        for (const producto of dia.productos) {
            producto.ofertas.sort(
                (a, b) =>
                    b.descuento - a.descuento || a.local.localeCompare(b.local),
            );
        }
    });
</script>

<div class="dia">
    <div class="subtitulo">
        Septiembre: {dia.dia}
        {#if dia.dia.toLowerCase() === hoy}
            (hoy)
        {/if}
    </div>

    {#each dia.productos as producto}
        <div class="producto">
            {producto.institucion}
            {producto.nombre}
            {producto.marca}
            {producto.segmento}
        </div>

        {#each producto.ofertas as oferta}
            <div
                class="oferta"
                on:click={() => mostrarOferta(oferta)}
                on:keydown={() => {}}
                role="button"
                tabindex="0"
            >
                <span class="local">{oferta.local}</span>
                <span class="descuento">{oferta.descuento} %</span>
            </div>
        {/each}
    {/each}
</div>

<style>
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

    .producto {
        font-size: small;
    }

    .oferta {
        color: rgb(120, 204, 85);
        display: flex;
        justify-content: space-between;
        font-size: small;
    }

    .local {
        width: 80%;
    }

    .descuento {
        width: auto;
    }
</style>
