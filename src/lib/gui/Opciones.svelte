<script>
    import { activePage } from "$lib/activePage";
</script>

<div class="opciones">
    <div class="opcion" on:click={() => activePage.set("inicio")} on:keydown={() => {}} role="button" tabindex="0">
        <i class="fa-solid fa-percent"></i>
        <span>Mis beneficios</span>
    </div>

    <div class="opcion" on:click={() => activePage.set("mis-productos")} on:keydown={() => {}} role="button" tabindex="0">
        <i class="fa-solid fa-credit-card"></i>
        <span>Mis productos</span>
    </div>

    <div class="opcion" on:click={() => activePage.set("explorar-beneficios")} on:keydown={() => {}} role="button" tabindex="0">
        <i class="fa-solid fa-compass"></i>
        <span>Explorar beneficios</span>
    </div>

    <div class="opcion" on:click={() => activePage.set("agregar-productos")} on:keydown={() => {}} role="button" tabindex="0">
        <i class="fa-solid fa-plus"></i>
        <span>Añadir productos</span>
    </div>
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
</style>
