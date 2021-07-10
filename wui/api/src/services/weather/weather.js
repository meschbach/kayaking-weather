import fetch from 'node-fetch'

//TODO: Figure out how secrets injection should work -- env vars are actually insecure
const API_KEY = process.env["API_KEY"];

export const weather = async ({ zip }) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=${API_KEY}`
  )
  //given zip code does not exist or is not valid
  if( response.status === 404 ){
    return null;
  }

  const json = await response.json()

  return {
    zip,
    city: json.name,
    conditions: json.weather[0].main,
    temp: Math.round(((json.main.temp - 273.15) * 9) / 5 + 32),
    icon: `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
  }
}
