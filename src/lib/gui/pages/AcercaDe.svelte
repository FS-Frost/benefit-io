<script lang="ts">
    import text from "$lib/text";

    const title: string = text.acercaDe;
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="text-column">
    <h1>{title}</h1>
</div>
