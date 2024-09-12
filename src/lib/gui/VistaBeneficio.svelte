<script lang="ts">
    import type { Beneficio } from "$lib/beneficios";

    export let beneficio: Beneficio;
</script>

<div class="beneficio">
    <div class="info">
        {beneficio.proveedor} - {beneficio.producto}
    </div>

    {#each beneficio.ofertas as oferta}
        <div class="oferta">
            <span>{oferta.tienda}</span>
            <span>{oferta.descuento} %</span>
        </div>
    {/each}
</div>

<style>
    .beneficio {
        background-color: var(--color2);
        border-radius: 0.5rem;
        margin-bottom: 0.7rem;
        padding: 0.7rem;
        font-weight: bold;
        color: white;
    }

    .oferta {
        color: rgb(120, 204, 85);
        display: flex;
        justify-content: space-between;
    }
</style>
