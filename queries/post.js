const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bddoberichat',
    password: 'postgre',
    port: 5432,
})

const getPosts = (request, response) => {
    pool.query('SELECT * FROM post ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPostById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM post WHERE id = $1', [id], (error,results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPost = (request, response) => {
    const { nom, likes, idCommentaire } = request.body

    pool.query('INSERT INTO post (nom,likes,idCommentaire) VALUES ($1, $2, $3)', [nom,likes,idCommentaire], (error) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Post added with ID`)
    })
}

const updatePost = (request, response) => {
    const id = parseInt(request.params.id)
    const { nom,likes,idCommentaire } = request.body

    pool.query(
        'UPDATE post SET nom = $1, likes = $2, idCommentaire = $3 WHERE id = $4',
        [nom, likes, idCommentaire, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Post modified with ID`)
        }
    )
}

const deletePost = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM post WHERE id = $1', [id], (error) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Post deleted with ID`)
    })
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}
