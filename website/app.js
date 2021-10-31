/* Global Variables */
let date = document.getElementById('date')
let temp = document.getElementById('temp')
let content = document.getElementById('content')
let city = document.getElementById('city')
let description = document.getElementById('desc')

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+'/'+ d.getDate()+'/'+ d.getFullYear();

/* Function to POST data */
const postData = async ( url = '', data = [])=>{
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
        // try to send the zip code to the server & get back the city name & temp & icon for the weather & set dom elements to these values.
      try {
        const newData = await response.json();
          console.log(newData.name);
          let feelings = document.getElementById('feelings').value;
          let icon = newData.weather[0].icon;
          let pic = document.getElementById('pic').src= `https://openweathermap.org/img/wn/${icon}@2x.png`;
          city.innerHTML = `${newData.name}`;
          temp.innerHTML = `${newData.main.temp} °C`;
          date.innerHTML = newDate;
          description.innerHTML = newData.weather[0].description;
         
          // check if user didn't fill the feelings textarea.
          if (feelings === '') {
          } else {
              
            content.innerHTML = `you're feeling : ${feelings}`;
          }
          
        return newData;
          // if we catch an error warn the user that the city was not found .
      }catch(error) {
          console.log("error", error);
          let pic = document.getElementById('pic').src= '';
          city.innerHTML = '';
          temp.innerHTML = 'City not found check the zipcode';
          date.innerHTML = '';
          description.innerHTML = '';
          content.innerHTML = '';
      // appropriately handle the error
      }
  }
// get zip on click
document.getElementById('generate').addEventListener('click', action)
    
function action() {
    let zipCode = document.getElementById('zip').value;
    postData('/weather', { zip: zipCode, feelings: feelings })
 
    
}


  


