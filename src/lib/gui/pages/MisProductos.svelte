<script lang="ts">
    import text from "$lib/text";
    import { onMount } from "svelte";
    import { Producto } from "$lib/beneficios";
    import ProductosRegistrados from "../ProductosRegistrados.svelte";
    import { KEY_PRODUCTOS } from "$lib/session";

    let listasProductos: Producto[][] = [];

    onMount(() => {
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

        listasProductos = [];

        for (const producto of productosUsuario) {
            const lista = listasProductos.find((lista) =>
                lista.some((p) => p.proveedor === producto.proveedor),
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
            <div class="title is-3">{text.paginaProductos}</div>
        </div>
    </div>

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
