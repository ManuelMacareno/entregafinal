document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado');

    if (window.location.pathname.includes('productos.html')) {
        cargarProductos(true);
    }

    if (window.location.pathname.includes('index.html')) {
        cargarProductos(false);
    }

    if (window.location.pathname.includes('carrito.html')) {
        cargarCarrito();
    }
});

function cargarProductos(cargarTodos) {
    const productosContainer = document.getElementById('productos-container');

    if (!productosContainer) {
        console.error('El contenedor de productos no se encontró.');
        return;
    }

    const productosCache = localStorage.getItem('productos');
    if (productosCache) {
        console.log('Cargando productos desde caché');
        mostrarProductosDesdeCache(JSON.parse(productosCache), cargarTodos, productosContainer);
        return;
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.status}`);
            }
            return response.json();
        })
        .then(productos => {
            console.log('Datos de productos:', productos);
            if (!Array.isArray(productos)) {
                throw new Error('La respuesta de la API no es un array');
            }

            localStorage.setItem('productos', JSON.stringify(productos));

            mostrarProductosDesdeCache(productos, cargarTodos, productosContainer);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            productosContainer.innerHTML = `<p>Hubo un problema al cargar los productos. Inténtalo de nuevo más tarde.</p>`;
        });
}

function mostrarProductosDesdeCache(productos, cargarTodos, productosContainer) {
    const productosMostrar = cargarTodos ? productos : productos.slice(12, 15);

    let productosHTML = '';
    productosMostrar.forEach(producto => {
        const descripcionCorta = producto.description.length > 100 ? producto.description.substring(0, 100) + '...' : producto.description;

        productosHTML += `
            <article class="producto-item" data-id="${producto.id}">
                <h3>${producto.title}</h3>
                <figure>
                    <img src="${producto.image}" alt="Imagen de ${producto.title}">
                    <figcaption>${descripcionCorta}</figcaption>
                </figure>
                <p>Precio: $${producto.price}</p>
                <button aria-label="Añadir ${producto.title} al carrito" class="btn btn-primary">Añadir al carrito</button>
            </article>
        `;
    });

    productosContainer.innerHTML = productosHTML;

    const productoElements = document.querySelectorAll('.producto-item');
    const modal = document.getElementById('descripcion-modal');
    const cerrarModal = document.querySelector('.cerrar');
    const nombreProducto = document.getElementById('nombre-producto');
    const descripcionProducto = document.getElementById('descripcion-producto');

    productoElements.forEach(producto => {
        // Mostrar modal al hacer clic en el producto
        producto.addEventListener('click', function () {
            modal.style.display = 'flex';
            const productoId = producto.getAttribute('data-id');
            const productoCompleto = productos.find(p => p.id == productoId);
            nombreProducto.textContent = productoCompleto.title;
            descripcionProducto.textContent = productoCompleto.description;
        });

        // Añadir producto al carrito
        const agregarAlCarritoBtn = producto.querySelector('button');
        agregarAlCarritoBtn.addEventListener('click', function (event) {
            event.stopPropagation();  // Evita que se abra el modal cuando se hace clic en "Añadir al carrito"
            const productoId = producto.getAttribute('data-id');
            const productoCompleto = productos.find(p => p.id == productoId);

            // Obtener el carrito del localStorage o inicializar uno vacío
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            // Añadir el producto al carrito
            carrito.push(productoCompleto);

            // Guardar el carrito actualizado en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Alerta de producto agregado
            mostrarAlerta('Producto añadido al carrito!');
        });
    });

    // Cerrar el modal
    cerrarModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Cerrar modal si se hace clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function mostrarAlerta(mensaje) {
    const alerta = document.createElement('div');
    alerta.classList.add('alerta');
    alerta.textContent = mensaje;

    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 5000);  // El mensaje se eliminará después de 2 segundos
}

function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.getElementById('carrito-container');
    const totalContainer = document.getElementById('total');

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
        totalContainer.textContent = '0.00';
        return;
    }

    let carritoHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        carritoHTML += `
            <div class="producto-carrito">
                <div class="producto-info">
                    <img src="${producto.image}" alt="Imagen de ${producto.title}">
                    <div class="producto-detalles">
                        <h4>${producto.title}</h4>
                    </div>
                </div>
                <span class="producto-precio">$${producto.price.toFixed(2)}</span>
                <button class="eliminar-producto" data-index="${index}">X</button>
            </div>
        `;
        total += producto.price;
    });

    carritoContainer.innerHTML = carritoHTML;
    totalContainer.textContent = total.toFixed(2);

    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', function (event) {
            const index = event.target.getAttribute('data-index');
            eliminarProducto(index);
        });
    });
}



function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.splice(index, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    cargarCarrito();
}

