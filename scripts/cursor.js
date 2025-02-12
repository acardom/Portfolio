
    // Selecciona el circulito
    const circle = document.querySelector('.cursor-circle');

    // Mueve el circulito según la posición del cursor
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX; // Posición X del cursor
        const y = e.clientY; // Posición Y del cursor
        circle.style.left = `${x}px`; // Mueve el circulito en el eje X
        circle.style.top = `${y}px`; // Mueve el circulito en el eje Y
    });
