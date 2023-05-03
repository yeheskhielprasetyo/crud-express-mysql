const express = require('express') //module node express
const app = express()
const port = 3000
const bodyParser = require('body-parser') // body parser untuk convert dari fe jadi json
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    response(200, "API v1 ready to go",  "SUCCESS",  res)
})

app.get('/mahasiswa', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql, (err, fields) => {
        // console.log(fields)
        if (err) throw err
        response(200, fields, "mahasiswa get list",  res)
    })
})

app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`
    db.query(sql, (err, fields) => {
        // console.log(fields)
        if (err) throw err
        response(200, fields, "get detail mahasiswa", res)
    })
})

app.post('/mahasiswa/post', (req, res) => {
    response(200, "posting", res)
})

app.put('/mahasiswa/put', (req, res) => {
    response(200, "update", res)
})

app.delete('/mahasiswa/delete', (req, res) => {
    response(200, "hapus", res)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})