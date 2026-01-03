import gql from "graphql-tag";

// Define GraphQL schema
export const typeDefs = gql`
  type Product{
    id: ID!,
    title: String!,
    category: String!,
    price: Float!,
}  type Query {
  products: [Product!]!,
  product(id: ID!): Product,
}
   type Mutation {
    addProduct(title: String!, category: String!, price: Float!): Product!,
}
`;

// --- Points ---
// 1.) Import gql from 'graphql-tag' to define the schema.
// 2.) Define a 'Product' type with fields: id, title, and price.
// 3.) Define a 'Query' type with two queries: 'products' (returns a list of Products) and 'product' (returns a single Product by id).
// 4.) '!' indicates non-nullable fields.
// 5.) ID is a unique identifier type in GraphQL. It can be serialized as a string.