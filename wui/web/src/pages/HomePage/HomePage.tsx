import { useState } from 'react'
import { Form, FieldError, TextField, Submit } from '@redwoodjs/forms'
import WeatherCell from 'src/components/WeatherCell'

const HomePage = () => {
  const [zipcode,setZipcode] = useState();

  const onSubmit = (form) => {
    setZipcode(form.zipcode);
  }

  return (<>
    <Form onSubmit={onSubmit} style={{fontSize: '2rem'}}>
      <TextField
        name="zipcode"
        placeholder="Zip code"
        maxLength="5"
        validation={{required: true, pattern: /^\d{5}$/}}
      />
      <FieldError name="zipcode" className="error-message" />
      <Submit>Go</Submit>
    </Form>
    {zipcode && <WeatherCell zipcode={zipcode}/>}
  </>)
};

export default HomePage
