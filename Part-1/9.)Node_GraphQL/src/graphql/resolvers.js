import products from '../data/products.js';

// Define resolvers : Respond to GraphQL queries
const resolvers = {
    Query: {
        products: () => products,
        product: (_, { id }) => products.find(product => product.id === id),
},
// Define resolvers for Mutations
Mutation:{
    addProduct: (_, { title, category, price }) => { 
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1,
            title,
            category,
            price
        };
        products.push(newProduct);
        return newProduct;
    }
}
};

export default resolvers;