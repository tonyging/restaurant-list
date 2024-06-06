const express = require('express')
const { engine } = require('express-handlebars')
const app = express() //將express儲存成app變數使用
const port = 3000
const restaurantList = require('./public/jsons/restaurant.json').results

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { restaurantList: restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const restaurant = restaurantList.find((rr) => rr.id.toString() === id)
    res.render('show', { restaurantList, restaurant })
})

app.listen(port, () => {
    console.log(`1st express server on http://localhost:${port}`)
})

