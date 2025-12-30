/* Backend language: 1) SingleThread(nodejs) - bir xonali. Bitta xona hamma userlarni talabiga javob beradi.
                        Shu bitta xonani yordamchi 'thread pool'lari bor. ("libuv" engine yordam beradi.) Start Event Loop tasklarni 
                        yordamchi thread pool'larga jo'natadi. Kamida 4ta yordamchi thread ishlab turadi. 
                        SingleThread'da logikani yaxshi tashkillashtirish kerak, aksincha userlar javob ololmay qoladi.
                        Tashkillashtirishga "Callback" & "Asynchronic" functionlar yordam beradi.

                     2) Multi(php) - ko'p xonali. Xar bitta 'req'ga xona ochilishini talab qiladi. Ko'p harajatli method.*/ 

console.log("Jack Ma maslahatlari:");
const list = [
    "Yaxshi talaba bo'ling", //0-20
    "To'gri boshliq tanlang va koproq hato qiling", //20-30
    "Uzingizga ishlashni boshlang", //30-40
    "Siz kuchli bo'lgan narsalarni qiling", //40-50
    "Yoshlarga investitsiya qiling", //50-60
    "Foydasi yo'q endi, dam oling!:)" //60+
];

//<============================================ Callback =========================================>

// function maslahat(a, Callback) {
//     if(typeof a !== 'number') Callback("Iltimos raqam yozing", null)
//         else if(a <=20) Callback(null, list[0]);
//         else if(a > 20 && a <= 30) Callback(null, list[1]);
//         else if(a > 30 && a <= 40) Callback(null, list[2]);
//         else if(a > 40 && a <= 50) Callback(null, list[3]);
//         else if(a > 50 && a <= 60) Callback(null, list[4]);
//         else {
//             setInterval (function() {
//                 Callback(null, list[5]);         //Callback orqali setInterval ishlatsa bo'ladi
//             }, 1000)
//         }
// }
// //'callback'ni afzalligi timeout bo'lsa kutib turmaydi. Boshqa requestlarga javob berib turadi.
// console.log("Passed here 1");
// maslahat(65, (err, data) => {
//     if(err) console.log('ERROR:', err);
//     else {
//         console.log('Javob:',data);
//     }
// });
// console.log("Passed here 2");

//<============================================ Async: .then().catch()  =========================================>
//Hozirgacha ishlatilgan functionlar Synchron bo'lgan - javobni srazu talab qiladigan functionlar.

// async function maslahat(a) {                                            //define qismini: Asynchron
//     if (typeof a !== 'number') throw new Error ("Iltimos raqam yozing") //throw new Error - hatolik hosil qil
//         else if(a <=20) return list[0];                     
//         else if(a > 20 && a <= 30) return list[1];
//         else if(a > 30 && a <= 40) return list[2];  //faqat javobni return qilamiz (endi 1ta parametr - "a"; null yo'q)
//         else if(a > 40 && a <= 50) return list[3];
//         else if(a > 50 && a <= 60) return list[4];
//         else {
//           return list[5];       //Async ichida Timeout/Interval ishlamaydi
//         }
// }

// console.log("Passed here 1");               /*call qismida: .then().catch() methodlar
//                                         Bu usulning minuslari - request ko'p bolsa ich ichiga yozish kerak*/
// maslahat(80)                                
// .then(data => { maslahat(32)
//         .then(data => {                     //.then - datani ushlab chiqarib beradigan sintaksis
//             console.log("Javob:", data);    //.catch - error'ni ushlab chiqarib beradigan sintaksis
//         })
//         .catch((err) => {                   
//             console.log("ERROR:", err);
//         })                                  
//             console.log("Javob:", data);
//         })
// .catch((err) => {                           
//     console.log("ERROR:", err);
// })
// console.log("Passed here 2");       /*Synch operationlar to'liq ishga tushib bo'lgandan so'ng 
//                                     Asynch javobini chiqarib beradi*/

//<============================================ Define - Async;Call - asyn/await. =========================================>

// async function maslahat(a) {                                            //define qismini: Asynchron
//     if (typeof a !== 'number') throw new Error ("Iltimos raqam yozing") //throw new Error - hatolik hosil qil
//         else if(a <=20) return list[0];                     
//         else if(a > 20 && a <= 30) return list[1];
//         else if(a > 30 && a <= 40) return list[2];  
//         else if(a > 40 && a <= 50) return list[3];
//         else if(a > 50 && a <= 60) return list[4];
//         else {
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                 resolve(list[5]);  
//             }, 2000);
//             });              //Async ichida Timeout/Interval ishlamaydi. Promise orqali setTimeout ishlatsa bo'ladi.
//         }                    //setInterval ishlamaydi Promise orqali. Callback orqali ishlatsa bo'ladi.
// }

// async function run() {
//     let javob = await maslahat(30);  //await - to'liq javob olgancha keyingi qismga o'tmaydi.
//     console.log(javob);              //(Poetapno qilinadigan joyda kerak)
//     javob = await maslahat(21);      //await "event loop"ni band qilib qo'ymaydi, thread pool'ga beradi. 
//     console.log(javob);              //Synch function esa "event loop"ni band qilib ko'p resurs eydi.
//     javob = await maslahat(61);
//     console.log(javob);
//     javob = await maslahat(51);
//     console.log(javob);
// }
// run();