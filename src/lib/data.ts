import type { Descuento, Producto } from "./beneficios";
import jsonDescuentos from "./descuentos.json";
import jsonTarjetas from "./tarjetas.json";

export function obtenerDescuentos(): Descuento[] {
    const descuentos: Descuento[] = [];

    const meses: string[] = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ];

    try {
        for (const fila of jsonDescuentos) {
            const descuento = Number(
                fila["Descuento"]
                    .replaceAll("$", "")
                    .replaceAll(".", "")
                    .replaceAll("%", "")
                    .replaceAll(" ", "")
            );

            const ordenMes = meses.indexOf(fila["Mes"]) + 1;
            const instituciones = fila["Institución Financiera"].replaceAll(", ", ",").split(",");
            const productos = fila["Producto"].replaceAll(", ", ",").split(",");
            const dias = fila["Día"].replaceAll(", ", ",").split(",");
            const marcasTarjeta = fila["Marca de Tarjeta"].replaceAll(", ", ",").split(",");
            const segmentosTarjeta = fila["Nombre Tarjeta"].replaceAll(", ", ",").split(",");
            const categoriasTarjeta = fila["Categoría"].replaceAll(", ", ",").split(",");

            for (const institucion of instituciones) {
                for (const producto of productos) {
                    for (const marcaTarjeta of marcasTarjeta) {
                        for (const segmento of segmentosTarjeta) {
                            for (const categoria of categoriasTarjeta) {
                                for (const dia of dias) {
                                    descuentos.push({
                                        ano: Number(fila["Año"]),
                                        mes: fila["Mes"],
                                        ordenMes: ordenMes,
                                        dia: dia,
                                        ciudad: fila["Ciudad"],
                                        producto: {
                                            institucion: institucion,
                                            nombre: producto,
                                            marca: marcaTarjeta,
                                            segmento: segmento,
                                            categoria: categoria,
                                        },
                                        local: fila["Local"],
                                        descuento: descuento,
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error("error al obtener descuentos", error);
    }

    return descuentos;
}

export type FilaTarjetas = typeof jsonTarjetas[number];

export function obtenerTarjetas(filas: FilaTarjetas[]): Producto[] {
    const productos: Producto[] = [];

    for (const fila of filas) {
        const marcas = fila["Marca de la Tarjeta"].replaceAll(", ", ",").split(",");

        for (const marca of marcas) {
            productos.push({
                institucion: fila["Institución Bancaria"],
                nombre: fila["Tipo de Producto"],
                marca: marca,
                categoria: fila["Categoría"],
                segmento: fila["Nombre Tarjeta"],
            });
        }
    }

    return productos;
}
