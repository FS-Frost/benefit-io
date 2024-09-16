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
        <div class="container-opcion">
            <a
                class={`opcion ${currentPage === opcion.page ? "active" : ""}`}
                on:click={() => activePage.set(opcion.page)}
                href={`?pagina=${opcion.page}`}
            >
                <i class={`fa-solid ${opcion.icon}`}></i>
            </a>

            <p class="texto">{opcion.text}</p>
        </div>
    {/each}
</div>

<style>
    .opciones {
        display: grid;
        grid-template-columns: auto auto auto auto;
        grid-gap: 1rem;
        justify-items: center;
        align-items: center;
    }

    .container-opcion {
        border: 2px solid rgba(0, 0, 0, 0);
        width: 4rem;
        height: 4rem;
    }

    .opcion {
        background-color: var(--color2);
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        color: white;
        font-size: x-small;
        width: 100%;
        height: 100%;
    }

    .opcion:hover {
        background-color: gray;
    }

    .opcion i {
        text-align: center;
        font-size: x-large;
    }

    .texto {
        margin-top: 0.3rem;
        font-size: x-small;
        text-align: center;
        font-weight: bold;
    }

    .opcion.active {
        background-color: rgb(70, 128, 45);
    }
</style>
