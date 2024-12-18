// Campos completos
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado');

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
});

// Lista de productos
const productos = [
    { nombre: 'Producto 1', precio: 100, categoria: 'Electrónica' },
    { nombre: 'Producto 2', precio: 200, categoria: 'Hogar' },
    { nombre: 'Producto 3', precio: 150, categoria: 'Electrónica' },
    { nombre: 'Producto 4', precio: 50, categoria: 'Alimentos' },
    { nombre: 'Producto 5', precio: 75, categoria: 'Hogar' }
];

console.log("Lista de productos disponibles:");
productos.forEach(function (producto) {
    console.log(`Nombre: ${producto.nombre}, Precio: $${producto.precio}, Categoría: ${producto.categoria}`);
});

// Modal
document.addEventListener('DOMContentLoaded', function () {
    const productos = document.querySelectorAll('.producto-item');

    const modal = document.getElementById('descripcion-modal');
    const cerrarModal = document.querySelector('.cerrar');
    const nombreProducto = document.getElementById('nombre-producto');
    const descripcionProducto = document.getElementById('descripcion-producto');

    productos.forEach(producto => {
        producto.addEventListener('click', function () {
            modal.style.display = 'block';

            const productoNombre = producto.querySelector('h3').textContent;
            const productoDescripcion = producto.querySelector('figcaption').textContent;

            nombreProducto.textContent = productoNombre;
            descripcionProducto.textContent = `${productoDescripcion}`;
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
});



