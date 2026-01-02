console.log('C-TASK ishga tushdi!')
/*C-TASK:Shunday function tuzing, u 2ta string parametr ega bolsin, hamda agar har ikkala string
bir hil harflardan iborat bolsa true aks holda false qaytarsin. MASALAN checkContent("mitgroup", "gmtiprou")
return qiladi true. */

function twoWords (word1, word2) {
    if (word1.length !== word2.length) return false;
    word1 = word1.toLowerCase();
    word2 = word2.toLowerCase();
    const sorted1 = word1.split("").sort().join(""); //split - array qiladi; sort - sortirovka; 
    const sorted2 = word2.split("").sort().join(""); //join - arrayni string qiladi.
    return sorted1 === sorted2;
}
console.log(`Birhil harflardan iborat bo'lsa true, aksincha false. Javob: ${twoWords ("Mitgroup", "gmtiprou")}`);


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
