const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// Handle Path 
let publicPath = path.join(__dirname , '../public')
app.use(express.static(publicPath))

// view engine Handle
app.set('view engine' , 'hbs')
let viewPath = path.join(__dirname , '../Project/views')
app.set('views' , viewPath )
// Partials Handle
let partialsPath = path.join(__dirname , '../Project/Partials')
hbs.registerPartials(partialsPath)








/* Handle Pages */
app.get('/' , (req , res )=>{
    res.render('index' , {
        title : 'Mohamed Ayman Awara'
    })
})
// Weather Handle in url 
const geocode = require('./Weather/geocode')
const forecast = require('./Weather/forecast')
app.get('/data' , (req , res )=>{
    if (!req.query.address){
        return res.send({
            handleError : 'This Page for Enter Address in URL ',
            error : 'You Must Enter Address '
        })
    }
    let country = req.query.address
    geocode(country , (error , response)=>{
        if (error){
            return res.send({error})
        }
        forecast(response.latitude , response.longtitude , (error , data)=>{
            if (error){
                return res.send({error})
            }
            res.render('data' , {
                res : data,
                country : country
            })
        })
    })
})

// Weather HAndle in weather page 

app.get('/weather' , (req , res )=>{
    if (!req.query.address){
        return res.send({
            error : 'You Must Enter Address '
        })
    }
    let country = req.query.address
    geocode(country , (error , response)=>{
        if (error){
            return res.send({error})
        }
        forecast(response.latitude , response.longtitude , (error , data)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                res : data,
                country : country
            })
        })
    })
})


// Handle Listen
app.listen(port , ()=>{
    console.log('Running....')
})