const request = require('request')
const forecast=(lat,long,callback)=>{
const url='https://api.darksky.net/forecast/c748d1dd1faaecfab7f8afdf2cce7765/'+encodeURI(lat)+','+encodeURI(long)+'?units=si'
 request({url:url,json:true},(error,response)=>{
     if(error){
         callback('Not Connected to the Network',undefined)
     }
     else if(response.body.error){
        callback('Poorly Formatted Link Request',undefined)
     }
     else{
         callback(undefined,{
             currentTemp:response.body.currently.temperature,
             summary:response.body.daily.summary
         })
     }
 })
}
module.exports=forecast