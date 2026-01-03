import products from '../data/products.js';

// Define resolvers : Respond to GraphQL queries
const resolvers = {
    Query: {
        products: () => products,
        product: (_, { id }) => products.find(product => product.id === id),
},
// Define resolvers for Mutations
Mutation:{
    // Resolver to add a new product
    addProduct: (_, { title, category, price }) => { 
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1,
            title,
            category,
            price
        };
        products.push(newProduct);
        return newProduct;
    },
    // Resolver to delete a product by ID
    deleteProduct: (_, { id }) => {
        const index = products.findIndex(product => product.id === id);
        if (index === -1) return null;
        const deletedProduct = products.splice(index, 1)[0];
        return deletedProduct;
    },
    // Resolver to update an existing product
    updateProduct: (_, { id, title, category, price }) => {
        const product = products.find(product => product.id === id);
        if (!product) return null;
        if (title !== undefined) product.title = title;
        if (category !== undefined) product.category = category;
        if (price !== undefined) product.price = price;
        return product;
    }
}}

export default resolvers;