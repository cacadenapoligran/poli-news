# 📰 PoliNews - Plataforma Web de Noticias

PoliNews es una aplicación web tipo *Single Page Application* (SPA) desarrollada como prototipo funcional para el módulo de Front End. La plataforma permite a los usuarios explorar contenido curado sobre tecnología, educación y turismo, interactuar con las publicaciones y gestionar su propio catálogo.

## ✨ Características Principales

*   **Renderizado Dinámico:** Generación de tarjetas de noticias a partir de una estructura de datos inicial en formato JSON.
*   **Navegación Fluida (SPA):** Transiciones entre vistas (Inicio, Catálogo, Detalle, Favoritos, Gestión y Contacto) ejecutadas directamente mediante manipulación del DOM, sin recargar el navegador[cite: 3].
*   **Persistencia de Datos:** Implementación de `localStorage` para guardar de forma persistente la lista de noticias favoritas de cada usuario[cite: 3].
*   **Mini CRUD Administrativo:** Panel de gestión que permite registrar nuevas noticias dinámicamente o eliminar entradas existentes del catálogo, sincronizando los cambios en la memoria del navegador[cite: 3].
*   **Validaciones e Interactividad:** Formulario de contacto protegido con validaciones nativas de HTML5 y un sistema de notificaciones dinámicas tipo "Toast" para informar al usuario sobre el éxito de sus acciones[cite: 3, 4].
*   **Diseño UI/UX Premium:** Interfaz responsiva construida con Tailwind CSS, la cual incorpora efectos modernos como *Glassmorphism* en la barra de navegación y animaciones de entrada (*Fade In Up*)[cite: 4, 5].

## 🛠️ Tecnologías Utilizadas

*   **HTML5:** Para la estructuración semántica del contenido.
*   **CSS3 & Tailwind CSS:** Para el sistema de diseño, uso de utilidades de clases, variables CSS personalizadas y scrollbars estilizadas[cite: 4, 5].
*   **JavaScript (Vanilla):** Para toda la lógica de negocio, enrutamiento interno (`app.navigate`), y control de estado (`app.news`, `app.favorites`)[cite: 3].

## 🚀 Instalación y Uso

Este proyecto está desarrollado enteramente con tecnologías del lado del cliente y no requiere la instalación de dependencias pesadas (como `node_modules`) ni un servidor local para funcionar de manera básica:

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone [https://github.com/cacadenapoligran/poli-news.git](https://github.com/cacadenapoligran/poli-new.git)
