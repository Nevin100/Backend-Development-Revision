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
    
        // Set a test key-value pair
        // To Set a key and its value : await client.set("key", "value");
        await client.set('testKey','testValue')
        const TestKey = await client.get('testKey');
        console.log('Retrieved Value:', TestKey);

        // Delete the test key
        await client.del('testKey');
        console.log('Test key deleted');

        // Verify deletion
        const deletedValue = await client.get('testKey');
        console.log('Value after deletion (should be null):', deletedValue);

        // Increment a counter
        await client.incr('counter'); // Counter will be created if it doesn't exist and set to 1
        const counterValue = await client.get('counter');
        console.log('Counter Value:', counterValue);

        // Decrement the counter
        await client.decr('counter');
        const decrementedCounterValue = await client.get('counter');
        console.log('Decremented Counter Value:', decrementedCounterValue);

    } catch (error) {
        console.log('Error connecting to Redis:', error);
    } finally{
        await client.quit();
    }
}

testRedisConnection();