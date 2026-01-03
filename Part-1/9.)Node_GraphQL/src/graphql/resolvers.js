import products from '../data/products.js';

// Define resolvers : Respond to GraphQL queries
const resolvers = {
    Query: {
        products: () => products,
},
};

export default resolvers;