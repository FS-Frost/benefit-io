<script lang="ts">
    import { onMount } from "svelte";
    import NavItem from "./NavItem.svelte";
    import { BuildInfo, getBuildInfo } from "$lib/buildInfo";
    import text from "$lib/text";
    import {
        cerrarSesion,
        iniciarSesionGoogle,
        storeUsuario,
        Usuario,
    } from "$lib/auth";
    import Swal from "sweetalert2";

    let usuario: Usuario | null = null;
    let buildInfo: BuildInfo = BuildInfo.parse({});
    let navMenu: HTMLElement;
    let navToggle: HTMLElement;

    function toggleMenu(): void {
        if (navToggle) {
            navToggle.classList.toggle("is-active");
        }

        if (navMenu) {
            navMenu.classList.toggle("is-active");
        }
    }

    async function manejarIniciarSesionGoogle(): Promise<void> {
        const usuario = await iniciarSesionGoogle();
        if (usuario == null || usuario.email.length === 0) {
            return;
        }

        await Swal.fire({
            icon: "success",
            title: `Bienvenido, ${usuario.email}`,
            confirmButtonText: "Continuar",
        });
    }

    async function manejarCerrarSesion(): Promise<void> {
        const response = await Swal.fire({
            icon: "question",
            title: "¿Cerrar sesión?",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
        });

        if (!response.isConfirmed) {
            return;
        }

        cerrarSesion();
    }

    onMount(async () => {
        buildInfo = await getBuildInfo();
        storeUsuario.subscribe((valor) => (usuario = valor));
    });
</script>

<nav class="navbar">
    <div class="navbar-brand">
        <div class="brand">{text.appName}</div>
        <a
            bind:this={navToggle}
            on:click={() => toggleMenu()}
            role="button"
            tabindex="0"
            class="navbar-burger"
            data-target="navMenu"
            aria-label="menu"
            aria-expanded="false"
            on:keydown={() => {}}
            href={`javascript:;`}
        >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div bind:this={navMenu} class="navbar-menu" id="navMenu">
        <div class="navbar-start">
            <NavItem text={text.paginaBeneficios} page="inicio" />

            <NavItem text={text.paginaProductos} page="mis-productos" />

            <NavItem text={text.paginaExplorar} page="explorar-beneficios" />

            <NavItem
                text={text.paginaAgregarProductos}
                page="agregar-productos"
            />

            <!-- <NavItem text={text.acercaDe} page="acercaDe" /> -->

            {#if usuario == null}
                <a
                    class="navbar-item"
                    href="#_"
                    on:click={() => manejarIniciarSesionGoogle()}
                >
                    {text.iniciarSesion}
                </a>
            {:else}
                <a
                    class="navbar-item"
                    href="#_"
                    on:click={() => manejarCerrarSesion()}
                >
                    {text.cerrarSesion}
                </a>
            {/if}
        </div>
    </div>
</nav>

<style>
    .brand {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: larger;
        font-weight: bold;
        margin-left: 1rem;
        margin-right: 1rem;
    }
</style>
