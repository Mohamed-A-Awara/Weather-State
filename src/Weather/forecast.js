const  request  = require("request")

forecast = (latitude , longtitude , callback)=>{

    url = 'https://api.weatherapi.com/v1/current.json?key=0b1c4265208f4a02b1d100438232311%20&q=' + latitude +','+longtitude
    request({url  : url , json  : true } , (error , response)=>{
        if (error){
            callback('Connection Failed ' , undefined)
        }
        else if (response.body.error){
            callback(response.body.error.message , undefined)
        }
        else{
            let data =  `Your location is : ${response.body.location.name} , The Weather is : ${response.body.current.condition.text} and the Temp is : ${response.body.current.temp_c} .` 
            callback(undefined  , data)
        }
    })
}

// forecast(29.871903452398, 26.4941838299718 , (error , res)=>{
//     console.log('ERROR : ' , error)
//     console.log('Data : ' , res )
// })
module.exports = forecast