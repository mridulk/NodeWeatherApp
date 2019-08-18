
const weather=document.querySelector('form')
const search=document.querySelector('input')
const p1=document.querySelector('#currentTemp')
const p2=document.querySelector('#summary')
const p3=document.querySelector('#location')
weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const addressValue=search.value
    p1.textContent='Loading ...'
    p2.textContent=''
    p3.textContent=''
    fetch('/weather?address='+addressValue).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           p1.textContent='Error :'+data.error
        }
        else{
            p1.textContent='Current Temperature  :'+ data.currentTemp 
            p2.textContent='Summary  :'+ data.forecast
            p3.textContent='Location :'+ data.location
        }
    })
})
})