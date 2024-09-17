<script lang="ts">
    import { activePage, type ActivePage, isPage } from "$lib/activePage";
    import { onMount } from "svelte";
    import Inicio from "$lib/gui/pages/Inicio.svelte";
    import MisProductos from "$lib/gui/pages/MisProductos.svelte";
    import AgregarProducto from "$lib/gui/pages/AgregarProducto.svelte";
    import ExplorarBeneficios from "$lib/gui/pages/ExplorarBeneficios.svelte";
    import IniciarSesion from "$lib/gui/pages/IniciarSesion.svelte";

    let page: ActivePage;

    onMount(() => {
        activePage.subscribe((newActivePage) => {
            if (newActivePage == null) {
                return;
            }

            page = newActivePage;
        });

        const urlParams = new URLSearchParams(location.search);
        const rawUrlPage = urlParams.get("pagina") ?? "";
        const urlPage: ActivePage = isPage(rawUrlPage) ? rawUrlPage : "inicio";
        activePage.set(urlPage);
    });
</script>

{#if page == "inicio"}
    <Inicio />
{:else if page == "mis-productos"}
    <MisProductos />
{:else if page == "explorar-beneficios"}
    <ExplorarBeneficios />
{:else if page == "agregar-productos"}
    <AgregarProducto />
{/if}
