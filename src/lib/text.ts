const appName: string = "Benefit.io";

export default {
    aceptar: "Aceptar",
    cancelar: "Cancelar",
    error: "Error",
    reintentar: "Reintentar",
    deshacerCambios: "Deshacer cambios",
    continuar: "Continuar",
    cargando: "Cargando",
    appName: appName,
    paginaBeneficios: "Mis beneficios",
    paginaProductos: "Mis productos",
    paginaExplorar: "Explorar beneficios",
    paginaAgregarProductos: "Añadir productos",
    iniciarSesion: `Iniciar sesión`,
    cerrarSesion: `Cerrar sesión`,
    sinProductos: "No tienes productos registrados.",
};

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function titleCase(str: string): string {
    const words = str.toLowerCase().split(' ');

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
    }

    return words.join(' ');
}

export function quitarTildes(s: string): string {
    type Reemplazo = {
        original: string;
        nuevo: string;
    };

    const reemplazos: Reemplazo[] = [
        {
            original: "á",
            nuevo: "a",
        },
        {
            original: "é",
            nuevo: "e",
        },
        {
            original: "í",
            nuevo: "i",
        },
        {
            original: "ó",
            nuevo: "o",
        },
        {
            original: "ú",
            nuevo: "u",
        },
    ];

    for (const reemplazo of reemplazos) {
        s = s.replaceAll(reemplazo.original, reemplazo.nuevo);
    }

    return s;
}