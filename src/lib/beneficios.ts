import { z } from "zod";

export const Proveedor = z.object({
    nombre: z.string(),
    productos: z.string().array(),
});

export type Proveedor = z.infer<typeof Proveedor>;

export const Producto = z.object({
    nombre: z.string(),
    proveedor: z.string(),
});

export type Producto = z.infer<typeof Producto>;

export const Oferta = z.object({
    tienda: z.string(),
    descuento: z.number(),
});

export type Oferta = z.infer<typeof Oferta>;

export const Beneficio = z.object({
    proveedor: z.string(),
    producto: z.string(),
    ofertas: Oferta.array(),
});

export type Beneficio = z.infer<typeof Beneficio>;

export const Descuento = z.object({
    ano: z.number().default(0),
    mes: z.string().default(""),
    ordenMes: z.number().default(0),
    ciudad: z.string().default(""),
    dia: z.string().default(""),
    proveedor: z.string().default(""),
    producto: z.string().default(""),
    tienda: z.string().default(""),
    descuento: z.number().default(0),
});

export type Descuento = z.infer<typeof Descuento>;

export const InfoProducto = Producto.extend({
    ofertas: Oferta.array(),
});

export type InfoProducto = z.infer<typeof InfoProducto>;

export const InfoDia = z.object({
    dia: z.string(),
    orden: z.number(),
    productos: InfoProducto.array(),
});

export type InfoDia = z.infer<typeof InfoDia>;

export function ordenarInfoDias(infoDias: InfoDia[]): void {
    infoDias.sort((a, b) => a.orden - b.orden);

    for (const dia of infoDias) {
        dia.productos.sort(
            (a, b) =>
                a.proveedor.localeCompare(b.proveedor) ||
                a.nombre.localeCompare(b.nombre),
        );

        for (const producto of dia.productos) {
            producto.ofertas.sort(
                (a, b) =>
                    b.descuento - a.descuento ||
                    a.tienda.localeCompare(b.tienda),
            );
        }
    }
}