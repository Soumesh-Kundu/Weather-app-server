import axios from "axios"
import { config } from "dotenv"
config()

//main function responsible for retrive and formating weather data
export async function getWeahterData(latitude,longitude){
    const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`)
    return {
        ...data,current:{...data.current,condition:data.forecast.forecastday[0].day.condition},forecast:{
            max_temp_c:data.forecast.forecastday[0].day.maxtemp_c,
            min_temp_c:data.forecast.forecastday[0].day.mintemp_c,
            avg_temp_c:data.forecast.forecastday[0].day.avgtemp_c,
            maxwind_kph:data.forecast.forecastday[0].day.maxwind_kph,
            chance_of_rain:data.forecast.forecastday[0].day.daily_change_to_rain,
            sunrise:data.forecast.forecastday[0].astro.sunrise,
            sunset:data.forecast.forecastday[0].astro.sunset
        }
    }
}