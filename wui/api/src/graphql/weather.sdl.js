export const schema = gql`
  type Weather {
    zip: String!
    city: String!
    conditions: String!
    temp: Int!
    icon: String!
  }

  type Query {
    weather(zip: String!): Weather!
  }
`
