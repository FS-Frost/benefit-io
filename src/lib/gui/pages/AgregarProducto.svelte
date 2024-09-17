<script lang="ts">
    import text from "$lib/text";
    import { onMount } from "svelte";
    import { KEY_PRODUCTOS } from "$lib/session";
    import { Producto } from "$lib/beneficios";
    import { obtenerTarjetas } from "$lib/data";
    import jsonTarjetas from "$lib/tarjetas.json";
    import Swal from "sweetalert2";

    let tarjetas: Producto[] = [];

    let opcionesInstitucion: string[] = [];
    let institucionSeleccionada: string = "";

    let opcionesProducto: string[] = [];
    let productoSeleccionado: string = "";

    let opcionesMarca: string[] = [];
    let marcaSeleccionada: string = "";

    let opcionesTarjeta: string[] = [];
    let tarjetaSeleccionada: string = "";

    function filtrarInstituciones(): void {
        opcionesInstitucion = [...new Set(tarjetas.map((x) => x.institucion))];
        opcionesProducto = [];
        opcionesMarca = [];
        opcionesTarjeta = [];
        institucionSeleccionada = "";
        productoSeleccionado = "";
        marcaSeleccionada = "";
        tarjetaSeleccionada = "";

        opcionesInstitucion.sort((a, b) => a.localeCompare(b));
        opcionesInstitucion = [...opcionesInstitucion];
    }

    function filtrarProductos(): void {
        opcionesMarca = [];
        opcionesTarjeta = [];
        productoSeleccionado = "";
        marcaSeleccionada = "";
        tarjetaSeleccionada = "";

        opcionesProducto = [
            ...new Set(
                tarjetas
                    .filter((x) => x.institucion === institucionSeleccionada)
                    .map((x) => x.nombre),
            ),
        ];

        opcionesProducto.sort((a, b) => a.localeCompare(b));
        opcionesProducto = [...opcionesProducto];
    }

    function filtrarMarcas(): void {
        opcionesTarjeta = [];
        marcaSeleccionada = "";
        tarjetaSeleccionada = "";

        opcionesMarca = [
            ...new Set(
                tarjetas
                    .filter(
                        (x) =>
                            x.institucion === institucionSeleccionada &&
                            x.nombre === productoSeleccionado,
                    )
                    .map((x) => x.marca),
            ),
        ];

        opcionesMarca.sort((a, b) => a.localeCompare(b));
        opcionesMarca = [...opcionesMarca];
    }

    function filtrarTarjetas(): void {
        tarjetaSeleccionada = "";

        opcionesTarjeta = [
            ...new Set(
                tarjetas
                    .filter(
                        (x) =>
                            x.institucion === institucionSeleccionada &&
                            x.nombre === productoSeleccionado &&
                            x.marca === marcaSeleccionada,
                    )
                    .map((x) => x.segmento),
            ),
        ];

        opcionesTarjeta.sort((a, b) => a.localeCompare(b));
        opcionesTarjeta = [...opcionesTarjeta];
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
                x.institucion === institucionSeleccionada &&
                x.nombre === productoSeleccionado &&
                x.marca === marcaSeleccionada &&
                x.segmento === tarjetaSeleccionada,
        );

        const producto = tarjetas.find(
            (x) =>
                x.institucion === institucionSeleccionada &&
                x.nombre === productoSeleccionado &&
                x.marca === marcaSeleccionada &&
                x.segmento === tarjetaSeleccionada,
        );

        if (producto == null) {
            console.error("producto no existe", {
                institucionSeleccionada,
                productoSeleccionado,
                marcaSeleccionada,
            });

            return;
        }

        if (productoGuardado == null) {
            productosUsuario.push(producto);
        }

        localStorage.setItem(KEY_PRODUCTOS, JSON.stringify(productosUsuario));

        Swal.fire({
            icon: "success",
            title: "Producto guardado",
            text: `${institucionSeleccionada} ${productoSeleccionado} ${tarjetaSeleccionada} ${marcaSeleccionada}`,
            confirmButtonText: "Aceptar",
        });
    }

    onMount(() => {
        tarjetas = obtenerTarjetas(jsonTarjetas);
        filtrarInstituciones();
    });
</script>

<svelte:head>
    <title>{text.appName}</title>
</svelte:head>

<section class="inicio">
    <div class="mis-beneficios mb-4">
        <div class="titulo-beneficios">
            <div class="title is-4">{text.paginaAgregarProductos}</div>
        </div>
    </div>

    <div class="field">
        <label class="label" for="">Institución</label>
        <div class="select">
            <select
                bind:value={institucionSeleccionada}
                on:click={() => filtrarProductos()}
            >
                {#each opcionesInstitucion as institucion}
                    <option value={institucion}>
                        {institucion}
                    </option>
                {/each}
            </select>
        </div>
    </div>

    {#if opcionesProducto.length > 0}
        <div class="field">
            <label class="label" for="">Producto</label>
            <div class="select">
                <select
                    bind:value={productoSeleccionado}
                    on:click={() => filtrarMarcas()}
                >
                    {#each opcionesProducto as producto}
                        <option value={producto}>
                            {producto}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}

    {#if opcionesMarca.length > 0}
        <div class="field">
            <label class="label" for="">Marca</label>
            <div class="select">
                <select
                    bind:value={marcaSeleccionada}
                    on:click={() => filtrarTarjetas()}
                >
                    {#each opcionesMarca as marca}
                        <option value={marca}>
                            {marca}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}

    {#if opcionesTarjeta.length > 0}
        <div class="field">
            <label class="label" for="">Tarjeta</label>
            <div class="select">
                <select bind:value={tarjetaSeleccionada}>
                    {#each opcionesTarjeta as tarjeta}
                        <option value={tarjeta}>
                            {tarjeta}
                        </option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}

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
