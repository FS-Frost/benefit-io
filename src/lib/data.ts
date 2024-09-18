import type { Descuento, Producto } from "./beneficios";
import jsonDescuentos from "./jsonDescuentos";
import jsonTarjetas from "./jsonTarjetas";

export type FilaDescuento = typeof jsonDescuentos[number];

export function obtenerDescuentos(): Descuento[] {
    return convertirDescuentos(jsonDescuentos);
}

export function convertirDescuentos(filas: FilaDescuento[]): Descuento[] {
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
        for (const fila of filas) {
            const descuento = Number(
                fila["Descuento"]
                    .replaceAll("$", "")
                    .replaceAll(",", "")
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

export type FilaTarjeta = typeof jsonTarjetas[number];

export function obtenerTarjetas(): Producto[] {
    return convertirTarjetas(jsonTarjetas);
}

export function convertirTarjetas(filas: FilaTarjeta[]): Producto[] {
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
