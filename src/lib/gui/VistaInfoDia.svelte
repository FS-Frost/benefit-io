<script lang="ts">
    import type { InfoDia } from "$lib/beneficios";

    export let dia: InfoDia;
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
