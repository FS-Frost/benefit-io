<script lang="ts">
    import { newDatabaseConnection } from "$lib/database";
    import FileInput from "$lib/gui/FileInput.svelte";
    import Excel from "exceljs";

    let input: HTMLInputElement;

    async function cargar(): Promise<void> {
        const pb = newDatabaseConnection();
        const record = await pb.collection("producto").getFirstListItem(`nombre="T. Crédito"`, {
            fields: "id, nombre, expand.institucion.id, expand.institucion.nombre",
            expand: "institucion",
        });
        console.log(record);

        console.log(input.files);
        if (input.files == null || input.files.length === 0) {
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
        const rows = sheet.getRows(1, sheet.actualRowCount) ?? [];
        console.log("rows", rows.length);

        // for (const row of rows) {
        //     console.log("ROW", row.values);
        // }
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

    <button class="button is-link is-fullwidth mt-2" on:click={() => cargar()}> Cargar </button>
</section>
