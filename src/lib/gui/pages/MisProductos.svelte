<script lang="ts">
    import text from "$lib/text";
    import { onMount } from "svelte";
    import type { Producto } from "$lib/beneficios";
    import ProductosRegistrados from "../ProductosRegistrados.svelte";

    let listasProductos: Producto[][] = [];

    onMount(() => {
        const productosUsuario: Producto[] = [
            {
                nombre: "Tarjeta de débito",
                proveedor: "Banco de Chile",
            },
            {
                nombre: "Tarjeta de crédito - Black",
                proveedor: "Banco de Chile",
            },
            {
                nombre: "Tarjeta de débito",
                proveedor: "Banco Santander",
            },
            {
                nombre: "Tarjeta de crédito Platinium",
                proveedor: "Banco Santander",
            },
            {
                nombre: "Tarjeta de crédito - BCI Plus",
                proveedor: "Banco BCI",
            },
        ];

        listasProductos = [];

        for (const producto of productosUsuario) {
            const lista = listasProductos.find((lista) => lista.some((p) => p.proveedor === producto.proveedor));
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
        <ProductosRegistrados {productos} />
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
