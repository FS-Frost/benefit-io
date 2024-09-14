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
    ciudad: z.string(),
    dia: z.string(),
    proveedor: z.string(),
    producto: z.string(),
    tienda: z.string(),
    descuento: z.number(),
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
