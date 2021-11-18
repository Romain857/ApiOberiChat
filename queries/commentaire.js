const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bddoberichat',
    password: 'postgre',
    port: 5432,
})

const getCommentaires = (request, response) => {
    pool.query('SELECT * FROM commentaire ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCommentaireById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM commentaire WHERE id = $1', [id], (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createCommentaire = (request, response) => {
    const { corps } = request.body

    pool.query('INSERT INTO commentaire (corps) VALUES ($1)', [corps], (error) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Commentaire added with ID`)
    })
}

const updateCommentaire = (request, response) => {
    const id = parseInt(request.params.id)
    const { corps} = request.body

    pool.query(
        'UPDATE commentaire SET corps = $1 WHERE id = $2',
        [corps, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Commentaire modified with ID`)
        }
    )
}

const deleteCommentaire = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM commentaire WHERE id = $1', [id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Commentaire deleted with ID`)
    })
}

module.exports = {
    getCommentaires,
    getCommentaireById,
    createCommentaire,
    updateCommentaire,
    deleteCommentaire
}
