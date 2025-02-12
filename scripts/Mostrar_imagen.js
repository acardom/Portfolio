// Selecciona todas las imágenes de los proyectos
const projectImages = document.querySelectorAll('.project-img img');

// Configuración del Intersection Observer
const observerOptions = {
    root: null, // Observa respecto al viewport
    rootMargin: '0px', // Sin margen adicional
    threshold: 1, // Activa la animación cuando el 100% del elemento es visible
};

// Callback que se ejecuta cuando un elemento es observado
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Añade la clase 'visible' cuando el elemento está completamente visible
            entry.target.classList.add('visible');
        } else {
            // Quita la clase 'visible' cuando el elemento está completamente fuera de la pantalla
            const rect = entry.target.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
                entry.target.classList.remove('visible');
            }
        }
    });
};

// Crea el Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observa cada imagen de los proyectos
projectImages.forEach(image => {
    observer.observe(image);
});

// Función para forzar la detección de visibilidad
const checkVisibility = () => {
    projectImages.forEach(image => {
        const rect = image.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            // Si la imagen está completamente visible, añade la clase 'visible'
            image.classList.add('visible');
        } else if (rect.bottom < 0 || rect.top > window.innerHeight) {
            // Si la imagen está completamente fuera de la pantalla, quita la clase 'visible'
            image.classList.remove('visible');
        }
    });
};

// Forzar la detección al cargar la página y al hacer scroll
window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);