const xhr = new XMLHttpRequest();

xhr.open('get','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c',true);
xhr.send(null);

const menu = document.getElementById('menu');
const h1 = document.querySelector('.content h1');
const content_list = document.querySelector('.content_list');
const test = document.querySelector('.test');
const page = document.querySelector('.page');

let allData=[];
let allDataDis=[];
let tevalData={};
let pageCount=0;

xhr.onload = function(){
  let jsonObj = JSON.parse(xhr.responseText);
  allData = jsonObj.data.XML_Head.Infos.Info;
  updateMenu();
}

menu.addEventListener('change',function(e){
  h1.textContent = menu.value;
  content_list.innerHTML='';
  page.innerHTML='';

  // 用for寫
  for (let i=0; i<allData.length; i++){
    if (allData[i].Zone == menu.value){ 
      pageCount +=1; 
    }
  }

  console.log(pageCount);

  if (pageCount > 8){
    for (let i=0; i<allData.length; i++){
      if (allData[i].Zone == menu.value){ 
        listData(allData[i].Picture1,allData[i].Name,allData[i].Zone,allData[i].Opentime,allData[i].Add,allData[i].Tel)
      }
    };

    for( let j=1; j<=Math.ceil(pageCount/8) ;j++){
      page.innerHTML+=`<li><input type="button" value="${j}""></li>`
    };
  }else{
    for (let i=0; i<allData.length; i++){
      if (allData[i].Zone == menu.value){ 
        listData(allData[i].Picture1,allData[i].Name,allData[i].Zone,allData[i].Opentime,allData[i].Add,allData[i].Tel)
      }
    }
  }
  // pageCount=0;  
})

function updateMenu() {
  // 先抓出全部的 Zone
  for (var i = 0; i < allData.length; i++) {
    allData[i].Zone = allData[i].Add.substr(6, 3);
    allDataDis.push(allData[i].Zone);
  }
  console.log('讀取完畢');
}

function listData(Picture1,Name,Zone,Opentime,Add,Tel){
  content_list.innerHTML += `<div class="travelBox">
          <img src="${Picture1}" alt="">
          <p class="name">${Name}</p>
          <p class="zone">${Zone}</p>
          <ul>
            <li><img src="image/icons_clock.png" alt="">${Opentime}</li>
            <li><img src="image/icons_pin.png" alt="">${Add}</li>
            <li><img src="image/icons_phone.png" alt="">${Tel}</li>
          </ul>
        </div>`;
}



// // console.log(str);
// var result = new Set();
// var repeat = new Set();
// origin.forEach(item => {
//   result.has(item) ? repeat.add(item) : result.add(item);
// })  
// //new Set是一個物件，放進去就會幫我們決定會不會重複。
// console.log(result); // {1, 2, "a", 3, "b"}
// console.log(repeat); // {1, "a"}
// menu.addEventListener('change',function(e){
// })

// allData.forEach(function(i,index,arr){
//   if (i.Zone == menu.value){
//     pageCount +=1;
//     listData(i.Picture1,i.Name,i.Zone,i.Opentime,i.Add,i.Tel)    
//   }
// })