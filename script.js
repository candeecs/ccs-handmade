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

// 5. Envío asíncrono del formulario para saltar el bloqueo de Formspree
function inicializarFormularioAsincrono() {
    const formulario = document.getElementById("mi-formulario");
    if (!formulario) return;

    formulario.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que la página se recargue o se vaya a la web gris
        
        const botonEnviar = formulario.querySelector(".btn-enviar");
        const textoOriginal = botonEnviar.innerText;
        botonEnviar.innerText = "Enviando...";
        botonEnviar.disabled = true;

        const datos = new FormData(formulario);

        try {
            const respuesta = await fetch(formulario.action, {
                method: formulario.method,
                body: datos,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (respuesta.ok) {
                // ¡MÁGIA! Si se envía bien, redirigimos nosotros por código a tu pantalla con el logo
                window.location.href = "gracias.html";
            } else {
                alert("Vaya, hubo un problema al enviar tu encargo. ¡Inténtalo de nuevo!");
                botonEnviar.innerText = textoOriginal;
                botonEnviar.disabled = false;
            }
        } catch (error) {
            alert("Error de conexión. Revisa tu internet e inténtalo de nuevo.");
            botonEnviar.innerText = textoOriginal;
            botonEnviar.disabled = false;
        }
    });
}

// Actualizamos el window.onload para incluir esta función también
const funcionOnloadAnterior = window.onload;
window.onload = function() {
    if (typeof funcionOnloadAnterior === 'function') {
        funcionOnloadAnterior();
    } else {
        // Por seguridad, si por lo que sea se pisa, aseguramos que cargue la tienda
        if (typeof generarMenu === 'function') generarMenu();
        if (typeof cargarTienda === 'function') cargarTienda();
        if (typeof inicializarMenuMovil === 'function') inicializarMenuMovil();
    }
    inicializarFormularioAsincrono();
};