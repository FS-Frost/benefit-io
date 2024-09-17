<script lang="ts">
    import text from "$lib/text";
    import { onMount } from "svelte";
    import { Producto } from "$lib/beneficios";
    import ProductosRegistrados from "../ProductosRegistrados.svelte";
    import { KEY_PRODUCTOS } from "$lib/session";

    let productosUsuario: Producto[] = [];
    let listasProductos: Producto[][] = [];

    onMount(() => {
        try {
            const rawProductosUsuario =
                localStorage.getItem(KEY_PRODUCTOS) ?? "[]";

            productosUsuario = Producto.array().parse(
                JSON.parse(rawProductosUsuario),
            );
        } catch (error) {
            console.error("error al obtener productos guardados", error);
        }

        listasProductos = [];

        for (const producto of productosUsuario) {
            // Omitir productos no presentes en los descuentos
            // if (
            //     !descuentos.some(
            //         (d) =>
            //             d.producto === producto.nombre &&
            //             d.institucion === producto.institucion,
            //     )
            // ) {
            //     console.log(
            //         "Producto de usuario no presente en los descuentos:",
            //         producto,
            //     );
            //     continue;
            // }

            const lista: Producto[] | undefined = listasProductos.find(
                (lista) =>
                    lista.some((p) => p.institucion === producto.institucion),
            );

            if (lista == null) {
                listasProductos.push([producto]);
                continue;
            }

            lista.push(producto);
        }
    });
</script>

<svelte:head>
    <title>{text.appName}</title>
</svelte:head>

<section class="inicio">
    <div class="mis-beneficios mb-4">
        <div class="titulo-beneficios">
            <div class="title is-4">{text.paginaProductos}</div>
        </div>
    </div>

    {#if productosUsuario.length === 0}
        <p class="mb-4">{text.sinProductos}</p>
    {/if}

    {#each listasProductos as productos}
        <ProductosRegistrados bind:productos />
    {/each}
</section>

<style>
    .title {
        font-weight: 500;
    }

    .mis-beneficios {
        display: flex;
        justify-content: space-between;
    }
</style>
