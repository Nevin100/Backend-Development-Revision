import redis from 'redis';

// Create Redis Client :
const client = redis.createClient({
    host: 'localhost', // Redis server host
    port: 6379 // Redis server port
});

// event Listener : 
client.on('error', () => {
    console.log('Redis Client Error', error);
});

// Test Redis Connection :
async function testRedisConnection(){
    try {
        // Connect to Redis server
        await client.connect();
        console.log('Connected to Redis successfully');
        
        // Subscribe to a channel
        const subscriber = client.duplicate();
        await subscriber.connect();

        await subscriber.subscribe('test-channel', (message) => {
            console.log('Received message:', message);
        });

        //Publisher to send a test message
        const publisher = client.duplicate();
        await publisher.connect();  

        await publisher.publish('test-channel', 'Hello, Redis Pub/Sub!');

        // Unsubscribe and quit after a short delay
        setTimeout(async () => {
            await subscriber.unsubscribe('test-channel');
            await subscriber.quit();
            await publisher.quit();
        }, 1000);
        
    } catch (error) {
        console.log('Error connecting to Redis:', error);
    } finally{
        await client.quit();
    }
}

testRedisConnection();