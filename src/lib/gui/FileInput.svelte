<script lang="ts">
    export let label: string;
    export let input: HTMLInputElement;
    export let accept: string = "";
</script>

<div class="container">
    <label class="label" for="">
        {label}
    </label>

    <input bind:this={input} class="" type="file" {accept} />
</div>

<style>
    .container {
        width: 100%;
    }

    input {
        width: 100%;
        border: 1px gray solid;
        border-radius: 0.5rem;
        padding: 0.5rem;
    }
</style>
