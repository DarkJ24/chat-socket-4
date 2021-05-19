const express = require('express')
const { join } = require('path')

const app = express()

app.use(
  express.static(join(__dirname, 'socketAdmin'))
)

app.get(`*`, (req, res) => {
  res.sendFile(join(__dirname, 'socketAdmin', 'index.html'))
})

app.listen(3001, () => {
  console.log(
    `Portal de Admin de Sockets!`
  )
})
