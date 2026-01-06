// console.log('D-TASK ishga tushdi!')
/*
D-TASK
Shunday class tuzing tuzing nomi Shop, va uni constructoriga 3 hil mahsulot pass bolsin, hamda classning 3ta methodi bolsin,
biri qoldiq, biri sotish va biri qabul. Har bir method ishga tushgan vaqt ham log qilinsin. 
MASALAN: const shop = new Shop(4, 5, 2); shop.qoldiq() return hozir 20:40da 4ta non, 5ta lagmon va 2ta cola mavjud!
shop.sotish('non', 3) & shop.qabul('cola', 4) & shop.qoldiq() return hozir 20:50da 1ta non, 5ta lagmon va 6ta cola mavjud!
*/
class Shop {
    //state - shart emas yozish
    #non;
    #ayron;
    #lagmon;

    //constructor
    constructor (non, ayron, lagmon ) {
        this.#non = non;
        this.#ayron = ayron;
        this.#lagmon = lagmon;
    }
    //Method
    time() {
        return new Date().toLocaleTimeString();
    }
    qoldiq() {
        console.log(`Hozirgi vaqt:${this.time()}. 
        Non ${this.#non}ta, ayron ${this.#ayron}ta va lagmon ${this.#lagmon}ta mavjud!`);
    }
    sotish(product, amount) {
        product = product.toLowerCase();
        if (typeof amount !== 'number' || amount <= 0) {
            console.log("Noto‘g‘ri miqdor");
            return;
        }
        if (product === 'non') {
            if (this.#non < amount) {
            console.log("Yetarli mahsulot yo‘q");
            return;
            }
            this.#non -= amount;
        }
        else if (product === 'ayron') {
            if (this.#ayron < amount) {
            console.log("Yetarli mahsulot yo‘q");
            return;
            }
            this.#ayron -= amount; 
        } 
        else if (product === 'lagmon') {
            if (this.#lagmon < amount) {
            console.log("Yetarli mahsulot yo‘q");
            return;
            }
            this.#lagmon -= amount;
        }
        else {
            console.log("Bu mahsulot mavjud emas!");
            return;
        } 
        console.log(`Hozirgi vaqt:${this.time()}. 
        ${product} ${amount}ta sotildi!`);
    }

    qabul(product, amount) {
        product = product.toLowerCase();
         if (typeof amount !== 'number' || amount <= 0) {
            console.log("Noto‘g‘ri miqdor");
            return;
        }
        if (product === 'non') {
            this.#non += amount;
        }
        else if (product === 'ayron') {
            this.#ayron += amount; 
        } 
        else if (product === 'lagmon') {
            this.#lagmon += amount;
        }
        else {
            console.log("Bu mahsulot mavjud emas!"); 
            return;   
        } 
        console.log(`Hozirgi vaqt:${this.time()}. 
        ${product} ${amount}ta qabul qilindi!`);
    } 
}
const shop = new Shop (4, 5, 2);
shop.qoldiq();
shop.sotish('Ayron', 5);
shop.qabul('Lagmon', 6);
shop.qabul('Jentra', 5);
shop.sotish('ayron', -100);
shop.qoldiq();
// console.log('C-TASK ishga tushdi!')
/*C-TASK:Shunday function tuzing, u 2ta string parametr ega bolsin, hamda agar har ikkala string
bir hil harflardan iborat bolsa true aks holda false qaytarsin. MASALAN checkContent("mitgroup", "gmtiprou")
return qiladi true. */

// function twoWords (word1, word2) {
//     if (word1.length !== word2.length) return false;
//     word1 = word1.toLowerCase();
//     word2 = word2.toLowerCase();
//     const sorted1 = word1.split("").sort().join(""); //split - array qiladi; sort - sortirovka; 
//     const sorted2 = word2.split("").sort().join(""); //join - arrayni string qiladi.
//     return sorted1 === sorted2;
// }
// console.log(`Birhil harflardan iborat bo'lsa true, aksincha false. Javob: ${twoWords ("Mitgroup", "gmtiprou")}`);


// console.log('B-TASK ishga tushdi!')
/*B-TASK: 
Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan 
raqamlarni sonini bizga return qilsin. MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return 
qiladi.\n\n@MITASK*/

// function countDigits (enter) {
//     let countNumber = 0;
//     for (let i = 0; i < enter.length; i++) {
//         if (enter[i] >= '0' && enter[i] <= '9') {
//             countNumber++;
//         }
//     }
//     return countNumber;
// }
// console.log(`String ichida number soni: ${countDigits("o777oo02")} dona`);


// console.log('A-TASK ishga tushdi!')
/*A-TASK: 
Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi letterni ikkinchi parametrdagi sozdan
 qatnashga sonini return qilishi kerak boladi.
MASALAN countLetter("e", "engineer") 3ni return qiladi.*/

//1-chi usul: for orqali
// function countLetter (harf, soz) {
//     let harfsoni = 0;
//     harf = harf.toLowerCase();
//     soz = soz.toLowerCase();
//     for (let i = 0; i < soz.length; i++) {
//        if (soz[i]===harf){
//             harfsoni++;
//        }
//     }
//     return harfsoni;
// }

// const harf = "A";
// const soz = "fsAdaaf";
// const result = countLetter(harf, soz);
// console.log(`'${soz}' so'zni ichida '${result}'ta '${harf}' harfi bor!`);

//2-chi usul: reduce orqali.
// function countLetter (harf, soz) {
//     harf = harf.toLowerCase();
//     soz = soz.toLowerCase();
//     soz = soz.split("");
//     return soz.reduce((total, i) => {
//         return i === harf ? total + 1 : total
// }, 0);
// }
// const harf = "A";
// const soz = "Asadbek";
// const result = countLetter(harf, soz);
// console.log(`'${soz}' so'zni ichida '${result}'ta '${harf}' harfi bor!`);
