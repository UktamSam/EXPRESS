console.log("Web Server boshlandi!");
const express = require("express");
const app = express(); //expresning app objectini junatadi. app - object; express() - function.
const http = require("http");
const fs = require("fs");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if (err) {
        console.log("ERROR:", err);
    } else {
        user = JSON.parse(data)
    }
});
//app - backendni quradi
//http - qurilgan backendni yurgizib beradi

//<============================================ 1 Kirish code =========================================>
//Kirish code - Expressga kirib kelyotgan malumotga bog'liq code
app.use(express.static("public")); //browser clientlarga public folderni ochib beryabdi(ichiga css, imagelar joylanadi)
app.use(express.json()); //Kirib kelyotgan .json formatdagi datani () objectga ugurib beradi (Client↔Server .json formatdagi file orqali)
app.use(express.urlencoded({extended: true})); //HTMLdan form "req"larni qabul qilib oladi. Yozmasak serverga kiritmaydi

//<============================================ 2 Session code =========================================>


//<============================================ 3 Views code ===========================================>

//Views code - BSSR (backendda frontend(view) yasash)
app.set("views", "views"); //2chi "views" shunchaki folder nomi.
app.set("view engine", "ejs"); //"ejs" orqali frontend yasaladi
//set - seting qiladi.

//<============================================ 4 Routing code =========================================>

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

app.get('/author', (req, res) => {
    res.render("author", {user: user});
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
//CRUD - Create Read Update Delete
/*FullStack - oshxonaga o'xshaydi. API - ApplicationProgrammingInterface = Waiter (связывает back&frontend).
Frontend, WWW(официант), Backend(кухня), Database(холодильник)
DevDependencies - faqat develop bilan bog'liq, faqat develop jarayonda ishlatiladi.
npm install - 'dependencies'dagi bor packagelarni node_modulesga o'rnatadi 
EXPRESS - external package, backend server qurib beradi. Backendni maqsadi - API (orasidagi hizmatkor)
NODEJS BACKEND SERVER - express, nestjs
EJS - backendda frontendni qurib olish usuli
*/
/*
Ты редактируешь файл
        ↓
git add        (выбрал, что сохранить)
        ↓
git commit     (сохранил в историю)
        ↓
git push       (отправил на GitHub)
| Команда      | Что делает              |
| ------------ | ----------------------- |
| `git status` | показывает состояние    |
| `git add`    | подготовка к сохранению |
| `git commit` | сохранение в историю    |
| `git push`   | отправка на GitHub      |
| `git pull`   | получение с GitHub      |
| `git log`    | история                 |
| `--oneline`  | короткий вид истории    |

*/
