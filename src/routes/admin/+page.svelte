<script lang="ts">
    import FileInput from "$lib/gui/FileInput.svelte";
    import Excel from "exceljs";

    let input: HTMLInputElement;

    async function cargar(): Promise<void> {
        console.log(input.files);
        if (input.files == null) {
            return;
        }

        const file = input.files[0];
        const stream = await file.arrayBuffer();
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(stream);
        console.log(workbook);
        const sheetName = "Descuentos";
        const sheet = workbook.worksheets.find((x) => x.name == sheetName);
        if (sheet == null) {
            alert(`No se encontró la hoja "${sheetName}"`);
            return;
        }

        console.log(sheet);
    }
</script>

<section>
    <h1>Administración</h1>

    <FileInput
        label="Cargar Excel"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        bind:input
        on:onChange={(e) => {
            console.log(e);
        }}
    />

    <button class="button is-link is-fullwidth mt-2" on:click={() => cargar()}>
        Cargar
    </button>
</section>
