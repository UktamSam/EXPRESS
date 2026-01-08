const http = require("http"); //http - qurilgan backendni malum bir PORT bn bog'lab yurgizib beradi

const mongodb = require("mongodb"); //backendni datebase bilan doimiy tarzda bog'lab beradi
//TCP(doimiy boglanish clientni hosil qilib beradi) & HTTP (bir marta boglanish)

const connectionString = "mongodb+srv://Sam:nXESlM69lMG65h7g@cluster0.lnhnv0b.mongodb.net/";

mongodb.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, client) => {
    if (err) console.log("ERROR on connection MongoDB");
    else {
        console.log("MongoDB connection success");
        module.exports = client; //client.db() - qalam object(datebase'ga togridan togri malumot yozish)
        
        const app = require("./app");
        const server = http.createServer(app); //http orqali server ochamiz
        let PORT = 3000;
        server.listen(PORT, function() {
        console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
        }); //serverni malum bir portga listen qildiramiz
    }
});

//NO SQL - CLUSTER => DATABASE => COLLECTION => DOCUMENT (structure: document, graph, key-value)
//SQL - CLUSTER => DATABASE => TABLE => RECORD => DATASET (table structure - RDBMS)

