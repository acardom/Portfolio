document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.querySelector('button[type="submit"]'); // Selecciona el botón de envío
    btn.textContent = 'Enviando...';

    const serviceID = 'default_service'; // Tu servicio en EmailJS
    const templateID = 'template_47h17oa'; // Tu plantilla en EmailJS

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.textContent = 'Enviar Correo';
            alert('¡Correo enviado con éxito!');
            this.reset(); // Limpia el formulario después de enviar
        })
        .catch((err) => {
            btn.textContent = 'Enviar Correo';
            alert('Error: ' + JSON.stringify(err));
        });
});
