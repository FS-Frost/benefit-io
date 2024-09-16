import type { Descuento } from "./beneficios";
import jsonDescuentos from "./descuentos.json";
// import jsonTarjetas from "./tarjetas.json";

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
            const productos = fila["Producto"].replaceAll(", ", ",").split(",");
            const dias = fila["Día"].replaceAll(", ", ",").split(",");

            for (const producto of productos) {
                for (const dia of dias) {
                    descuentos.push({
                        ano: Number(fila["Año"]),
                        ciudad: fila["Ciudad"],
                        descuento: descuento,
                        dia: dia,
                        mes: fila["Mes"],
                        ordenMes: ordenMes,
                        producto: producto,
                        proveedor: fila["Institución Financiera"],
                        tienda: fila["Local"],
                    });
                }
            }
        }
    } catch (error) {
        console.error("error al obtener descuentos", error);
    }

    return descuentos;
}
