console.log("Web Server boshlandi!");
const express = require("express");
const app = express(); //expresning app objectini junatadi
const http = require("http");

//1 Kirish code - Expressga kirib kelyotgan malumotga bog'liq code
app.use(express.static("public")); //browser clientlarga public folderni ochib beryabdi(ichiga css, imagelar joylanadi)
app.use(express.json()); //Kirib kelyotgan .json formatdagi datani () objectga ugurib beradi (Client↔Server .json formatdagi file orqali)
app.use(express.urlencoded({extended: true})); //HTMLdan form "req"larni qabul qilib oladi. Yozmasak serverga kiritmaydi

//2: Session code

//3 Views code - BSSR (backendda frontend(view) yasash)
app.set("views", "views"); //2chi "views" shunchaki folder nomi.
app.set("view engine", "ejs"); //"ejs" orqali frontend yasaladi

//4 Routing code
// app.get("/hello", function(req, res) {
//         res.end('<h1 style="text-align: center;">Assalomu aleykum Bro!</h1>');
// });
// app.get("/gift", function(req, res) {
//         res.end('<h1 style="text-align: center;">You can take gift for your childrens!</h1>');
// });
app.post("/create-item", (req, res)=> {     //post - o'zi bilan malum bir malumotni ob keladi va datebasega yozadi
    console.log(req.body);                  //req - 3qismdan iborat; 1-URL, 2-request header, 3-request body.
    res.json({test: "Yuborildi! Ura"})      //req.body emas req qilsak butunlay request keladi, judayam katta.
})
app.get('/', function (req, res) {          //get - 'database'dan malumotni olib o'qish uchun
    res.render("harid");
})

const server = http.createServer(app); //http orqali server ochamiz
let PORT = 3000;
server.listen(PORT, function() {
    console.log(`The server is running successfully on port: ${PORT}`);
}); //serverni malum bir portga listen qildiramiz


//git reset --hard (oxirgi kiritilgan o'zgarishlarni o'chiradi)
//git clean -df (oxirgi qo'shilgan filelarni delete qiladi, folderlarni ham)