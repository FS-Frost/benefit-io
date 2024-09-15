<script lang="ts">
    import type { InfoDia } from "$lib/beneficios";
    import { onMount } from "svelte";

    export let dia: InfoDia;

    onMount(() => {
        dia.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));

        for (const producto of dia.productos) {
            producto.ofertas.sort(
                (a, b) =>
                    b.descuento - a.descuento ||
                    a.tienda.localeCompare(b.tienda),
            );
        }
    });
</script>

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

    .oferta {
        color: rgb(120, 204, 85);
        display: flex;
        justify-content: space-between;
    }
</style>
