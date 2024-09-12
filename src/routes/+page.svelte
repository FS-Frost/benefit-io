<script lang="ts">
    import Opciones from "$lib/gui/Opciones.svelte";
    import text from "$lib/text";
    import Router from "./Router.svelte";
</script>

<!-- Buscar beneficios -->
<div class="field">
    <div class="control has-icons-left has-icons-right">
        <input class="input" type="search" placeholder="Buscar beneficios" />
        <span class="icon is-small is-left">
            <i class="fas fa-magnifying-glass"></i>
        </span>
    </div>
</div>

<!-- Título -->
<div class="title is-3">{text.appName}</div>

<hr />

<!-- Contenido -->
<Router />

<hr />

<Opciones />

<style>
    .title {
        margin: 0;
    }

    hr {
        background-color: #4c4c4c;
    }
</style>
