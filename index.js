const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries/personnes')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/personnes', db.getPersonnes)
app.get('/personnes/:id', db.getPersonneById)
app.post('/personnes', db.createPersonne)
app.put('/personnes/:id', db.updatePersonne)
app.delete('/personnes/:id', db.deletePersonne)

// var Capitalize = function (){
//     const laString = "azerty"
//     console.log(laString)
//     ls = laString.toUpperCase()
//     console.log(ls)
// }

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
    // Capitalize()
})
