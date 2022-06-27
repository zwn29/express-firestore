const express = require('express')
const admin = require('firebase-admin')
const serviceAccount = require('./express-firestore-backend-firebase-adminsdk-6kvqp-ddcc46a230.json')
const app = express()
const port = 3000

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

let data

db.collection('sampleData')
  .doc('inspiration')
  .get()
  .then(doc => {
    data = doc.data()
  })
  .catch(err => {
    console.log(err)
  })

app.get('/', (req, res) => {
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
