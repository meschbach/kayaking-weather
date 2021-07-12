import { useState } from 'react'
import { Form, FieldError, TextField, Submit } from '@redwoodjs/forms'
import WeatherCell from 'src/components/WeatherCell'
//TODO: figure how out redwood's opinion on importing stylesheets to avoid inline css
// import from './styling'

const HomePage = () => {
  const [locations,setLocations] = useState([]);

  const onNewLocation = (zipcode) => {
    const newLocations = locations.concat([zipcode]);
    setLocations(newLocations);
  }

  return (<div className="home-page">
    <section>
      <h2>Locations</h2>
      {locations.length == 0 && <NoLocations onNewLocation={onNewLocation}/> }
      {locations.length > 0 && <LocationsList onNewLocation={onNewLocation} locations={locations}/>}
    </section>
  </div>)
}

const NoLocations = ({onNewLocation}) => {
  return (<div>
    <h3>Let's get started!</h3>
    <p>What is the zipcode of a place you would like to go kayaking?</p>
    <NewLocationInput onNewLocation={onNewLocation}/>
  </div>)
}

const NewLocationInput = ({onNewLocation}) => {
  const onSubmit = ({zipcode}) => {
    onNewLocation(zipcode)
  }

  return (<section className="location-entry">
    <Form onSubmit={onSubmit} style={{fontSize: '2rem'}}>
      <TextField
        name="zipcode"
        placeholder="Zip code"
        maxLength="5"
        validation={{required: true, pattern: /^\d{5}$/}}
      />
      <Submit>Add</Submit>
    </Form>
  </section>);
}

const LocationsList = ({onNewLocation,locations}) => {
  return (<div>
    <NewLocationPrompt onNewLocation={onNewLocation}/>
    {locations.map(l => <WeatherCell key={l} zipcode={l}/>)}
  </div>);
}

const NewLocationPrompt = ({onNewLocation}) => {
  const [showInput, setShowInput] = useState(false);

  const addLocation = (zipcode) => {
    setShowInput(false);
    onNewLocation(zipcode);
  }

  const onToggle = () => setShowInput(true);

  if( showInput ){
    return <NewLocationInput onNewLocation={addLocation}/>
  }
  return (<div>
    <button onClick={onToggle}>+</button>
  </div>);
}
export default HomePage
