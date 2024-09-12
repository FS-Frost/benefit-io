<script lang="ts">
    import type { Producto } from "$lib/beneficios";

    export let productos: Producto[];

    $: proveedor = productos.length > 0 ? productos[0].proveedor : "";
</script>

<article class="message">
    <div class="message-header">
        <p class="proveedor">{proveedor}</p>
    </div>
    <div class="message-body">
        <ul>
            {#each productos as producto}
                <li>
                    <button
                        class="delete"
                        aria-label="delete"
                        on:click={() => {
                            confirm(`¿Eliminar ${producto.nombre} de ${producto.proveedor}?`);
                        }}
                    ></button>
                    {producto.nombre}
                </li>
            {/each}
        </ul>
    </div>
</article>

<style>
    article {
        color: white;
    }

    .proveedor {
        color: white;
        font-weight: 500;
    }
</style>
