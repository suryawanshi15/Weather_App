import React, {useState , useEffect } from 'react';
import axios from 'axios'
import API_KEY from './Keys';
import './App.css'


function App(){
  const [weatherData , setWeatherData] = useState(null)
  const [city , setCity] = useState('')

  const apiurl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  useEffect(()=>{
    if(city){
      axios.get(apiurl).then(response => {
        setWeatherData(response.data)
      });
    }
  },[city , apiurl])

  const handleSubmit = (e) => {
    e.preventDefault();
    setWeatherData(null);
    setCity(e.target.elements.city.value)
  } ;

  return(
    <div className='container'>
       <form onSubmit={handleSubmit}>
        <label htmlFor='city'>Enter a city:</label>
        <input type='text' name='city'placeholder='e.g. Nashik' required/>
        <button type='submit'>Get Weather </button>
       </form>

        {weatherData && (
        <div className='weather'> 
          <h2 className='weather_city'> {weatherData.name} , {weatherData.sys.country}</h2>
            <div className='weather_details'>
              <img className='weather_icon' src= {`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
              <div className='weather__temperature'>{Math.round(weatherData.main.temp)}&deg;C</div>
              <div className='weather_description'> {weatherData.weather[0].description} </div>
          </div>
        </div>
       )}

       {weatherData === false && ( <div className='error'> Sorry , we could not find that city , Please try again .. </div>)}
    </div>
  )
}

export default App ;