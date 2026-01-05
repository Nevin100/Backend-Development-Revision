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

        // Pipelining : It is a technique to send multiple commands to the Redis server without waiting for the replies of previous commands.

        // Pipelining Example :
        // multi() : It creates a new pipeline.
        const multi = client.multi();

        multi.set('key1', 'value1');
        multi.set('key2', 'value2');
        multi.get('key1');
        multi.get('key2');

        // exec() : It executes all the commands in the pipeline and returns the results.
        const results = await multi.exec();
        console.log('Pipelining Results:', results);
        
    } catch (error) {
        console.log('Error connecting to Redis:', error);
    } finally{
        await client.quit();
    }
}

testRedisConnection();