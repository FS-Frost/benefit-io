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
    medio: z.string(),
    ofertas: Oferta.array(),
});

export type Beneficio = z.infer<typeof Beneficio>;