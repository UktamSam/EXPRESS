const http = require("http");

const mongodb = require("mongodb");

let db;
const connectionString = "mongodb+srv://Sam:nXESlM69lMG65h7g@cluster0.lnhnv0b.mongodb.net/";

mongodb.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
        console.log("MongoDB connection success");
        module.exports = client;
        
        const app = require("./app");
        const server = http.createServer(app); //http orqali server ochamiz
        let PORT = 3000;
        server.listen(PORT, function() {
        console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
        }); //serverni malum bir portga listen qildiramiz
    }
});

