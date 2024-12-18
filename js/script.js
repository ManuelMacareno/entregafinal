document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado');

    if (window.location.pathname.includes('productos.html')) {
        cargarProductos(); // Llamamos a la función para cargar los productos
    }

    if (window.location.pathname.includes('index.html')) {
        manejarFormulario(); // Llamamos a la función para manejar el formulario
    }
});

function manejarFormulario() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    function checkFormCompletion() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (name !== '' && email !== '' && message !== '') {
            console.log('Todos los campos están completos');
        }
    }

    nameInput.addEventListener('input', checkFormCompletion);
    emailInput.addEventListener('input', checkFormCompletion);
    messageInput.addEventListener('input', checkFormCompletion);
}

function cargarProductos() {
    const productosContainer = document.getElementById('productos-container');

    if (!productosContainer) {
        console.error('El contenedor de productos no se encontró.');
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

            let productosHTML = '';
            productos.forEach(producto => {
                const descripcionCorta = producto.description.length > 100 ? producto.description.substring(0, 100) + '...' : producto.description;

                productosHTML += `
                    <article class="producto-item" data-id="${producto.id}">
                        <h3>${producto.title}</h3>
                        <figure>
                            <img src="${producto.image}" alt="Imagen de ${producto.title}">
                            <figcaption>${descripcionCorta}</figcaption>
                        </figure>
                        <p>Precio: $${producto.price}</p>
                        <button aria-label="Añadir ${producto.title} al carrito">Añadir al carrito</button>
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
                producto.addEventListener('click', function () {
                    modal.style.display = 'flex'; // Mostrar el modal
                    const productoId = producto.getAttribute('data-id');
                    const productoCompleto = productos.find(p => p.id == productoId);
                    nombreProducto.textContent = productoCompleto.title;
                    descripcionProducto.textContent = productoCompleto.description;
                });
            });

            cerrarModal.addEventListener('click', function () {
                modal.style.display = 'none';
            });

            window.addEventListener('click', function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            productosContainer.innerHTML = `<p>Hubo un problema al cargar los productos. Inténtalo de nuevo más tarde.</p>`;
        });
}
