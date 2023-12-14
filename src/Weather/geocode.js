const request = require('request')

const geocode = (country , callback)=>{
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=pk.eyJ1IjoibW9oYW1lZGF3YXJhIiwiYSI6ImNscDhxbjdwNjA0ZWoyaW10MGdkN3pvMzEifQ.jFdChWy_D3SA8NcXpWRdJA`
    request({url : url , json : true } , (error , response) =>{
        if (error){
            callback('Connection Failed ' , undefined)
        }
        else if (response.body.error){
            callback(response.body.error , undefined)
        }
        else if (response.body.features.length == 0){
            callback('Country Not Found ! ' , undefined)
        }
        else {
            let latitude = response.body.features[0].center[0]
            let longtitude = response.body.features[0].center[1]
            callback(undefined , {
                latitude : latitude,
                longtitude  : longtitude
            })
        }
    })
}

// geocode('egypt'  , (error , res)=>{
//     console.log('ERROR : ' , error)
//     console.log('Data : ' , res)
// })
module.exports = geocode