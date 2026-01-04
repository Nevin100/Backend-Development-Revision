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
        console.log("\n");

        console.log("------------------- Data Structures in Redis ------------------");
        // *) Data Structures in Redis :
        console.log("------------------- Sets ------------------");
        // 1.)Working with Sets : 

        //-> Add members to a set
        await client.sAdd('mySet', 'member1');
        await client.sAdd('mySet', 'member2');
        await client.sAdd('mySet', 'member3');

        //-> Retrieve all members of the set
        const setMembers = await client.sMembers('mySet');
        console.log('Set Members:', setMembers);

        //-> MSET and MGET
        await client.mSet({key1: 'value1', key2: 'value2', key3: 'value3'});
        const mgetValues = await client.mGet(['key1', 'key2', 'key3']);
        console.log('MGET Values:', mgetValues);

        // Sorted Set Operations
        // -> Add members with scores to a sorted set
        await client.zAdd('mySortedSet', [{ score: 1, value: 'memberA' }, { score: 2, value: 'memberB' }, { score: 3, value: 'memberC' }]);
        const sortedSetMembers = await client.zRange('mySortedSet', 0, -1, { WITHSCORES: true });
        console.log('Sorted Set Members with Scores:', sortedSetMembers);

        // -> Remove a member from the sorted set
        await client.zRem('mySortedSet', 'memberB');
        const updatedSortedSetMembers = await client.zRange('mySortedSet', 0, -1, { WITHSCORES: true });
        console.log('Updated Sorted Set Members with Scores:', updatedSortedSetMembers);
        console.log("\n")

        // 2.) Working with Lists:
        console.log("------------------- Lists ------------------");
        //-> Push elements to a list
        await client.lPush('myList', 'element1');
        await client.lPush('myList', 'element2');
        await client.lPush('myList', 'element3');

        // -> Retrieve all elements from the list
        const listElements = await client.lRange('myList', 0, -1);
        console.log('List Elements:', listElements);

        // -> Pop an element from the list
        const poppedElement = await client.lPop('myList');
        console.log('Popped Element:', poppedElement);

        // -> lRange : it returns the specified elements of the list stored at the key.
        // -> lPush : it inserts all the specified values at the head of the list stored at the key.
        // -> lPop : it removes and returns the first element of the list stored at the key.
        // -> rPush : it inserts all the specified values at the tail of the list stored at the key.
        // -> rPop : it removes and returns the last element of the list stored at the key.

        console.log("\n")
        // 3.) Working with Hashes:
        console.log("------------------- Hashes ------------------");

        //-> Set fields in a hash
        await client.hSet('myHash', 'field1', 'value1');
        await client.hSet('myHash', 'field2', 'value2');
        await client.hSet('myHash', 'field3', 'value3');

        //-> Retrieve all fields and values from the hash
        const hashValues = await client.hGetAll('myHash');
        console.log('Hash Values:', hashValues);

        // -> Delete a field from the hash
        await client.hDel('myHash', 'field2');
        const updatedHashValues = await client.hGetAll('myHash');
        console.log('Updated Hash Values:', updatedHashValues);

        // -> hSet : it sets the specified fields to their respective values in the hash stored at the key.
        // -> hGetAll : it returns all fields and values of the hash stored at the key.
        // -> hDel : it removes the specified fields from the hash stored at the key.

    } catch (error) {
        console.log('Error connecting to Redis:', error);
    } finally{
        await client.quit();
    }
}

testRedisConnection();