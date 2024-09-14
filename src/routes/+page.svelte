<script lang="ts">
    import BusquedaBeneficios from "$lib/gui/BusquedaBeneficios.svelte";
    import Opciones from "$lib/gui/Opciones.svelte";
    import text from "$lib/text";
    import Router from "./Router.svelte";
</script>

<BusquedaBeneficios />

<!-- Título -->
<div class="title is-3">{text.appName}</div>

<hr />

<!-- Contenido -->
<div class="router">
    <Router />
</div>

<hr />

<Opciones />

<style>
    .title {
        margin: 0;
    }

    hr {
        background-color: #4c4c4c;
    }

    .router {
        height: 22rem;
        overflow: auto;
    }
</style>
