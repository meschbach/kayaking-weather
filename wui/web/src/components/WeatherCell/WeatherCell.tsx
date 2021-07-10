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
  return <section>
    <h1>{weather.city}</h1>
    <h2>
      <img src={weather.icon} style={{ maxWidth: '2rem' }} />
      <span>
          {weather.temp}°F and {weather.conditions}
        </span>
    </h2>
  </section>
}
