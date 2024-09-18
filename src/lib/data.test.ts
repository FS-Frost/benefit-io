import { expect, test } from "bun:test";
import { convertirTarjetas, type FilaTarjeta } from "./data";
import type { Producto } from "./beneficios";

test("obtener tarjetas desde JSON", () => {
    const filas: FilaTarjeta[] = [
        {
            "Institución Bancaria": "Banco Santander",
            "Tipo de Producto": "Tarjeta de Crédito",
            "Marca de la Tarjeta": "Visa, Amex",
            "Nombre Tarjeta": "Platinum LATAM Pass",
            "Categoría": ""
        },
        {
            "Institución Bancaria": "Banco BCI",
            "Tipo de Producto": "Tarjeta de Débito",
            "Marca de la Tarjeta": "Visa",
            "Nombre Tarjeta": "BCIPlus+ Classic",
            "Categoría": "BCIPlus+"
        },
    ];

    const tarjetasEsperadas: Producto[] = [
        {
            institucion: "Banco Santander",
            nombre: "Tarjeta de Crédito",
            marca: "Visa",
            segmento: "Platinum LATAM Pass",
            categoria: ""
        },
        {
            institucion: "Banco Santander",
            nombre: "Tarjeta de Crédito",
            marca: "Amex",
            segmento: "Platinum LATAM Pass",
            categoria: ""
        },
        {
            institucion: "Banco BCI",
            nombre: "Tarjeta de Débito",
            marca: "Visa",
            segmento: "BCIPlus+ Classic",
            categoria: "BCIPlus+"
        },
    ];

    const tarjetasObtenidas = convertirTarjetas(filas);

    expect(tarjetasObtenidas).toEqual(tarjetasEsperadas);
});
