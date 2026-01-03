import express from "express"

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Normal Example :
app.get("/", (req : express.Request, res : express.Response) => {
    res.send("Hello, World!.. TS with Node");
});

// Interface for Post request body
interface Data {
    name: string;
    age: number;
}

// Post request example
// -> req : express.Request<ParamsDictionary, ResponseBody, RequestBody, ReqQuery, Locals>
app.post("/data", (req : express.Request<{}, {}, Data, {}>, res : express.Response) => {
    try {
        const { name, age } = req.body;
        console.log(name, age);
        res.status(200).send("Data received successfully");
    } catch (error : any) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
