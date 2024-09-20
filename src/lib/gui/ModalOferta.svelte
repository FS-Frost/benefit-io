<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { Oferta, Producto } from "$lib/beneficios";
    import Modal from "./Modal.svelte";

    let dia: string = "";
    let producto: Producto = Producto.parse({});
    let oferta: Oferta = Oferta.parse({});
    let hoy: string = "";

    const dispatch = createEventDispatcher<{
        open: undefined;
        close: undefined;
    }>();

    let modal: Modal;

    export function cargarOferta(
        nuevoDia: string,
        nuevoProducto: Producto,
        nuevaOferta: Oferta,
    ): void {
        dia = nuevoDia;
        producto = nuevoProducto;
        oferta = nuevaOferta;
    }

    export function open(): void {
        if (modal == null) {
            return;
        }

        modal.open();
        dispatch("open");
    }

    export function close(): void {
        if (modal == null) {
            return;
        }

        modal.close();
        dispatch("close");
    }

    onMount(() => {
        hoy = new Date()
            .toLocaleDateString("es-ES", {
                weekday: "long",
            })
            .toLowerCase();
    });
</script>

<Modal
    bind:this={modal}
    title="Beneficio"
    acceptButtonText="Volver"
    cancelButtonHidden
    on:accept={() => close()}
>
    <div class="mt-4">
        <p>
            Los
            <b>
                {dia.toLowerCase()}
                {#if dia.toLowerCase() === hoy}
                    (hoy)
                {/if}
            </b>
            tienes un descuento del
            <b>{oferta.descuento} %</b>
            en
            <b>{oferta.local}</b>
            usando tu
            <b
                >{producto.nombre}
                {producto.marca}</b
            >
            de <b>{producto.institucion}</b>.
        </p>

        {#if oferta.observacion.length > 0}
            <p class="observacion mt-2">{oferta.observacion}</p>
        {/if}

        {#if oferta.info.length > 0}
            <p class="info mt-2">
                <a href={oferta.info} target="_blank">{oferta.info}</a>
            </p>
        {/if}
    </div>
</Modal>

<style>
    .observacion {
        font-weight: bold;
        text-decoration: underline;
    }

    .info {
        word-break: break-word;
        font-weight: bold;
    }
</style>
