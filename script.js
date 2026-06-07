// 1. Tu inventario de productos (He puesto las extensiones en .jpeg)
const misProductos = [
    {
        id: "amigurumis",
        titulo: "Amigurumi Cozy",
        categoria: "Amigurumis",
        imagen: "imagenes/amigurumi1.jpeg",
        precio: "Próximamente"
    },
    {
        id: "ropaCrochet",
        titulo: "Top Primavera",
        categoria: "Prendas a crochet",
        imagen: "imagenes/prenda1.jpeg",
        precio: "Próximamente"
    },
    {
        id: "collares",
        titulo: "Collar Flores",
        categoria: "Collares",
        imagen: "imagenes/collar1.jpeg",
        precio: "Próximamente"
    },
    {
        id: "ceramica",
        titulo: "Cenicero personalizado",
        categoria: "Cerámica",
        imagen: "imagenes/ceramica1.jpeg",
        precio: "Próximamente"
    }
];

// 2. Función para crear el menú superior automáticamente
function generarMenu() {
    const nav = document.getElementById("menu-dinamico");
    if (!nav) return;
    
    nav.innerHTML = ""; // Limpiamos el menú vacío

    // Creamos un botón en el menú por cada categoría de la lista
    misProductos.forEach(producto => {
        const enlaceHTML = `<a href="#${producto.id}">${producto.categoria}</a>`;
        nav.innerHTML += enlaceHTML;
    });

    // Añadimos el enlace estático de "Sobre Mí" al final
    nav.innerHTML += `<a href="#sobre-mi">Sobre Mí</a>`;
}

// 3. Función para pintar las tarjetas de los productos en la cuadrícula
function cargarTienda() {
    const contenedor = document.getElementById("grid-dinamico");
    if (!contenedor) return;
    
    contenedor.innerHTML = ""; // Limpiamos el contenedor

    misProductos.forEach(producto => {
        const tarjetaHTML = `
            <div class="tarjeta-producto" id="${producto.id}">
                <div class="contenedor-foto">
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="producto-img">
                </div>
                <h4>${producto.titulo}</h4>
                <p class="categoria">${producto.categoria}</p>
                <span class="precio">${producto.precio}</span>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

// Lanzamos ambas funciones a la vez cuando el navegador termine de cargar la web
window.onload = function() {
    generarMenu();
    cargarTienda();
};