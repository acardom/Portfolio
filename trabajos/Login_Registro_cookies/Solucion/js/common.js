const field = (fieldId) => document.getElementById(fieldId)

const nameRegex = /^[a-zà-ü][a-zà-ü ]+/
const passwordRegex = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const regex = {
    name: new RegExp(nameRegex, 'i'),
    lastName: new RegExp(nameRegex, 'i'),
    password: new RegExp(passwordRegex),
    email: new RegExp(emailRegex)
}

const errorMsg = {
    nameError: 'Nombre inválido',
    lastNameError: 'Apellido inválido',
    emailError: 'Email inválido',
    passwordError: 'La contraseña debe tener una longitud de 8 caracteres y contener una mayúscula, una minúscula y un número',
    passwordConfirmErrorMatch: 'La contraseña no coincide',
    passwordConfirmError: 'Introduce una contraseña',
    langError: 'Selecciona idioma',
    genderError: 'Selecciona género',
    required: 'Campo requerido'
}

const gender = {
    f: 'femenino',
    m: 'masculino',
    nb: 'no binario'
}

const lang = {
    es: 'castellano',
    en: 'inglés',
    fr: 'francés'
}

const auth = {
    false: 'no',
    true: 'sí'
}
