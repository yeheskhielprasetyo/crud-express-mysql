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

app.post('/mahasiswa', (req, res) => {
    const {nim, nama, kelas, alamat} = req.body

    // console.log(req.body)
    const sql = `INSERT INTO mahasiswa (nim,nama,kelas,alamat) VALUES (${nim}, '${nama}', '${kelas}', '${alamat}')`

    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)

        if(fields?.affectedRows){
            const data  = {
                isSuccess : fields.affectedRows,
                id: fields.insertId
            }
            response(200, data, "data Add Succesfully", res)
        }
    })
})

app.put('/mahasiswa', (req, res) => {
    const {nim, nama, kelas, alamat} = req.body

    // console.log(req.body)
    const sql = `UPDATE mahasiswa SET  nama = '${nama}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`

    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)

        if(fields?.affectedRows){
            const data  = {
                isSuccess : fields.affectedRows,
                message: fields.message,
            }
            response(200, data, "Update data Succesfully", res)
        } else {
            response(400, "user not found", "error", res)
        }
    })
})

app.delete('/mahasiswa', (req, res) => {
    const {nim} = req.body
    const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`

    db.query(sql, (err, fields) => {
        if (err) response(500, "invalid", "error", res)

        if(fields?.affectedRows){
            const data  = {
                isSuccess : fields.affectedRows,
            }
            response(200, data, "Delete data Succesfully", res)
        } else {
            response(400, "user not found", "error", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})