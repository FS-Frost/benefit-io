<div class="opciones">
    <div class="opcion">
        <i class="fa-solid fa-percent"></i>
        <span>Mis beneficios</span>
    </div>

    <div class="opcion">
        <i class="fa-solid fa-credit-card"></i>
        <span>Mis productos</span>
    </div>

    <div class="opcion">
        <i class="fa-solid fa-compass"></i>
        <span>Explorar beneficios</span>
    </div>

    <div class="opcion">
        <i class="fa-solid fa-plus"></i>
        <span>Añadir productos</span>
    </div>
</div>

<style>
    .opciones {
        display: flex;
        justify-content: space-between;
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
