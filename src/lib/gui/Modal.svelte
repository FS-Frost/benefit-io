<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import text from "$lib/text";

    export let title: string;
    export let acceptButtonClass: string = "is-success";
    export let cancelButtonText: string = text.cancelar;
    export let acceptButtonText: string = text.aceptar;
    export let acceptButtonDisabled: boolean = false;
    export let cancelButtonDisabled: boolean = false;
    export let acceptButtonHidden: boolean = false;
    export let cancelButtonHidden: boolean = false;
    export let closeButtonHidden: boolean = false;

    const dispatch = createEventDispatcher();
    const CLASS_IS_ACTIVE = "is-active";

    export const EVENT_OPEN = "open";
    export const EVENT_CLOSE = "close";
    export const EVENT_ACCEPT = "accept";

    let modal: Element;

    export function open(): void {
        if (modal == null) {
            return;
        }

        modal.classList.add(CLASS_IS_ACTIVE);
        dispatch(EVENT_OPEN);
    }

    export function close(): void {
        if (modal == null) {
            return;
        }

        modal.classList.remove(CLASS_IS_ACTIVE);
        dispatch(EVENT_CLOSE);
    }

    function accept(): void {
        dispatch(EVENT_ACCEPT);
    }
</script>

<div class="modal" bind:this={modal}>
    <div class="modal-background" />
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{title}</p>

            {#if !closeButtonHidden}
                <button
                    class="delete is-large"
                    aria-label="close"
                    on:click={() => close()}
                />
            {/if}
        </header>

        <section class="modal-card-body">
            <slot />
        </section>

        <footer class="modal-card-foot">
            {#if !cancelButtonHidden}
                <button
                    class="button"
                    disabled={cancelButtonDisabled}
                    on:click={() => close()}>{cancelButtonText}</button
                >
            {/if}

            {#if accept != null && !acceptButtonHidden}
                <button
                    class="button {acceptButtonClass}"
                    disabled={acceptButtonDisabled}
                    on:click={() => accept()}
                >
                    {acceptButtonText}
                </button>
            {/if}

            <slot name="buttons" />
        </footer>
    </div>
</div>

<style>
    .modal {
        z-index: 100;
    }

    .modal-card-title {
        font-size: x-large;
    }

    section {
        padding-top: 0px;
    }

    .modal-card {
        max-width: 90%;
        max-height: 90%;
    }

    button {
        margin: 0;
        width: 100%;
        font-weight: bold;
        color: white;
    }

    .modal-card-foot {
        display: flex;
        flex-direction: column;
    }
</style>
