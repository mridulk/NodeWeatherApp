const path=require('path')
const express=require('express')
const hbs=require('hbs')
const forecast=require('./forecast.js')
const geocode=require('./geocode.js')
const app=express()
const port=process.env.PORT || 3000
const viewPath=path.join(__dirname,'../views')
const filepath=path.join(__dirname,'../public')
const partialPath=path.join(__dirname,'../partials')
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(filepath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Created By Mridul'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Created By Mridul'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Created By Mridul'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You Need To Enter The Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,{currentTemp,summary})=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:summary,
                location:location,
                address:req.query.address,
                currentTemp:currentTemp
            })
        })

    })
    // res.send({
    //     forecast:'Forecast of the current Location',
    //     location:'Your Current Location',
    //     address:req.query.address
    // })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You Need To Enter The Search Loaction'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Created By Mridul',
        errorMessage:'Page Not Found'
    })
})
app.listen(port,()=>{
    console.log('Page Successfully Loaded' + port)
})