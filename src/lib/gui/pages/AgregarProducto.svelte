<script lang="ts">
    import text from "$lib/text";
    import { onMount } from "svelte";
    import { KEY_PRODUCTOS } from "$lib/session";
    import { Descuento, Producto } from "$lib/beneficios";
    import { obtenerDescuentos } from "$lib/data";

    let descuentos: Descuento[] = [];
    let proveedores: string[] = [];
    let productos: string[] = [];
    let proveedorSeleccionado: string = "";
    let productoSeleccionado: string = "";

    function filtrarProveedores(): void {
        console.log("filtrarProveedores");
        proveedores = [];
        productos = [];
        proveedorSeleccionado = "";
        productoSeleccionado = "";

        for (const descuento of descuentos) {
            if (!proveedores.includes(descuento.proveedor)) {
                proveedores.push(descuento.proveedor);
            }
        }

        proveedores.sort((a, b) => a.localeCompare(b));
        proveedores = [...proveedores];
    }

    function filtrarProductos(): void {
        console.log("filtrarProductos");
        productos = [];

        for (const descuento of descuentos) {
            if (proveedorSeleccionado.length > 0) {
                if (descuento.proveedor !== proveedorSeleccionado) {
                    continue;
                }
            }

            if (!productos.includes(descuento.producto)) {
                productos.push(descuento.producto);
            }
        }

        productos.sort((a, b) => a.localeCompare(b));
        productos = [...productos];
    }

    function agregarProducto(): void {
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

        const productoGuardado = productosUsuario.find(
            (x) =>
                x.proveedor === proveedorSeleccionado &&
                x.nombre === productoSeleccionado,
        );

        if (productoGuardado == null) {
            productosUsuario.push({
                nombre: productoSeleccionado,
                proveedor: proveedorSeleccionado,
            });
        }

        localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productosUsuario));

        alert("Producto guardado.");
    }

    onMount(() => {
        descuentos = obtenerDescuentos();
        filtrarProveedores();
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
            <select
                bind:value={proveedorSeleccionado}
                on:click={() => filtrarProductos()}
            >
                {#each proveedores as proveedor}
                    <option value={proveedor}>
                        {proveedor}
                    </option>
                {/each}
            </select>
        </div>
    </div>

    <div class="field">
        <label class="label" for="">Producto</label>
        <div class="select">
            <select
                bind:value={productoSeleccionado}
                disabled={productos.length === 0}
            >
                {#each productos as producto}
                    <option value={producto}>
                        {producto}
                    </option>
                {/each}
            </select>
        </div>
    </div>

    <div class="buttons">
        <button
            class="button is-success"
            disabled={productoSeleccionado.length == 0}
            on:click={() => agregarProducto()}
        >
            Añadir producto
        </button>
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
