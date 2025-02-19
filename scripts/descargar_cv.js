document.getElementById('download-cv').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = 'archivos/cv_AlbertoCárdeno.pdf';
    link.download = 'CV-Alberto_Cárdeno.pdf';
    link.target = '_blank'; // Abre el enlace en una nueva pestaña
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});