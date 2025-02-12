function checkAcceptCookies() {
    if (localStorage.acceptCookies == 'true') { 
        $('#div-cookies').hide();
    } else {
        $('#div-cookies').show();
    }
}

function acceptCookies() {
    localStorage.acceptCookies = 'true';
    $('#div-cookies').hide();
}
function DenyCookies() {
    localStorage.acceptCookies = 'false';
    $('#div-cookies').show();
}
$(document).ready(function () {
    checkAcceptCookies();
});

window.onload = function() {
var myInput = document.getElementById('contraseña');
var myInput2 = document.getElementById('gmail');
myInput.onpaste = function(e) {
    e.preventDefault();
    alert("Accion de copiar y pegar deshabilitada");
}
myInput2.onpaste = function(e) {
    e.preventDefault();
    alert("Accion de copiar y pegar deshabilitada");
}
myInput.oncopy = function(e) {
    e.preventDefault();
    alert("Accion de copiar y pegar deshabilitada");
}
myInput2.oncopy = function(e) {
    e.preventDefault();
    alert("Accion de copiar y pegar deshabilitada");
}}


function cerrar_sesion(){
    localStorage.acceptCookies = 'false';
    window.location="login.html";
}

function enviar_acceso (){
    var contraseña = document.getElementById("contraseña").value;
    var email = document.getElementById("gmail").value;
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(email);
    if (esValido == true){
        document.getElementById("email_error").innerHTML = "";

        if (localStorage[email] == undefined){
            document.getElementById("email_error").innerHTML = "· Este correo no se encuentra registrado";
        }else{
            if (JSON.parse(localStorage[email])["password"] == contraseña){
                localStorage["login"] = JSON.stringify({email: email});
                window.location="acceso.html";
            }else{
                document.getElementById("contraseña_error").innerHTML = "· Contraseña incorrecta";
            }
        }

    }else{
        document.getElementById("email_error").innerHTML = "· El correo electronico tiene un formato incorrecto";
    }
}


