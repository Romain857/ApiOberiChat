const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bddoberichat',
    password: 'postgre',
    port: 5432,
})

const getPersonnes = (request, response) => {
    pool.query('SELECT * FROM personnes ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPersonneById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM personnes WHERE id = $1', [id], (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPersonne = (request, response) => {
    const { nom, prenom } = request.body

    pool.query('INSERT INTO personnes (nom,prenom) VALUES ($1, $2)', [nom,prenom], (error) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Personnes added with ID`)
    })
}

const updatePersonne = (request, response) => {
    const id = parseInt(request.params.id)
    const { nom, prenom } = request.body

    pool.query(
        'UPDATE personnes SET nom = $1, prenom = $2 WHERE id = $3',
        [nom, prenom, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Personnes modified with ID`)
        }
    )
}

const deletePersonne = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM personnes WHERE id = $1', [id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Personnes deleted with ID`)
    })
}

module.exports = {
    getPersonnes,
    getPersonneById,
    createPersonne,
    updatePersonne,
    deletePersonne
}
