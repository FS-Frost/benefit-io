<script lang="ts">
    import text from "$lib/text";
    import { onMount } from "svelte";
    import type { Proveedor } from "$lib/beneficios";

    let proveedores: Proveedor[] = [];
    let proveedorSeleccionado: string = "";
    let productoSeleccionado: string = "";

    $: productos = proveedores.find((x) => x.nombre === proveedorSeleccionado)?.productos ?? [];

    onMount(() => {
        proveedores = [
            {
                nombre: "Banco de Chile",
                productos: ["Tarjeta de débito", "Tarjeta de crédito - Black"],
            },
            {
                nombre: "Banco Santander",
                productos: ["Tarjeta de débito", "Tarjeta de crédito Platinium"],
            },
            {
                nombre: "Banco BCI",
                productos: ["Tarjeta de crédito - BCI Plus"],
            },
        ];
    });
</script>

<svelte:head>
    <title>{text.appName}</title>
</svelte:head>

<section class="inicio">
    <div class="mis-beneficios mb-4">
        <div class="titulo-beneficios">
            <div class="title is-3">{text.paginaAgregarProductos}</div>
        </div>
    </div>

    <div class="field">
        <label class="label" for="">Institución</label>
        <div class="select">
            <select bind:value={proveedorSeleccionado}>
                {#each proveedores as proveedor}
                    <option value={proveedor.nombre}>
                        {proveedor.nombre}
                    </option>
                {/each}
            </select>
        </div>
    </div>

    <div class="field">
        <label class="label" for="">Producto</label>
        <div class="select">
            <select bind:value={productoSeleccionado} disabled={productos.length === 0}>
                {#each productos as producto}
                    <option value={producto}>
                        {producto}
                    </option>
                {/each}
            </select>
        </div>
    </div>

    <div class="buttons">
        <button class="button is-success" disabled={productoSeleccionado.length == 0}> Añadir producto </button>
    </div>
</section>

<style>
    .title {
        font-weight: 500;
    }

    .mis-beneficios {
        display: flex;
        justify-content: space-between;
    }

    button {
        color: white;
        font-weight: bold;
        width: 100%;
    }

    select,
    .select {
        width: 100%;
    }
</style>
