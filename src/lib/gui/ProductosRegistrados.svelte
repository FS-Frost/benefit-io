<script lang="ts">
    import { Producto } from "$lib/beneficios";
    import { KEY_PRODUCTOS } from "$lib/session";
    import Swal from "sweetalert2";

    export let productos: Producto[];

    $: institucion = productos.length > 0 ? productos[0].institucion : "";

    async function eliminarProducto(producto: Producto): Promise<void> {
        const nombreCompleto = `${producto.institucion} ${producto.nombre} ${producto.marca} ${producto.segmento}`;

        const response = await Swal.fire({
            icon: "question",
            title: "¿Eliminar producto?",
            text: nombreCompleto,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "darkred",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
        });

        if (!response.isConfirmed) {
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
                x.institucion !== producto.institucion &&
                x.nombre !== producto.nombre &&
                x.marca !== producto.marca &&
                x.segmento !== producto.segmento,
        );

        productos = productos.filter(
            (x) =>
                x.institucion !== producto.institucion &&
                x.nombre !== producto.nombre &&
                x.marca !== producto.marca &&
                x.segmento !== producto.segmento,
        );

        localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productosUsuario));

        await Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: nombreCompleto,
            confirmButtonText: "Aceptar",
        });
    }
</script>

{#if productos.length > 0}
    <article class="message">
        <div class="message-header">
            <p class="institucion">{institucion}</p>
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
                        {producto.marca}
                        {#if producto.segmento.length > 0}
                            {producto.segmento}
                        {/if}
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

    .institucion {
        color: white;
        font-weight: 500;
    }
</style>
