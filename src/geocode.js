const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibXJpZHVsbGsiLCJhIjoiY2p5dDdjeGI4MDEybDNucGh4MDE1bmRiMCJ9.KXIT46MuUmclV8fBJ_tk2g&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unstable Network Connection',undefined)
        }
        else if(response.body.features.length===0){
            callback('Location Not Found',undefined)
        }
        else{
            callback(
                undefined,
                {
                    latitude:response.body.features[0].center[1],
                    longitude:response.body.features[0].center[0],
                    location:response.body.features[0].place_name
                }
            )
        }
    })
}
module.exports=geocode