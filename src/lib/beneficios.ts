import { z } from "zod";

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