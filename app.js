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
    const keyword = req.query.keyword?.trim()
    const matchedRestaurant = keyword ? restaurantList.filter((mv) =>
        Object.values(mv).some((property) => {
            if (typeof property === 'string') {
                return property.toLowerCase().includes(keyword.toLowerCase())
            }
            return false
        })
    ) : restaurantList
    res.render('index', { restaurantList: matchedRestaurant, keyword })
})

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const restaurant = restaurantList.find((rr) => rr.id.toString() === id)
    res.render('show', { restaurantList, restaurant })
})

app.listen(port, () => {
    console.log(`1st express server on http://localhost:${port}`)
})

