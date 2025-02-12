// Redirige a la página de detalles de usuario si hay un usuario loggeado
window.addEventListener('load', () => {
    const email = getCookie('user')

    if (!regex.email.test(decodeURIComponent(email))) {
        return
    }

    if (!Object.keys(localStorage).includes(email)) {
        return
    }

    window.location.href = 'user_details.html'
})

const form = document.forms.newUser

// Inhabilita la opción de pegado en los campos contraseña y confirmar contraseña
form.password.addEventListener('paste', (event) => event.preventDefault())
form.passwordConfirm.addEventListener('paste', (event) => event.preventDefault())

// Limpia los errores al pulsar el botón de cancelar
form.resetButton.addEventListener('click', () => {
    Array.from(document.getElementsByClassName('error')).forEach(element => {
        element.textContent = ''
    })
})

// Evento submit
form.addEventListener('submit', function (event) {
    event.preventDefault()

    this.action = 'login.html'
    this.method = 'POST'
    // Campos de texto
    const inputFieldsArray = Array.from(document.getElementsByClassName('field'))
    let errors = false

    // Si hay campos vacíos, se muestra un mensaje de error junto a ellos
    if (inputFieldsArray.some(element => element.value === '')) {
        inputFieldsArray
            .filter(element => element.value === '')
            .forEach(element => field(element.name + 'Error').textContent = errorMsg.required)

        errors = true
    }

    // Validación de los campos rellenos
    inputFieldsArray
        .filter(element => element.value !== '')
        .forEach(element => {
            const fieldValue = element.value
            const fieldName = element.name
            const fieldNameError = element.name + 'Error'

            if (!regex[fieldName].test(fieldValue)) {
                field(fieldNameError).textContent = errorMsg[fieldNameError]

                errors = true
            } else {
                field(fieldNameError).textContent = ''
            }
        })

    // Validación de la confirmación de la contraseña
    ;(() => {
        if (form.passwordConfirm.value === '') {
            field('passwordConfirmError').textContent = errorMsg.required
            errors = true

            return
        }

        if (form.password.value === '') {
            field('passwordConfirmError').textContent = errorMsg.passwordConfirmError
            errors = true

            return
        }

        if (form.passwordConfirm.value !== form.password.value) {
            field('passwordConfirmError').textContent = errorMsg.passwordConfirmErrorMatch
            errors = true

            return
        }

        field('passwordConfirmError').textContent = ''
    })()

    // Comprobación de que se ha seleccionado un género
    if (!document.querySelector('input[name="gender"]:checked')) {
        field('genderError').textContent = errorMsg.genderError

        errors = true
    } else {
        field('genderError').textContent = ''
    }

    // Comprobación de que se ha seleccionado un idioma
    if (form.lang.value === '') {
        field('langError').textContent = errorMsg.langError

        errors = true
    } else {
        field('langError').textContent = ''
    }

    if (errors) {
        return
    }

    if (getCookie('status') !== 'accepted') {
        alert('¡Tienes que aceptar las cookies!')
        
        if (field('cookies').classList.contains('hide')) {
            field('cookies').classList.toggle('hide')
        }

        return
    }

    // Si no hay errores, se guarda la información de usuario y se envía el formulario
    const email = form.email.value
    const user = {
        name: form.name.value,
        lastName: form.lastName.value,
        password: form.password.value,
        gender: form.gender.value,
        lang: form.lang.value,
        auth: form.auth.checked
    }
    localStorage[email] = JSON.stringify(user)

    this.submit()
})
