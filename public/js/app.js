console.log('Client side is open')

// fetch('http://puzzle.mead.io/puzzle').then((response)  =>  {
//     response.json().then((data)  => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')

messageOne.textContent = 'from here'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3002/weather?address='+location).then((response)  =>  {
    response.json().then((data)  => {
        if(data.error)  {
            console.log(data.error)
        }   else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})