import type { FindWeatherQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindWeatherQuery($zipcode: String!) {
    weather: weather(zip: $zipcode) {
      zip
      city
      conditions
      temp
      icon
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({zipcode}) => <div>Zip code {zipcode} does not exist</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ weather }: CellSuccessProps<FindWeatherQuery>) => {
  return <section className="weather-cell">
    <div className="weather-cell-weather-icon" style={{backgroundImage: "url("+  weather.icon +")"}}/>
    <div className="weather-cell-info">
      <div>{weather.city}</div>
      <div>
        {weather.conditions} @ {weather.temp}
      </div>
    </div>
  </section>
}
