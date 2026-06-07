// 1. Tu inventario de productos con "Cenicero personalizado"
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
    
    nav.innerHTML = ""; 

    misProductos.forEach(producto => {
        const enlaceHTML = `<a href="#${producto.id}">${producto.categoria}</a>`;
        nav.innerHTML += enlaceHTML;
    });

    nav.innerHTML += `<a href="#contacto">Contacto</a>`;
}

// 3. Función para pintar las tarjetas de los productos
function cargarTienda() {
    const contenedor = document.getElementById("grid-dynamico");
    const contenedorAlternativo = document.getElementById("grid-dinamico");
    const realContainer = contenedor || contenedorAlternativo;
    if (!realContainer) return;
    
    realContainer.innerHTML = ""; 

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
        realContainer.innerHTML += tarjetaHTML;
    });
}

// 4. Lógica para el menú hamburguesa en móviles
function inicializarMenuMovil() {
    const boton = document.getElementById("boton-menu");
    const nav = document.getElementById("menu-dinamico");

    if (boton && nav) {
        boton.addEventListener("click", () => {
            boton.classList.toggle("active");
            nav.classList.toggle("active");
        });

        nav.addEventListener("click", (e) => {
            if (e.target.tagName === 'A') {
                boton.classList.remove("active");
                nav.classList.remove("active");
            }
        });
    }
}

// ÚNICO PUNTO DE ENTRADA: Lanzamos todo junto al cargar la página
window.onload = function() {
    generarMenu();
    cargarTienda();
    inicializarMenuMovil();
};