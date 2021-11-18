const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries/personnes')
const c = require('./queries/commentaire')
const p = require('./queries/post')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

//Personnes
app.get('/personnes', db.getPersonnes)
app.get('/personnes/:id', db.getPersonneById)
app.post('/personnes', db.createPersonne)
app.put('/personnes/:id', db.updatePersonne)
app.delete('/personnes/:id', db.deletePersonne)

//Commentaire
app.get('/commentaire', c.getCommentaires)
app.get('/commentaire/:id', c.getCommentaireById)
app.post('/commentaire', c.createCommentaire)
app.put('/commentaire/:id', c.updateCommentaire)
app.delete('/commentaire/:id', c.deleteCommentaire)

//Post
app.get('/post', p.getPosts)
app.get('/post/:id', p.getPostById)
app.post('/post', p.createPost)
app.put('/post/:id', p.updatePost)
app.delete('/post/:id', p.deletePost)

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
