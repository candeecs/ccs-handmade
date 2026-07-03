// ==========================================
// 1. INVENTARIO DE PRODUCTOS
// ==========================================
const misProductos = [
    {
        id: "amigurumis",
        titulo: "Amigurumi Cozy",
        categoria: "Amigurumis (proximamente)",
        imagen: "imagenes/amigurumi1.jpeg",
        precio: "Próximamente"
    },
    {
        id: "ropaCrochet",
        titulo: "Top Primavera",
        categoria: "Crochet",
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

// ==========================================
// 2. GENERAR MENÚ DINÁMICO
// ==========================================
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

// ==========================================
// 3. CARGAR TIENDA (TARJETAS)
// ==========================================
function cargarTienda() {
    const contenedor = document.getElementById("grid-dinamico");
    if (!contenedor) return;
    
    contenedor.innerHTML = ""; 

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

// ==========================================
// 4. LÓGICA MENÚ HAMBURGUESA (MÓVILES)
// ==========================================
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

// ==========================================
// 5. ENVÍO ASÍNCRONO DEL FORMULARIO
// ==========================================
function inicializarFormularioAsincrono() {
    const formulario = document.getElementById("mi-formulario");
    if (!formulario) return;

    formulario.addEventListener("submit", async function(event) {
        event.preventDefault(); // Detiene la pantalla gris de Formspree
        
        const botonEnviar = formulario.querySelector(".btn-enviar");
        if (!botonEnviar) return;

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
                // Redirección manual forzada por código
                window.location.href = "gracias.html";
            } else {
                alert("Hubo un problema al enviar el formulario.");
                botonEnviar.innerText = textoOriginal;
                botonEnviar.disabled = false;
            }
        } catch (error) {
            alert("Error de conexión al enviar.");
            botonEnviar.innerText = textoOriginal;
            botonEnviar.disabled = false;
        }
    });
}

// ==========================================
// EL ÚNICO ARRANQUE DE LA WEB
// ==========================================
window.onload = function() {
    generarMenu();
    cargarTienda();
    inicializarMenuMovil();
    inicializarFormularioAsincrono();
};

// ==========================================
// AUTOMATIZACIÓN DEL CARRUSEL (CADA 15 SEGUNDOS)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const carruseles = document.querySelectorAll('.carrusel-vintage');

    carruseles.forEach(carrusel => {
        setInterval(() => {
            const anchoFoto = carrusel.clientWidth;
            // Si llegamos al final del carrusel, vuelve al principio; si no, avanza una foto
            if (carrusel.scrollLeft + anchoFoto >= carrusel.scrollWidth) {
                carrusel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carrusel.scrollTo({ left: carrusel.scrollLeft + anchoFoto, behavior: 'smooth' });
            }
        }, 8000); // 15000 milisegundos = 15 segundos
    });
});