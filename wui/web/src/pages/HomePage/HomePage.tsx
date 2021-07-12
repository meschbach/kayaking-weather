import { useState } from 'react'
import { Form, FieldError, TextField, Submit } from '@redwoodjs/forms'
import WeatherCell from 'src/components/WeatherCell'

const HomePage = () => {
  const [locations,setLocations] = useState([]);

  const onSubmit = (form) => {
    const newLocations = locations.concat([form.zipcode]);
    setLocations(newLocations);
  }

  return (<>
    <section>
      <h2>Add a Location</h2>
      <Form onSubmit={onSubmit} style={{fontSize: '2rem'}}>
        <TextField
          name="zipcode"
          placeholder="Zip code"
          maxLength="5"
          validation={{required: true, pattern: /^\d{5}$/}}
        />
        <Submit>Go</Submit>
      </Form>
    </section>
    <section>
      <h2>Locations</h2>
      {locations.length == 0 && <NoLocations/> }
      {locations.map(l => <WeatherCell zipcode={l}/>)}
    </section>
  </>)
}

const NoLocations = () => {
  return (<div>Add a location above!</div>)
}

export default HomePage
