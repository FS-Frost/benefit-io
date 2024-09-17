import { z } from "zod";

export const Institucion = z.object({
    nombre: z.string().default(""),
    productos: z.string().array().default([]),
});

export type Institucion = z.infer<typeof Institucion>;

export const Producto = z.object({
    nombre: z.string().default(""),
    institucion: z.string().default(""),
    marca: z.string().default(""),
    segmento: z.string().default(""),
    categoria: z.string().default(""),
});

export type Producto = z.infer<typeof Producto>;

export const Oferta = z.object({
    local: z.string().default(""),
    descuento: z.number().default(0),
});

export type Oferta = z.infer<typeof Oferta>;

export const Beneficio = z.object({
    institucion: z.string().default(""),
    producto: z.string().default(""),
    ofertas: Oferta.array().default([]),
});

export type Beneficio = z.infer<typeof Beneficio>;

export const Descuento = z.object({
    ano: z.number().default(0),
    mes: z.string().default(""),
    ordenMes: z.number().default(0),
    ciudad: z.string().default(""),
    dia: z.string().default(""),
    producto: Producto,
    local: z.string().default(""),
    descuento: z.number().default(0),
});

export type Descuento = z.infer<typeof Descuento>;

export const InfoProducto = Producto.extend({
    ofertas: Oferta.array().default([]),
});

export type InfoProducto = z.infer<typeof InfoProducto>;

export const InfoDia = z.object({
    dia: z.string().default(""),
    orden: z.number().default(0),
    productos: InfoProducto.array().default([]),
});

export type InfoDia = z.infer<typeof InfoDia>;

export function ordenarInfoDias(infoDias: InfoDia[]): void {
    infoDias.sort((a, b) => a.orden - b.orden);

    for (const dia of infoDias) {
        dia.productos.sort(
            (a, b) =>
                a.institucion.localeCompare(b.institucion) ||
                a.nombre.localeCompare(b.nombre),
        );

        for (const producto of dia.productos) {
            producto.ofertas.sort(
                (a, b) =>
                    b.descuento - a.descuento ||
                    a.local.localeCompare(b.local),
            );
        }
    }
}