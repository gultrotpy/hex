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

  areaList();
  areaData = allData;
  areaLen = areaData.length;
  totalPage = Math.ceil(areaLen / prepage);

  if (areaLen <= prepage) {
    displayData(areaData);
  } else {
    let pickData = Array.from(areaData); //複製一個跟areaData不同址的陣列，取名為pickData
    // pickData.copyWithin(0, (nowPage * prepage) - 6, (nowPage * prepage));  //
    pickData.splice(6, areaLen);
    displayData(pickData);
    initPageNum()
  }
  nowPage = 1;
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

  
  //要是抓出來的資料長度小於等於呈現資料數 (即該地區的觀光景點小於6個)，直接將陣列帶入並展示資料
  if (areaLen <= prepage){  
    displayData(areaData);
    //反之則先抓出前六筆資料印出去    
  }else{
    // let pickData=Array.from(areaData); //複製同一個陣列並
    // pickData.copyWithin(0, (nowPage * prepage) - 6, (nowPage * prepage));  //將選擇的範圍放到前位置0~5
    // pickData.splice(6, areaLen); //將包括位置6之後的資料都刪除
    let pickData =[];
    pickData = areaData.slice(0,6)
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
  h1.textContent = e.target.value;
  pageNum.innerHTML = ``;

  list.value = e.target.value; //點了之後動態更改選單的區域

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

//製作分業、上一頁跟下一頁的功能
function pre_nxt(nowPage){
  if (nowPage == totalPage) {
    // let lastpage = Array.from(areaData);
    // lastpage.splice(0, (nowPage - 1) * prepage);
    let lastpage =[];
    lastpage = areaData.slice(((nowPage-1) * prepage))     //1(0,6)、2(6，12)、3(12,18)
    displayData(lastpage);
  } else if (nowPage < totalPage && nowPage >0) {
    // let pickData = Array.from(areaData);
    // pickData.copyWithin(0, (nowPage * prepage) - 6, (nowPage * prepage));  //複製同一個陣列的某個值，並可以選定範圍
    // pickData.splice(6, areaLen);
    let pickData =[];
    pickData = areaData.slice(((nowPage - 1) * prepage), ((nowPage) * prepage))
    displayData(pickData);
  }
}

//動態新增選單中的區域，利用indexOf去比對區域，將包含的區放入陣列area中，在用innerHTML去動態新增
function areaList() {
  let areaList = [];
  for (let i = 0; i < allData.length; i++) {
    areaList.push(allData[i].Zone);
  }

  let area = [];
  areaList.forEach(function (value) {
    if (area.indexOf(value) == -1) {
      area.push(value);
    }
  })

  area.forEach(function (value) {
    list.innerHTML += `<option value="${value}">${value}</option>`;
  })

}