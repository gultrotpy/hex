// //innerHTML練習 直接修改內容
// const el = document.querySelector('h1');

// el.innerHTML= `<a href="#"> link</a>`;


// //使用createElement、appendChild 去新增
// const str =document.createElement('em');

// document.querySelector('.title2').appendChild(str);

// str.innerHTML = `<a href="#">efgh</a>`;

// str.setAttribute('class','style');

const calBtn = document.querySelector('.calBtn');
const hamNum = document.querySelector('.hamNum');
const cockNum = document.querySelector('.cockNum');
const list = document.querySelector('.list');
const total = document.createElement('li');  //用createElement來創造HTML標籤


calBtn.onclick = function(){
  total.innerHTML += `<li>您點${hamNum.value}個漢堡，您點${cockNum.value}杯可樂，總共是${parseInt(hamNum.value) * 30 + parseInt(cockNum.value) * 20}元</li>`;
  total.setAttribute('class','blue');
  list.appendChild(total);
  hamNum.value="";
  cockNum.value="";
}
