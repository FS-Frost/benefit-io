<script lang="ts">
    import { Producto } from "$lib/beneficios";
    import { KEY_PRODUCTOS } from "$lib/session";

    export let productos: Producto[];

    $: proveedor = productos.length > 0 ? productos[0].proveedor : "";

    function eliminarProducto(producto: Producto): void {
        const doContinue = confirm(
            `¿Eliminar ${producto.nombre} de ${producto.proveedor}?`,
        );
        if (!doContinue) {
            return;
        }

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

        productosUsuario = productosUsuario.filter(
            (x) =>
                x.proveedor !== producto.proveedor &&
                x.nombre !== producto.nombre,
        );

        productos = productos.filter(
            (x) =>
                x.proveedor !== producto.proveedor &&
                x.nombre !== producto.nombre,
        );

        localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productosUsuario));
    }
</script>

{#if productos.length > 0}
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
                            on:click={() => eliminarProducto(producto)}
                        ></button>
                        {producto.nombre}
                    </li>
                {/each}
            </ul>
        </div>
    </article>
{/if}

<style>
    article {
        color: white;
    }

    .proveedor {
        color: white;
        font-weight: 500;
    }
</style>
