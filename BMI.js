const hData = document.querySelector('.hData');  //輸入高度
const wData = document.querySelector('.wData'); //輸入重量
const comp = document.querySelector('.comp'); //完成的按鈕
const list = document.querySelector('.list'); //結果出來的清單
const result = document.querySelector('.result'); //按下按鈕後會出來的結果div
const calRet = document.querySelector('.calRet'); //控制大結果的CSS用
const c_cal = document.querySelector('.c_cal'); //顯示BMI的數字
const calBtn = document.querySelector('.calBtn'); //重新計算按鈕
const index = document.querySelector('.index'); //顯示肥胖標準
const clear = document.querySelector('.clear'); //清空所有資料

let record=[];
let jsData={};
initData(); //防止重新讀取後record的陣列被重置，需要重localStorage去抓出資料。
ls();

comp.addEventListener('click',bmi_Rest,false);

calBtn.addEventListener('click',function(e){
  comp.style.display = 'block';
  result.style.display = 'none';
  index.style.display = 'none';
})

list.addEventListener('click',rm_list,false);

clear.onclick = function(){ //清除暫存資料"localStorage.clear()"
  localStorage.clear();
  location.reload()
}

function initData(){
  for (let j=0; j<localStorage.length ;j++){    
    let initData = JSON.parse(localStorage.getItem(j));
    record.push(initData)
  }
}

function ls(){  
  for (let j=0; j<localStorage.length ;j++){    
    jsData = JSON.parse(localStorage.getItem(j));
    if(jsData.count >= 35){
      resultList(`red`,j,`過度肥胖`,jsData.count,jsData.weight,jsData.height,jsData.date);
    }else if(jsData.count >=30){
      resultList(`yellow`,j,`中度肥胖`,jsData.count,jsData.weight,jsData.height,jsData.date);        
    }else if(jsData.count >= 27){
      resultList(`yellow`,j,`輕度肥胖`,jsData.count,jsData.weight,jsData.height,jsData.date);
    }else if(jsData.count >= 24){
      resultList(`orange`,j,`體重過重`,jsData.count,jsData.weight,jsData.height,jsData.date);
    }else if(jsData.count >= 18.5){
      resultList(`green`,j,`健康體位`,jsData.count,jsData.weight,jsData.height,jsData.date);
    }else{
      resultList(`blue`,j,`體重過輕`,jsData.count,jsData.weight,jsData.height,jsData.date);
    }
  }
}

function bmi_Rest(e){
  if(!(hData.value) || !(wData.value)) return;
  let count = wData.value/((hData.value /100) ** 2) ;
  count = count.toFixed(2);
  
  let str = {};
  str.height = hData.value;
  str.weight = wData.value;
  str.count = count;
  str.date = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`;
  record.push(str);

  hData.value="";
  wData.value="";

  for(let i=0; i<record.length ; i++){    
    localStorage.setItem(i,JSON.stringify(record[i]));
  }
  list.innerHTML="";
  ls();


  result.style.display = 'block'; 
  comp.style.display = 'none';
  index.style.display = 'block';
  c_cal.textContent = count;

  if (count>=35){
    recallBtn('calRet cal_red',`過度肥胖`,`red`);
  }
  else if(count>=30){
    recallBtn('calRet cal_red',`中度肥胖`,`#FF6C03`);
  }else if(count>=27){
    recallBtn('calRet cal_yellow',`輕度肥胖`,`#FF6C03`);
  }else if(count>=24){
    recallBtn('calRet cal_orange',`體重過重`,`#FF982D`);
  }else if(count>=18.5){
    recallBtn('calRet cal_green',`健康體位`,`#86D73F`);  
  }else{
    recallBtn('calRet cal_blue',`體重過輕`,`#31BAF9`);
    // calRet.setAttribute('class','calRet cal_blue')
    // index.textContent = `體重過輕`;
    // index.style.color=`#31BAF9`;
    // index.setAttribute('class','c_cal')     
  }
}

function recallBtn(calculate,state,color){
    calRet.setAttribute('class',calculate)
    index.textContent = state;
    index.style.color=color;
    index.setAttribute('class','c_cal')
    calBtn.style.background = color;
}

function resultList(color,num,station,count,weight,height,date){
  list.innerHTML +=`<li>
      <div class="${color}" ></div><em>${station}</em>
      <div><em>BMI:</em>${count}</div>
      <div><em>weight:</em>${weight}kg</div>
      <div><em>height:</em>${height}cm</div>
      <div>${date}</div>
      <input type='button' data-num="${num}" value='刪除資料'>
      </li>`;
}

function rm_list(e){
  console.log(record);
  console.log(e.target.getAttribute('data-num'));
  if (e.target.getAttribute('value')!='刪除資料') return;
  
  record.splice(e.target.getAttribute('data-num'),1);
  localStorage.clear();  
  for(let i=0; i<record.length ; i++){ 
    localStorage.setItem(i,JSON.stringify(record[i]));
  }
  list.innerHTML="";
  ls();
}

