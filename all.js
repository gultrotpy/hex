const xhr = new XMLHttpRequest();

xhr.open('get','https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c',true);
xhr.send(null);

let allData=[];
let allDataDis=[];
let tevalData={};

xhr.onload = function(){
  let jsonObj = JSON.parse(xhr.responseText);
  allData = jsonObj.data.XML_Head.Infos.Info;
  updateMenu();
}

function updateMenu() {
  // 先抓出全部的 Zone
  for (var i = 0; i < allData.length; i++) {
    allData[i].Zone = allData[i].Add.substr(6, 3);
    allDataDis.push(allData[i].Zone);
  }
  // console.log(allDataDis);
  console.log(allData);
}


const menu = document.getElementById('menu');
const h1 = document.querySelector('.content h1');
const content_list = document.querySelector('.content_list');


menu.addEventListener('change',function(e){
  h1.textContent = menu.value;
  
  allData.forEach(function(i,index,arr){
    if (i.Zone == menu.value){
      content_list.innerHTML='';
      console.log(i.Name);
      for (let j=0; j<2 ; j++){
      content_list.innerHTML += `<div class="travelBox">
          <img src="https://khh.travel/image/1654/640x480" alt="">
          <p class="name">${i.Name}</p>
          <p class="zone">三民區</p>
          <ul>
            <li><img src="image/icons_clock.png" alt="">週二至週日10:00-18:00，每週一公休</li>
            <li><img src="image/icons_pin.png" alt="">高雄市三民區建國二路318號</li>
            <li><img src="image/icons_phone.png" alt="">886-7-2363357</li>
          </ul>
        </div>`
      }
    }
  })

  // if (menu.value == allDataDis.zone)
})


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