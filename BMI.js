const hData = document.querySelector('.hData');
const wData = document.querySelector('.wData');
const comp = document.querySelector('.comp');
const list = document.querySelector('.list');
const result = document.querySelector('.result');
const calRet = document.querySelector('.calRet');
const calBtn = document.querySelector('.calBtn');
const c_cal = document.querySelector('.c_cal');
const index = document.querySelector('.index');
const clear = document.querySelector('.clear');


let record=[];
let minute=``;
initData();
ls();


comp.addEventListener('click',bmiRest,false);

calBtn.addEventListener('click',function(e){
  comp.style.display = 'block';
  result.style.display = 'none';
  index.style.display = 'none';
})

function bmiRest(e){
  if(!(hData.value) || !(wData.value)) return;
  let count = wData.value/((hData.value /100) ** 2) ;
  // let wei = wData.value;
  // let count = wei / high;
  count = count.toFixed(2);
  let str = {};
  str.height = hData.value;
  str.weight = wData.value;
  str.count = count;
  record.push(str);
  hData.value="";
  wData.value=""
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
    // calRet.style.border=`6px solid red`;
    // calRet.style.color=`red`;
    calRet.setAttribute('class','calRet cal_red')
    index.textContent = `過度肥胖`;
    index.style.color=`red`;
    index.setAttribute('class','c_cal')
  }
  else if(count>=30){
    calRet.setAttribute('class','calRet cal_red')
    index.textContent = `中度肥胖`;
    index.style.color=`#FF6C03`;
    index.setAttribute('class','c_cal')
  }else if(count>=27){
    calRet.setAttribute('class','calRet cal_yellow')
    index.textContent = `輕度肥胖`;
    index.style.color=`#FF6C03`;
    index.setAttribute('class','c_cal')
  }else if(count>=24){
    calRet.setAttribute('class','calRet cal_orange')
    index.textContent = `體重過重`;
    index.style.color=`#FF982D`;
    index.setAttribute('class','c_cal')
  }else if(count>=18.5){
    calRet.setAttribute('class','calRet cal_green')
    index.textContent = `健康體位`;
    index.style.color=`#86D73F`;
    index.setAttribute('class','c_cal')   
  }else{
    calRet.setAttribute('class','calRet cal_blue')
    index.textContent = `體重過輕`;
    index.style.color=`#31BAF9`;
    index.setAttribute('class','c_cal')     
  }
}

//清除暫存資料"localStorage.clear()"

function ls(){
  for (let j=0; j<localStorage.length ;j++){    
    let jsData = JSON.parse(localStorage.getItem(j));
    if(jsData.count >= 35){
      list.innerHTML +=`<li>
      <div class="red"></div><em>過度肥胖</em>
      <div><em>BMI:</em>${jsData.count}</div>
      <div><em>weight:</em>${jsData.weight}kg</div>
      <div><em>height:</em>${jsData.height}cm</div>
      </li>`;
    }else if(jsData.count >=30){
      list.innerHTML +=`<li>
        <div class="yellow"></div><em>中度肥胖</em>
        <div><em>BMI:</em>${jsData.count}</div>
      <div><em>weight:</em>${jsData.weight}kg</div>
      <div><em>height:</em>${jsData.height}cm</div>
      </li>`;
    }else if(jsData.count >= 27){
      list.innerHTML +=`<li>
        <div class="yellow"></div><em>輕度肥胖</em>
        <div><em>BMI:</em>${jsData.count}</div>
        <div><em>weight:</em>${jsData.weight}kg</div>
        <div><em>height:</em>${jsData.height}cm</div>
      </li>`;
    }else if(jsData.count >= 24){
      list.innerHTML +=`<li>
        <div class="oragne"></div><em>體重過重</em>
        <div><em>BMI:</em>${jsData.count}</div>
        <div><em>weight:</em>${jsData.weight}kg</div>
        <div><em>height:</em>${jsData.height}cm</div>
      </li>`;
    }else if(jsData.count >= 18.5){
      list.innerHTML +=`<li>
        <div class="green"></div><em>健康體位</em>
        <div><em>BMI:</em>${jsData.count}</div>
        <div><em>weight:</em>${jsData.weight}kg</div>
        <div><em>height:</em>${jsData.height}cm</div>
      </li>`;
    }else{
      list.innerHTML +=`<li>
      <div class="blue"></div><em>體重過輕</em>
      <div><em>BMI:</em>${jsData.count}</div>
      <div><em>weight:</em>${jsData.weight}kg</div>
      <div><em>height:</em>${jsData.height}cm</div>
    </li>`;
    }
  }
}

function initData(){
  for (let j=0; j<localStorage.length ;j++){    
    let initData = JSON.parse(localStorage.getItem(j));
    record.push(initData)
  }
}

clear.onclick = function(){
  localStorage.clear();
  location.reload()
}

