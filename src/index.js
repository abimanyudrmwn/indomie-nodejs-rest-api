const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const { db } = require('./model/dbConnection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// read
app.get('/api/indomie', (req, res) => {
  const sqlQuery = "SELECT * FROM indomie";

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.get('/api/readIndomie/:indm_nama', (req, res) => {
  const indomieNama = req.params.indm_nama;

  const sqlQuery = "SELECT * FROM indomie WHERE indm_nama = ?";
  db.query(sqlQuery, indomieNama, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
// #####

// create
app.post('/api/createIndomie', (req, res) => {
  const indomieNama = req.body.indm_nama;
  const indomieTentang = req.body.indm_tentang;
  const indomieKategori = req.body.indm_kategori;
  const indomiePic = req.body.indm_img;

  const sqlQuery = "INSERT INTO indomie (indm_nama, indm_tentang, indm_kategori, indm_img) VALUE (?, ?, ?, ?)";
  db.query(sqlQuery, [indomieNama, indomieTentang, indomieKategori, indomiePic], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
// #####

// update
app.put('/api/updateIndomie', (req, res) => {
  const indomieNama = req.body.indm_nama;
  const indomieTentang = req.body.indm_tentang;
  const indomieKategori = req.body.indm_kategori;
  const indomiePic = req.body.indm_img;

  const sqlQuery = "UPDATE user SET indm_nama = ?, indm_tentang = ?, WHERE indomieKategori = ?, indm_img =?";
  db.query(sqlQuery, [indomieNama, indomieTentang, indomieKategori, indomiePic], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
// #####

// delete
app.delete('/api/deleteIndomie', (req, res) => {
  const indomieId = req.body.id;

  const sqlQuery = "DELETE FROM indomie WHERE id = ?";
  db.query(sqlQuery, indomieId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
// #####

app.listen(3001, () => {
  console.log('server berhasil berjalan pada port 3001!');
});