<script lang="ts">
    import type { Descuento, Producto } from "$lib/beneficios";
    import {
        convertirDescuentos,
        convertirTarjetas,
        type FilaDescuento,
        type FilaTarjeta,
    } from "$lib/data";
    import FileInput from "$lib/gui/FileInput.svelte";
    import Excel from "exceljs";

    let input: HTMLInputElement;
    let archivoCargado: boolean = false;
    let errores: string[] = [];
    let descuentos: Descuento[] = [];
    let tarjetas: Producto[] = [];
    let erroresVisibles: boolean = false;

    async function validarPlanilla(): Promise<void> {
        // const pb = newDatabaseConnection();
        // const record = await pb
        //     .collection("producto")
        //     .getFirstListItem(`nombre="T. Crédito"`, {
        //         fields: "id, nombre, expand.institucion.id, expand.institucion.nombre",
        //         expand: "institucion",
        //     });
        // console.log(record);

        if (input.files == null || input.files.length === 0) {
            return;
        }

        const file = input.files[0];
        const stream = await file.arrayBuffer();
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(stream);

        workbook.eachSheet((x) => console.log(`Hoja "${x.name}"`));

        descuentos = [];
        tarjetas = [];
        errores = [];
        erroresVisibles = false;

        const [descuentosGenerados, erroresDescuentos] = generarDescuentos(
            workbook,
            "Descuentos",
        );

        errores.push(...erroresDescuentos);
        descuentos.push(...descuentosGenerados);
        console.log("descuentos", descuentosGenerados);

        const [otrosDescuentosGenerados, erroresotrosDescuentos] =
            generarDescuentos(workbook, "Otros Descuentos");

        errores.push(...erroresotrosDescuentos);
        descuentos.push(...otrosDescuentosGenerados);
        console.log("otrosDescuentos", descuentos);

        const [tarjetasGeneradas, erroresTarjetas] = generarTarjetas(workbook);
        tarjetas.push(...tarjetasGeneradas);
        errores.push(...erroresTarjetas);
        console.log("tarjetasGeneradas", tarjetasGeneradas);
    }

    function generarDescuentos(
        workbook: Excel.Workbook,
        sheetName: string,
    ): [Descuento[], string[]] {
        let descuentos: Descuento[] = [];
        const errores: string[] = [];

        const sheet = workbook.worksheets.find((x) => x.name == sheetName);
        if (sheet == null) {
            errores.push(`No se encontró la hoja "${sheetName}"`);
            return [descuentos, errores];
        }

        const rows = sheet.getRows(1, sheet.actualRowCount) ?? [];
        const filasDescuento: FilaDescuento[] = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const rowNumber = i + 1;
            let column = 0;

            column++;
            const ano = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.Number ||
                ano.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, año inválido: "${ano}"`,
                );
            }

            column++;
            const mes = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.String ||
                mes.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, mes inválido: "${mes}"`,
                );
            }

            column++;
            const ciudad = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.String ||
                ciudad.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, ciudad inválida: "${ciudad}"`,
                );
            }

            column++;
            const dia = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.String ||
                dia.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, dia inválido: "${dia}"`,
                );
            }

            column++;
            const institucion = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.String ||
                institucion.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, institucion inválida: "${institucion}"`,
                );
            }

            column++;
            const producto = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.String ||
                producto.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, producto inválido: "${producto}"`,
                );
            }

            column++;
            const marca = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.String ||
                marca.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, marca de tarjeta inválida: "${marca}"`,
                );
            }

            column++;
            const nombreTarjeta = row.getCell(column).toString();

            column++;
            const categoria = row.getCell(column).toString();

            column++;
            const local = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.String ||
                local.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, local inválido: "${local}"`,
                );
            }

            column++;
            const descuento = row.getCell(column).toString();
            if (
                row.getCell(column).type !== Excel.ValueType.Number ||
                descuento.length === 0
            ) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, descuento inválido: "${descuento}"`,
                );
            }

            column++;
            const tope = row.getCell(column).toString();

            column++;
            const observacion = row.getCell(column).toString();

            column++;
            const info = row.getCell(column).toString();

            filasDescuento.push({
                Año: ano,
                Mes: mes,
                Ciudad: ciudad,
                Día: dia,
                "Institución Financiera": institucion,
                Producto: producto,
                "Marca de Tarjeta": marca,
                "Nombre Tarjeta": nombreTarjeta,
                Categoría: categoria,
                Local: local,
                Descuento: descuento,
                "Tope Descuento": tope,
                Observación: observacion,
                Info: info,
            });
        }

        descuentos = convertirDescuentos(filasDescuento);
        return [descuentos, errores];
    }

    function generarTarjetas(workbook: Excel.Workbook): [Producto[], string[]] {
        let tarjetas: Producto[] = [];
        const errores: string[] = [];

        const sheetName = "Tarjetas";
        const sheet = workbook.worksheets.find((x) => x.name == sheetName);
        if (sheet == null) {
            errores.push(`No se encontró la hoja "${sheetName}"`);
            return [tarjetas, errores];
        }

        const rows = sheet.getRows(1, sheet.actualRowCount) ?? [];
        const filasTarjetas: FilaTarjeta[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            let column = 0;

            column++;
            const institucion = row.getCell(column).toString();
            if (institucion.length === 0) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, institución inválida: "${institucion}"`,
                );
            }

            column++;
            const tipoProducto = row.getCell(column).toString();
            if (tipoProducto.length === 0) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, tipo de producto inválido: "${tipoProducto}"`,
                );
            }

            column++;
            const marca = row.getCell(column).toString();
            if (marca.length === 0) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, marca de tarjeta inválida: "${marca}"`,
                );
            }

            column++;
            const nombreTarjeta = row.getCell(column).toString();
            if (nombreTarjeta.length === 0) {
                errores.push(
                    `Hoja "${sheetName}", celda ${row.getCell(column).address}, nombre de tarjeta inválida: "${nombreTarjeta}"`,
                );
            }

            column++;
            const categoria = row.getCell(column).toString();

            filasTarjetas.push({
                "Institución Bancaria": institucion,
                "Tipo de Producto": tipoProducto,
                "Marca de la Tarjeta": marca,
                "Nombre Tarjeta": nombreTarjeta,
                Categoría: categoria,
            });
        }

        tarjetas = convertirTarjetas(filasTarjetas);
        return [tarjetas, errores];
    }
</script>

<section>
    <h1>Administración</h1>

    <FileInput
        label="Cargar planilla"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        bind:input
        on:onChange={() => (archivoCargado = true)}
    />

    <button
        class="button is-link is-fullwidth mt-2"
        disabled={!archivoCargado}
        on:click={() => validarPlanilla()}
    >
        Validar planilla
    </button>

    {#if errores.length > 0}
        <button
            class="button is-danger is-fullwidth mt-2"
            on:click={() => (erroresVisibles = !erroresVisibles)}
        >
            {#if erroresVisibles}
                <i class="fa-solid fa-minus"></i>
            {:else}
                <i class="fa-solid fa-plus"></i>
            {/if}
            &nbsp; Errores: {errores.length}
        </button>

        {#if erroresVisibles}
            <div class="errores">
                {#each errores as error, i}
                    <p class="has-text-danger mt-1">{i + 1}. {error}</p>
                {/each}
            </div>
        {/if}
    {/if}

    <div class="info">
        <p>Descuentos: {descuentos.length}</p>

        <p>Tarjetas: {tarjetas.length}</p>
    </div>
</section>

<style>
    .info {
        margin-top: 1rem;
    }
</style>
