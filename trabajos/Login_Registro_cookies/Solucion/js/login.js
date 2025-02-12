// Redirige a la página de detalles de usuario si hay un usuario loggeado
window.addEventListener('load', () => {
    const email = getCookie('user')

    if (!regex.email.test(email)) {
        return
    }

    if (!Object.keys(localStorage).includes(email)) {
        return
    }

    window.location.href = 'user_details.html'
})

const form = document.forms.login
let errors = false

function blurEventHandler(event) {
    const eventTargetValue = event.target.value
    const fieldName = this.name

    if (eventTargetValue === '') {
        field(fieldName + 'Error').textContent = errorMsg.required

        errors = true
    }
}

// Campo email
form.email.addEventListener('blur', blurEventHandler)
form.email.addEventListener('input', function (event) {
    const email = event.target.value
    const fieldName = this.name
    const fieldNameError = this.name + 'Error'

    if (!regex[fieldName].test(email)) {
        field(fieldNameError).textContent = errorMsg[fieldNameError]
        errors = true

        return
    }

    field(fieldNameError).textContent = ''
    errors = false
})

// Campo password
form.password.addEventListener('blur', blurEventHandler)
form.password.addEventListener('focus', function () {
    const fieldNameError = this.name + 'Error'

    field(fieldNameError).textContent = ''
})
// Inhabilita la opción de pegado en los campos contraseña y confirmar contraseña
form.password.addEventListener('paste', (event) => event.preventDefault())

// Evento submit 
form.addEventListener('submit', function (event) {
    event.preventDefault()

    this.action = 'user_details.html'
    this.method = 'POST'
    const email = form.email.value
    const password = form.password.value
    
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
    
    if (!Object.keys(localStorage).includes(email)) {
        alert('¡El email no existe!')

        return
    }

    if (JSON.parse(localStorage[email]).password !== password) {       
        alert('¡La contraseña es incorrecta!')

        return
    }

    setCookie('user', email, { 'max-age': 3600 })

    this.submit()
})
