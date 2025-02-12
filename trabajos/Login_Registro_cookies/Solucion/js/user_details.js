const email = getCookie('user')

window.addEventListener('load', () => {
    if (!regex.email.test(email)) {
        window.location.href = 'login.html'
    }
})

const user = JSON.parse(localStorage[email])

window.addEventListener('load', () => {
    field('name').textContent = user.name
    field('lastName').textContent = user.lastName
    field('gender').textContent = gender[user.gender]
    field('email').textContent = email
    field('password').textContent = user.password.length
    field('lang').textContent = lang[user.lang]
    field('auth').textContent = auth[user.auth]  
})

field('submitButton').addEventListener('click', () => {
    setCookie('user', "", { 'max-age': 0 })

    window.location.href = 'login.html'
})