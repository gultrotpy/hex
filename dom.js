// 練習一 利用querySelector選擇單一元素，以及用querySelectorAll選擇全部元素並變成"陣列";
// const el = document.querySelectorAll('h1');

// console.log(el);
// el[1].textContent = "888";

// for(let i=0; i<el.length; i++){
//   el[i].textContent = `querySelectorAll所取得陣列第${i}個`;
// }


// 練習二 利用setAttribute增加"標籤"的屬性，若原本以有該屬性，則會改變屬性的值。
const el = document.querySelector('h1');
el.setAttribute('href', 'http://www.google.com.tw');
// el.setAttribute('class', 'set');
// el.setAttribute('class', 'set2');

console.log(el.getAttribute('class'));
console.log(el.innerHTML);
