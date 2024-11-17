const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log(process.cwd())
// D:\Level-2-projects\ML-2\Moongoose/.env