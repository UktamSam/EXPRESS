console.log("Web Server boshlandi!");
const express = require("express");
const app = express(); //expresning app objectini junatadi. app - object; express() - function.

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
//backend maqsadi - API tashkillashtirish
//<============================================ MongoDB connect =========================================>

const db = require("./server").db();
const client = require("./server"); //TCP
const mongodb = require("mongodb");
//<============================================ 1 Kirish code =========================================>
//Kirish code - Expressga kirib kelyotgan malumotga bog'liq code
app.use(express.static("public")); 
//browser clientlarga public folderni ochib beryabdi(ichiga css, imagelar joylanadi)

app.use(express.json()); 
//Kirib kelyotgan .json formatdagi datani () objectga ugurib beradi (Client↔Server .json formatdagi file orqali) 
//'REST API' qo'llab quvvatlaydi

app.use(express.urlencoded({extended: true})); 
/*HTMLdan form "req"larni qabul qilib oladi. Yozmasak serverga kiritmaydi. 
(Traditional API - "FORM" datadan jo'natilgan request)*/

//<============================================ 2 Session code =========================================>


//<============================================ 3 Views code ===========================================>

//Views code - BSSR (backendda frontend(view) yasash)
app.set("views", "views"); //2chi "views" shunchaki folder nomi. 'views' ichidagi filelarni ishlatsang bo'ladi
app.set("view engine", "ejs"); //"ejs" orqali frontend yasaladi
//set - seting qiladi.
//"view engine" - "ejs"ni htmlga ugurtib beradi

//<============================================ 4 Routing code =========================================>
//Routing - xonalar uchun yo'nalish ko'rsatadi. 


// app.get("/hello", function(req, res) {
//         res.end('<h1 style="text-align: center;">Assalomu aleykum Bro!</h1>');
// });
// app.get("/gift", function(req, res) {
//         res.end('<h1 style="text-align: center;">You can take gift for your childrens!</h1>');
// });
app.post("/create-item", (req, res)=> {     //post - o'zi bilan malum bir malumotni ob keladi va datebasega yozadi
    console.log('user entered /');    
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) =>{
     console.log(data.ops);
     res.json(data.ops[0]); //mongoDB yangi reja bilan IDsini terminalda qaytaradi
    });      //req.body emas req qilsak butunlay request keladi, judayam katta.
});

app.get('/author', (req, res) => {
    res.render("author", {user: user});
})

app.post("/delete-item", (req, res) => {
    const id = req.body.id;
    db.collection("plans").deleteOne(
        {_id: new mongodb.ObjectId(id)},
        function(err, data){
        res.json({state: "success"});
    })    
});

app.post("/edit-item", (req, res) => {
    const data = req.body;
    console.log(data);
    db.collection("plans")
    .findOneAndUpdate({_id: new mongodb.ObjectId(data.id)},
    {$set: {reja:data.new_input}},
    function (err, data) {
        res.json({state: "success"});
    });
});

app.post("/delete-all", (req, res) => {
    if(req.body.delete_all) {
        db.collection("plans").deleteMany(function(){
            res.json({state:"Hamma rejalar o'chirildi!"});
        });
    };
});

app.get('/', function (req, res) {          //get - 'database'dan malumotni olib o'qish uchun
    console.log('STEP2: FRdan Backga kirish');

    console.log('STEP3: Backdan DATABASEga kirish');
    db.collection("plans")
    .find()
    .toArray((err, data) => {
    console.log('STEP4: DATABASEdan Backga json formatda malumot oborish');
        if (err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            console.log('STEP5: Backdan Frontga html formatda javob qaytarish');
            res.render("reja", {items: data});
        }
    });
})

module.exports = app;



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
