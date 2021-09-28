const xhr = new XMLHttpRequest();

const xhr = new XMLHttpRequest();  //呼叫ajax

xhr.open('get', 'https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c', true);  //抓取資料並選擇非同步模式
xhr.send(null);  //回傳訊息為null

const list = document.getElementById('list');
const h1 = document.querySelector('.content h1');
const content_box = document.querySelector('.content_box');
const pageNum = document.querySelector('.pageNum');

let allData=[];
let areaData=[];

xhr.onload = function(){
  allData = JSON.parse(xhr.responseText);
  allData = allData.data.XML_Head.Infos.Info;
  updateZone();
  menu.addEventListener('change', change_ZoneData);
}


let checkPage =1;
let newAeraData = [];
let presentNum = 6;
let lastData =[];

// 實施分頁按鈕的功能
pagelist.addEventListener('click',function(e){
  if (e.target.nodeName != 'INPUT') return;
  content_list.innerHTML = '';

  if (checkPage < Math.ceil(areaData.length / presentNum)){
    console.log('1');
    // if (e.target.value >=1){
    checkPage = e.target.value;
    let i = parseInt((checkPage - 1) * presentNum);
    let iLen = i + presentNum;
    for (i; i < iLen; i++) {
      newAeraData.push(areaData[i])
      listData(i);
    }
  }else if (checkPage == Math.ceil(areaData.length / presentNum)){
    console.log('3');
    checkPage = e.target.value; 
    lastData = Array.from(areaData);
    lastData.splice(0, ((checkPage - 1) * presentNum));
    lastData.forEach((item)=>{
      content_list.innerHTML += `<div class="travelBox">
        <img src="${item.Picture1}" alt="">
        <p class="name">${item.Name}</p>
        <p class="zone">${item.Zone}</p>
        <ul>
          <li><img src="image/icons_clock.png" alt="">${item.Opentime}</li>
          <li><img src="image/icons_pin.png" alt="">${item.Add}</li>
          <li><img src="image/icons_phone.png" alt="">${item.Tel}</li>
        </ul>
      </div>`;
    }
  )}
})

//抓出每一個區的資料放入陣列中，若是大於6則新增分頁按鈕;
function change_ZoneData(e){
  h1.textContent = menu.value;
  content_list.innerHTML = '';
  pagelist.innerHTML = '';
  areaData = [];

  //與選定區域名稱相同的資料放入陣列areaData中;
  allData.forEach(function (i, index, arr) {
    if (i.Zone == menu.value) {
      areaData.push(i);
    }
  })

  //若是資料長度大於6，則會新增分頁(分頁數量取除以呈現數量後無條件進位)
  if (areaData.length > presentNum) {
    for (let i = 0; i < presentNum; i++) {
      listData(i)
    }
    for (let j = 1; j <= Math.ceil(areaData.length / presentNum); j++) {
      pagelist.innerHTML += `<input type="button" value="${j}">`
    };
      // pagelist.innerHTML += `<input type="button" value="Next">`
  } else {
    for (let i = 0; i < areaData.length; i++) {
      listData(i);
    }
  }
}

function updateZone() {
  // 先抓出全部資料各自的行政區
  for (var i = 0; i < allData.length; i++) {
    allData[i].Zone = allData[i].Add.substr(6, 3);
  }
  console.log('讀取完畢');
}

function listData(str){
  content_list.innerHTML += `<div class="travelBox">
          <img src="${areaData[str].Picture1}" alt="">
          <p class="name">${areaData[str].Name}</p>
          <p class="zone">${areaData[str].Zone}</p>
          <ul>
            <li><img src="image/icons_clock.png" alt="">${areaData[str].Opentime}</li>
            <li><img src="image/icons_pin.png" alt="">${areaData[str].Add}</li>
            <li><img src="image/icons_phone.png" alt="">${areaData[str].Tel}</li>
          </ul>
        </div>`;
}

