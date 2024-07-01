import React,{useEffect,useState,useRef} from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_sun_icon from '../assets/rain_with_sun.png'
import snow_icon from '../assets/snow.png'
import sunny_icon from '../assets/sunny.png'
import thunder_icon from '../assets/thunderstorm.png'
import wind_icon from '../assets/windy.png'

const Weather = () => {
    const inputRef=useRef()
    const [weatherData,setWeatherData]=useState(false);

    const allIcons={
        "01d":sunny_icon,
        "01n":sunny_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":cloud_icon,
        "04n":cloud_icon,
        "09d":drizzle_icon,
        "09n":drizzle_icon,
        "10d":drizzle_icon,
        "10n":drizzle_icon,
        "11d":thunder_icon,
        "11n":thunder_icon,
        "13d":snow_icon,
        "13n":snow_icon,

    }

    const search =async(city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cd073e87f7f8399a945d09405d1a0d63`;
            const response =await fetch(url);
            const data=await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon =allIcons[data.weather[0].icon] || sunny_icon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location:data.name,
                icon:icon

            })
        }
        catch(error){
            setWeatherData(false);
            console.error("Error in fetching weather data");
        }
    }
    useEffect(()=>{
        search("");
    },[])    

  return (
    <div className='weather'>
        <div className='search'>
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={search_icon} alt="" className='search-icon' onClick={()=>search(inputRef.current.value)} />
        </div>
        {weatherData?<>
        <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
            <div className='col'>
                <img src={humidity_icon} alt="" className="humidity-icon"/>
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className='col'>
                <img src={wind_icon} alt="" className='wind-icon'/>
                <div>
                    <p>{weatherData.windSpeed} km/hr</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </>:<></>}
        
    </div>
  )
}

export default Weather