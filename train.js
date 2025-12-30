console.log('A-TASK ishga tushdi!')
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
function countLetter (harf, soz) {
    harf = harf.toLowerCase();
    soz = soz.toLowerCase();
    soz = soz.split("");
    return soz.reduce((total, i) => {
        return i === harf ? total + 1 : total
}, 0);
}
const harf = "A";
const soz = "Asadbek";
const result = countLetter(harf, soz);
console.log(`'${soz}' so'zni ichida '${result}'ta '${harf}' harfi bor!`);
