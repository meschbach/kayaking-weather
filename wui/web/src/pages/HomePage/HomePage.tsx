import { useState } from 'react'
import { Form, TextField, Submit } from '@redwoodjs/forms'

//TODO: look into Redwood to see secrets story
const API_KEY = "";

const locateWeatherForZip = async (zipcode) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${API_KEY}`)
  const asJSON = await response.json();
  return asJSON;
}

const HomePage = () => {
  const [weather,setWeather] = useState();

  const onSubmit = (data) => {
    locateWeatherForZip(data.zip)
      .then((result) => {
        setWeather(result)
      }, (rejection) => console.error(rejection))
  }

  const temp = () => Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32)

  const condition = () => weather.weather[0].main

  const icon = () => {
    if( !weather || weather.weather.length < 1) { return null; }
    return `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  }

  return (<>
    <Form onSubmit={onSubmit} style={{fontSize: '2rem'}}>
      <TextField
        name="zip"
        placeholder="Zip code"
        maxLength="5"
        validation={{required: true, pattern: /^\d{5}$/}}
      />
      <Submit>Go</Submit>
    </Form>
    {weather && (
      <section>
        <h1>{weather.name}</h1>
        <h2>
          <img src={icon()} style={{ maxWidth: '2rem' }} />
          <span>
                {temp()}°F and {condition()}
              </span>
        </h2>
      </section>
    )}
  </>)
};

export default HomePage
