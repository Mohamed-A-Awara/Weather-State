let form1 = document.getElementById('form1')
let input1 = document.getElementById('inp1')
let errortext = document.getElementById('error')
let countrytext = document.getElementById('country')
let datatext = document.getElementById('data')


form1.addEventListener('submit' , (e)=>{
    e.preventDefault()
    console.log(input1.value)
    Weather()

})

let Weather = async ()=>{
    try{
        let address = input1.value
        let url = `http://localhost:3000/weather?address=${address}`
        let res = await fetch(url)
        let response = await res.json()
        console.log(response)
        if (response.error){
            errortext.innerText = response.error
            countrytext.innerText=''
            datatext.innerText=''
        }
        else{
            countrytext.innerText = response.country
            datatext.innerText = response.res
        }
    }
        catch {
            console.log('Not Found')
        }
    
}