# Ecommerce - Proyecto Web

Este es un proyecto de ecommerce interactivo desarrollado con HTML, CSS y JavaScript. El sitio web carga productos dinámicamente desde una API externa y permite a los usuarios agregar productos al carrito, todo almacenado en el almacenamiento local (localStorage).

## Estructura del Proyecto

El proyecto incluye las siguientes páginas:

1. **Página de inicio**: Página principal que ofrece un resumen de los productos y promociones disponibles.
2. **Página de productos**: Muestra los productos disponibles, cargados dinámicamente desde una API. Los usuarios pueden agregar productos al carrito.
3. **Página de carrito**: Muestra los productos que los usuarios han agregado al carrito, con la opción de eliminar productos y ver el total de la compra.
4. **Página de reseñas**: Los usuarios pueden leer opiniones y valoraciones sobre los productos.
5. **Página de contacto**: Permite a los usuarios ponerse en contacto con el ecommerce para preguntas, soporte o comentarios.

## Características

- **Carga dinámica de productos**: Los productos se cargan desde una API externa y se muestran en la página de productos. Los datos se almacenan en el almacenamiento local para mejorar la experiencia de usuario.
- **Carrito de compras**: Los usuarios pueden agregar productos al carrito, ver el total y eliminar productos. Los datos del carrito se guardan en el almacenamiento local para persistencia entre sesiones.
- **Diseño responsive**: El sitio está optimizado para verse bien en dispositivos móviles, tabletas y escritorios.
- **Navegación sencilla**: Menú de navegación claro para facilitar el acceso entre las diferentes páginas.
- **Filtrado de productos**: Los productos pueden ser visualizados de manera filtrada (por ejemplo, mostrando solo una selección de productos en la página de inicio).
- **Formulario de contacto**: Permite a los usuarios enviar mensajes al ecommerce para consultas o soporte.
- **Sección de reseñas**: Los usuarios pueden leer y dejar opiniones sobre los productos disponibles en la tienda.

## Tecnologías Utilizadas

- **HTML**: Estructura básica de las páginas.
- **CSS**: Estilos personalizados para un diseño atractivo y profesional.
- **JavaScript**: Carga dinámica de productos desde una API externa, manejo del carrito de compras y almacenamiento local.
- **API externa**: Los productos se cargan utilizando la API de [Fake Store API](https://fakestoreapi.com/).

## Funcionalidades Implementadas

- **Carga de productos desde una API externa**: Utilizando la API de `fakestoreapi.com`, los productos se cargan dinámicamente cuando el usuario visita la página de productos.
- **Carrito de compras**: Los usuarios pueden agregar productos al carrito, y estos se almacenan en el `localStorage` para mantener la persistencia entre sesiones.
- **Modales interactivos**: Al hacer clic en un producto, se abre un modal con la descripción completa del producto.
- **Notificaciones**: Al agregar un producto al carrito, aparece una alerta temporal para informar al usuario.

Desarrollado por Manuel Macareno.

