// fetch runs in client side JS

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    // prevent page refreshing
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    // Clear any value that might have existed from a previous search
    messageTwo.textContent = ''

    // Need to remove domain completely, adapt from local to heroku
    fetch('/weather?address=' + search.value)
    .then(data => data.json().then((data) => {
        if (data.error) {
            messageOne.textContent = ''
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = ''
            messageTwo.textContent = data.location + '\n' + data.forecast
        }
    }))
})