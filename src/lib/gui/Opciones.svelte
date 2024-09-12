<script lang="ts">
    import { activePage, type ActivePage } from "$lib/activePage";
    import text from "$lib/text";
    import { onMount } from "svelte";

    type Opcion = {
        icon: string;
        page: ActivePage;
        text: string;
    };

    const opciones: Opcion[] = [
        {
            icon: "fa-percent",
            page: "inicio",
            text: text.paginaBeneficios,
        },
        {
            icon: "fa-credit-card",
            page: "mis-productos",
            text: text.paginaProductos,
        },
        {
            icon: "fa-compass",
            page: "explorar-beneficios",
            text: text.paginaExplorar,
        },
        {
            icon: "fa-plus",
            page: "agregar-productos",
            text: text.paginaAgregarProductos,
        },
    ];

    let currentPage: ActivePage = "inicio";

    onMount(() => {
        activePage.subscribe((newActivePage) => {
            currentPage = newActivePage;
        });
    });
</script>

<div class="opciones">
    {#each opciones as opcion}
        <a
            class={`opcion ${currentPage === opcion.page ? "active" : ""}`}
            on:click={() => activePage.set(opcion.page)}
            href={`?pagina=${opcion.page}`}
        >
            <i class={`fa-solid ${opcion.icon}`}></i>
            <span>{opcion.text}</span>
        </a>
    {/each}
</div>

<style>
    .opciones {
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
    }

    .opcion {
        background-color: var(--color2);
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0.5rem;
        color: white;
        font-weight: 500;
        width: 7rem;
        height: 7rem;
        font-size: small;
        margin: 0.5rem;
    }

    .opcion:hover {
        background-color: gray;
    }

    .opcion i {
        text-align: center;
        font-size: xx-large;
    }

    .opcion span {
        margin-top: 0.3rem;
        text-align: center;
    }

    .opcion.active {
        background-color: rgb(70, 128, 45);
    }
</style>
