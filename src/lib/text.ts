const appName: string = "Benefit.io";

export default {
    appName: appName,
    paginaBeneficios: "Mis beneficios",
    paginaProductos: "Mis productos",
    paginaExplorar: "Explorar beneficios",
    paginaAgregarProductos: "Añadir productos",
    acercaDe: `Acerca de ${appName}`,
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