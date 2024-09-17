<script lang="ts">
    import "./styles.css";
    import NavBar from "$lib/gui/nav/NavBar.svelte";
    import { obtenerUsuario, storeUsuario, type Usuario } from "$lib/auth";
    import { onMount } from "svelte";
    import IniciarSesion from "$lib/gui/pages/IniciarSesion.svelte";

    let usuario: Usuario | null = null;

    onMount(async () => {
        storeUsuario.set(obtenerUsuario());
        storeUsuario.subscribe((valor) => (usuario = valor));
    });
</script>

<div class="app">
    <NavBar />

    <main class="layout">
        {#if usuario == null}
            <IniciarSesion />
        {:else}
            <slot />
        {/if}
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        padding-top: 0.5rem;
        width: 100%;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
