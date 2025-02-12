field('acceptButton').addEventListener('click', () => {
    field('cookies').classList.toggle('hide')

    setCookie('status', 'accepted', { 'max-age': 3600 })
})

field('rejectButton').addEventListener('click', () => {
    field('cookies').classList.toggle('hide')
})

window.addEventListener('load', () => {
    if (getCookie('status') === 'accepted') {
        field('cookies').style.display = 'none'

        return
    }

    field('cookies').classList.remove('hide')
})
