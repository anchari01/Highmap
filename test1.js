const {Pool} = require("pg")
const pool = new Pool({
  user: 'redcat',
  host: '203.185.67.58',
  database: 'dbhighmap_example',
  password: 'std12345',
  port: 5432,
})


const getUsers = (request, response) => {
  pool.query('SELECT * FROM public.th ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM th WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, lat, lon, country } = request.body

  pool.query('INSERT INTO th (name, lat, lon, country) VALUES ($1, $2, $3, $4)', [name, lat, lon, country], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, lat, lon, country } = request.body

  pool.query(
    'UPDATE th SET name = $1, lat = $2 , lon = $3, country = $4 WHERE id = $5',
    [name, lat, lon, country, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM th WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}


