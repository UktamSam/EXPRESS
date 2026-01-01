/* Backend language: 1) SingleThread(nodejs) - bir xonali. Bitta xona hamma userlarni talabiga javob beradi.
                        Shu bitta xonani yordamchi 'thread pool'lari bor. ("libuv" engine yordam beradi.) Start Event Loop tasklarni 
                        yordamchi thread pool'larga jo'natadi. Kamida 4ta yordamchi thread ishlab turadi. 
                        SingleThread'da logikani yaxshi tashkillashtirish kerak, aksincha userlar javob ololmay qoladi.
                        Tashkillashtirishga "Callback" & "Asynchronic" functionlar yordam beradi.

                     2) Multi(php) - ko'p xonali. Xar bitta 'req'ga xona ochilishini talab qiladi. Ko'p harajatli method.
language: 1) compire: java 
          2) nodejs (NestJS, KOA)
          3) python (Django)  
          
    DEFINE
    */ 

// console.log("Jack Ma maslahatlari:");
// const list = [
//     "Yaxshi talaba bo'ling", //0-20
//     "To'gri boshliq tanlang va koproq hato qiling", //20-30
//     "Uzingizga ishlashni boshlang", //30-40
//     "Siz kuchli bo'lgan narsalarni qiling", //40-50
//     "Yoshlarga investitsiya qiling", //50-60
//     "Foydasi yo'q endi, dam oling!:)" //60+
// ];

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
// maslahat(25, (err, data) => {
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
//     console.log(javob);              //Synch function esa "event loop"ni band qilib ko'p resurs eydi
//     javob = await maslahat(61);
//     console.log(javob);
//     javob = await maslahat(51);
//     console.log(javob);
// }
// run();


//<============================================ Mark tashlagan masalalar =========================================>
// 1- masala 
//  asyns va awaitdan foydalanib 1. suv qaynatilmoqda.... 3secunddan keyin  ,   suv qaynadi ,  choyni damlang.... 3 secunddan keyin  ,  choy tayyor boldi deb consolega chiqaring
// const choy = ['Suv qaynatilmoqda', 'Suv qaynadi ,  choyni damlang', 'Choy tayyor boldi, issiq choy iching' ];
//  async function tea (t) {
//     return new Promise (resolve => setTimeout(resolve, t));
//  }

//  async function run () {
//    console.log(choy[0]);
//    await tea (3000);
//    console.log(choy[1]);
//    await tea (3000);
//    console.log(choy[2]);
//  }
//  run();

// 2- masala 
// 2 sekund => "Telefon zaryadga qo‘yildi..."
// 3 sekund => "50% zaryad oldi..."
// 2 sekund =>"100% bo‘ldi, zaryaddan olishingiz mumkin!!"

// const telefon = ['Telefon zaryadga qo‘yildi...', '50% zaryad oldi...', '100% bo‘ldi, zaryaddan olishingiz mumkin!!' ];
//  async function charger (t) {
//     return new Promise (resolve => setTimeout(resolve, t));
//  }

//  async function run () {
//    await charger (2000);
//    console.log(telefon[0]);
//    await charger (3000);
//    console.log(telefon[1]);
//    await charger (2000);
//    console.log(telefon[2]);
//  }
//  run();

// 3- masala 
// consolega 1.  Serverga murojaat qilindi...
// (2 sekund kutadi)
//  2. Ma'lumot yuklanmoqda...
// (2 sekund kutadi)
// 3. Ma'lumot yuklandi: { id: 1, name: 'Boburbek', status: 'active' } 
//va songida
// consolega  
// console.log("Ma'lumot yuklandi: ", data);
//   console.log(data.name, " Hush kelibsiz");
// ko'rinishida  ishlaydigan cod 
// const server = [
//     '1.Serverga murojaat qilindi...',
//      '2.Malumot yuklanmoqda...', 
//      ];
// const data = {id: 1, name: 'SAM', status: 'active'};
//  async function information (t) {
//     return new Promise (resolve => setTimeout(resolve, t));
//  }
//  async function run () {
//    console.log(server[0]);
//    await information (2000);
//    console.log(server[1]);
//    await information (2000);
//    console.log('Malumot yuklandi:', data );
//    console.log(`${data.name}, Hush kelibsiz!`);
//  }
//  run();


// try...catch nima?
// 👉 try...catch – bu xatoliklarni (error) tutish va ularni boshqarish uchun ishlatiladi.
// Normal holatda kodda xato bo‘lsa, dastur to‘xtab qoladi. Lekin try...catch ishlatilsa, biz xatoni “ushlab” olamiz va dastur davom etadi.  
//try {
//   let b = c + 5; //  c o'zgaruvchi e'lon qilinmagan
//   console.log(b);
// } catch (error) {
//   console.log("Xatolik yuz berdi:", error.message); // bu yerda c elon qilinmagani uchun tryda xatolik yuz berdi shuning uchun catch ishladi 

// } 
// Xatolik yuz berdi: c is not defined 





//4- masala  
// quyidagi 5 ta foydalanuvchi orasidan boburbek ismli foydalanuvvchi bor bolsa uni malumotlarini chiqarsin 
// agar yoq bolsa foydalanuvchi malumotlari topilmadi deb chiqarsin 
// bor holatni ham yoq holatni ham  ishlatib koring
// async await try catchlardan foydalaning 
// server foydalanuvchi malumotlarini 1 sekunddan keyin beradi

// const users = [
//   { id: 1, name: "Ali", age: 25, city: "Tashkent" },
//   { id: 2, name: "Doston", age: 30, city: "Samarkand" },
//   { id: 3, name: "Boburbek", age: 22, city: "Busan" },
//   { id: 4, name: "Laylo", age: 28, city: "Fergana" },
//   { id: 5, name: "Nodir", age: 27, city: "Bukhara" },
// ];
// async function findUser (name, t) {
//     return new Promise ((resolve, reject) => {
//         setTimeout(() => {
//             const data = users.find(u => u.name === name);
//         if (!data){ reject (new Error ('Foydalanuvchi malumotlari topilmadi!'))
//             } else {
//             resolve(data);
//         };
    
//     }, t);
//     });
// }

// findUser("Boburbek",1000)                                
//     .then((data) => {
//         console.log("User:", data);
//         console.log(data.name, "Hush kelibsiz!");
//     })
//     .catch((err) => {                   
//                 console.log("ERROR:", err);
//     });                       



//5- masala  Promise bilan ishlash
// 0–9 oralig‘ida tasodifiy son chiqaring.
// Agar u juft bo‘lsa resolve, toq bo‘lsa reject.
// .then() va .catch() bilan natijani chiqaring. 

// function randomNumber() {
//   return new Promise((resolve, reject) => {
//     const num = Math.floor(Math.random() * 10); // 0dan 9,99gacha random; Math.floor - verguldan keyingi sonni o'chiradi
//     console.log("Random son:", num);             //ceil - yuqoriga okruglenie; round - matematika bo'yicha

//     if (num % 2 === 0) {
//       resolve(`Juftli son: ${num} (success)`);
//     } else {
//       reject(`Toq son: ${num} (error)`);
//     }
//   });
// }

// randomNumber()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });



// 6- masala 
// Bizda getUser degan funksiyamiz bor.
// Bu funksiya serverga ulanayotgandek qilib ishlaydi.
// Agar true berilsa — foydalanuvchi ma’lumotini qaytaradi.
// Agar false berilsa — xato (reject) qaytaradi.

//   bu holatni async / await va try...catch orqali hal qiling

const user = {
  id: 1,
  name: "SAM",
  status: "active",
};

async function getUser(isOk) {
  if (!isOk) {
    throw new Error("Siz so'ragan userni malumoti yo'q:");
  }
  return user;
}

async function run() {
  try {
    const data = await getUser(0); //false'ga o'zgartirsa bo'ladi
    console.log("User:", data);
    console.log(data.name, "Hush kelibsiz!");
  } catch (err) {
    console.log("ERROR:", err.message);
  }
}
run();



// 7- masala 
// Non tayyorlanmoqda ... 
// 2secunddan song 
// Tuxum qovurilmoqda ...
// Va yana 2 secunddan keyin 
// Nonushta tayyor marhamat, Yoqimli ishtaha 

// const cook = [
//   "Non tayyorlanmoqda ...",
//   "Tuxum qovurilmoqda ...",
//   "Nonushta tayyor marhamat, Yoqimli ishtaha"
// ];

// async function breakfast(t) {
//   return new Promise(resolve => setTimeout(resolve, t));
// }

// async function run() {
//   console.log(cook[0]);
//   await breakfast(2000);

//   console.log(cook[1]);
//   await breakfast(2000);

//   console.log(cook[2]);
// }
// run();

// 8- masala  7- masalaga qoshimcha shartlar berilgan  
// Non tayyorlanmoqda ... 
// 2secunddan song 
// Tuxum qovurilmoqda ...
// Va yana 2 secunddan keyin 
// Nonushta tayyor marhamat, Yoqimli ishtaha  

// huddi shu masalaga qoshimcha shart
//Tuxum bor bo‘lsa → “🍳 Tuxum qovurilmoqda...”  yani yuqoridagi jarayon davom etadi 
// Tuxum tugagan bo‘lsa → “🍓 Murabbo bilan non tayyorlanmoqda...”
// Har bosqich orasida 2 soniya kutish.
// Yakunda: “☕ Nonushta tayyor!”

// const cook = [
//   "🍞 Non tayyorlanmoqda...",
//   "🍳 Tuxum qovurilmoqda...",
//   "☕ Nonushta tayyor marhamat, Yoqimli ishtaha"
// ];

// async function breakfast(t) {
//   return new Promise(resolve => setTimeout(resolve, t));
// }

// async function run(tuxumbor) {
//   console.log(cook[0]);
//   await breakfast(2000);

//   if (tuxumbor) {  
//   console.log(cook[1]);
//   }
//   else {
//     console.log("🍓 Murabbo bilan non tayyorlanmoqda...");
// }
//     await breakfast(2000);
//     console.log(cook[2])
//   };  
// run(1);