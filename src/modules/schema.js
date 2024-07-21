const { buildSchema } = require('graphql');

module.exports = buildSchema(`#graphql
  type Restaurant {
    id: String!
    name: String!
    address: String!
    foods: [Food!]!
  }

  type Food {
    id: String!
    name: String!
    price: Float!
    restaurantId: String!
    restaurant: Restaurant!
  }

  type Query {
    restaurants: [Restaurant]
    restaurant(id: String!): Restaurant
    foods: [Food]!
    food(id: String!): Food
  }

  type Mutation {
    createRestaurant(name: String!, address: String!): Restaurant!
    updateRestaurant(id: String!, name: String!, address: String!): Restaurant!
    deleteRestaurant(id: String!): String!
    createFood(name: String!, price: Float!, restaurantId: String!): Food!
    updateFood(id: String!, name: String!, price: Float!, restaurantId: String!): Food!
    deleteFood(id: String!): String!
  }
`);
