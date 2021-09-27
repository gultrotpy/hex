const xhr = new XMLHttpRequest();  //呼叫ajax

xhr.open('get', 'https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c', true);  //抓取資料並選擇非同步模式
xhr.send(null);  //回傳訊息為null

const list= document.getElementById('list');
const h1 = document.querySelector('.content h1');
const content_box = document.querySelector('.content_box');
const pageNum = document.querySelector('.pageNum');
const hotBtn = document.querySelector('.hotBtn');

let allData={}; //放進抓取出來得資料並物件化;
let areaData=[];
let nowPage = 1;
let totalPage; 
let areaLen;
const prepage = 6;   //每一頁呈現六筆資料

//讀取完成後，放進抓取出來得資料並物件化;
xhr.onload = function () {
  allData = JSON.parse(xhr.responseText);
  allData = allData.data.XML_Head.Infos.Info;//此時物件中每筆資料的zone是空值，不利我們做選單進行分類
  updateZone(); //對Add字串進行處理抓出行政區然後放回去。
}

//製作景點內容，利用監聽的方式，但要先抓出同一個地區的資料
list.addEventListener('change',function(e){
  pageNum.innerHTML = ``;
  h1.textContent = list.value;

  //抓出選擇的區域資料
  areaData = [];
  allData.forEach(function (i, index, arr) {
    if (i.Zone == list.value) {
      areaData.push(i);
    }
  })

  areaLen = areaData.length;    //抓出來後的資料長度
  totalPage = Math.ceil(areaLen / prepage);   //無條件進位取整數

  
  if (areaLen <= prepage){
    displayData(areaData);    
  }else{
    let pickData=Array.from(areaData);
    pickData.copyWithin(0, (nowPage * prepage) - 6, (nowPage * prepage));
    pickData.splice(6, areaLen);
    displayData(pickData);
    initPageNum()
  }
  nowPage = 1;
})    

// 監聽分頁按鈕，把範圍內資料print出來
pageNum.addEventListener('click',function(e){
  if (e.target.nodeName != 'INPUT') return;

  if (e.target.value == 'Next'){
    nowPage += 1;
    pre_nxt(nowPage);
  } else if (e.target.value == 'Previous'){
    nowPage -= 1;
    pre_nxt(nowPage);
  }else{
    
    nowPage = e.target.value
    pre_nxt(nowPage);
  }

  if (nowPage < 1) {
    nowPage = 1;
  }else if(nowPage >totalPage){
    nowPage = totalPage;
  }
})

hotBtn.addEventListener('click',function(e){
  if (e.target.nodeName != 'INPUT') return;

  pageNum.innerHTML = ``;
  h1.textContent = list.value;

  //抓出選擇的區域資料
  areaData = [];
  allData.forEach(function (i, index, arr) {
    if (i.Zone == e.target.value) {
      areaData.push(i);
    }
  })

  areaLen = areaData.length;    //抓出來後的資料長度
  totalPage = Math.ceil(areaLen / prepage);   //無條件進位取整數


  if (areaLen <= prepage) {
    displayData(areaData);
  } else {
    let pickData = Array.from(areaData);
    pickData.copyWithin(0, (nowPage * prepage) - 6, (nowPage * prepage));
    pickData.splice(6, areaLen);
    displayData(pickData);
    initPageNum()
  }
  nowPage = 1;

})

//更新抓下來的資料區域，利用了substr抓取字串中固定的範圍的內容
function updateZone() {
  //原為for寫法，新版更改為foreach寫法並使用箭頭函式
  allData.forEach((i)=>{
    i.Zone = i.Add.substr(6, 3);
  })
  console.log('讀取完畢');
}

//將陣列船進去並使用forEach把每一筆陣列都innerHTML到顯示的畫面上
function displayData(arr) {
  content_box.innerHTML =``;
  arr.forEach((i) => {
    content_box.innerHTML += `<div class="travelBox">
        <img src="${i.Picture1}" alt="">
        <p class="name">${i.Name}</p>
        <p class="zone">${i.Zone}</p>
        <ul>
          <li><img src="image/icons_clock.png" alt="">${i.Opentime}</li>
          <li><img src="image/icons_pin.png" alt="">${i.Add}</li>
          <li><img src="image/icons_phone.png" alt="">${i.Tel}</li>
        </ul>
      </div>`;
  })
}

//如果資料筆數大於6,則會依製作出分頁數量
function initPageNum(){
  pageNum.innerHTML = ``;
  pageNum.innerHTML += `<input type="button" value="Previous">`
  for (let j = 1; j <= totalPage; j++) {
    pageNum.innerHTML += `<input type="button" value="${j}">`
  }
  pageNum.innerHTML += `<input type="button" value="Next">`
}

function pre_nxt(nowPage){
  if (nowPage == totalPage) {
    let lastData = Array.from(areaData);
    lastData.splice(0, (nowPage - 1) * prepage);
    displayData(lastData);
  } else if (nowPage < totalPage && nowPage >0) {
    let pickData = Array.from(areaData);
    pickData.copyWithin(0, (nowPage * prepage) - 6, (nowPage * prepage));
    pickData.splice(6, areaLen);
    displayData(pickData);
  }
}