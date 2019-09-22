const express = require("express")
let  app = express()

const sampleData = {
    foo: 'bar',
    bar: 'foo'
}

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('./index.html')
  })
app.get('/api', (req, res) => {
    res.send(sampleData)
  })
app.listen(3000,  () => console.log("Listening on port 3000!"));