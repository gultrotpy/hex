const hData = document.querySelector('.hData');
const wData = document.querySelector('.wData');
const comp = document.querySelector('.comp');
const list = document.querySelector('.list');

let record=[];
let minute=``;
ls();

comp.addEventListener('click',bmiRes,false);

function bmiRes(e){
  let high =(hData.value /100) ** 2;
  let wei = wData.value;
  let count = wei / high;
  count = count.toFixed(2);
  let str = {};
  str.height = hData.value;
  str.weight = wData.value;
  str.count = count;
  record.push(str)
  console.log(record);
  if (count >=35){
    console.log(count,'重度肥胖');
    list.innerHTML +=`<li>
      <div class="red"></div><em>過度肥胖</em>
      <div><em>BMI:</em>${count}</div>
      <div><em>weight:</em>${wData.value}kg</div>
      <div><em>height:</em>${hData.value}cm</div>
      </li>`;
  }else if(count >=30){
    list.innerHTML +=`<li>
      <div class="yellow"></div><em>中度肥胖</em>
      <div><em>BMI:</em>${count}</div>
      <div><em>weight:</em>${wData.value}kg</div>
      <div><em>height:</em>${hData.value}cm</div>
    </li>`;
  }else if(count >= 27){
    // console.log(count,'輕度肥胖');
    list.innerHTML +=`<li>
      <div class="oragne"></div><em>輕度肥胖</em>
      <div><em>BMI:</em>${count}</div>
      <div><em>weight:</em>${wData.value}kg</div>
      <div><em>height:</em>${hData.value}cm</div>
    </li>`;
  }else if(count >=24 ){
    // console.log(count,'過重');
    list.innerHTML +=`<li>
      <div class="oragne"></div><em>體重過重</em>
      <div><em>BMI:</em>${count}</div>
      <div><em>weight:</em>${wData.value}kg</div>
      <div><em>height:</em>${hData.value}cm</div>
    </li>`;
  }else if(count >= 18.5){
    // console.log(count,'健康體位');
    list.innerHTML +=`<li>
      <div class="green"></div><em>健康體位</em>
      <div><em>BMI:</em>${count}</div>
      <div><em>weight:</em>${wData.value}kg</div>
      <div><em>height:</em>${hData.value}cm</div>
    </li>`;
  }else{
    // console.log(count,'體重過輕');
    list.innerHTML +=`<li>
    <div class="blue"></div><em>體重過輕</em>
    <div><em>BMI:</em>${count}</div>
    <div><em>weight:</em>${wData.value}kg</div>
    <div><em>height:</em>${localStorage.getItem(weight)}}cm</div>
  </li>`;
  }

  for(let i=0; i<record.length ; i++){    
    localStorage.setItem(i,JSON.stringify(record[i]));
  }
  ls();
}

//清除暫存資料"localStorage.clear()"

function ls(){
  for (let j=0; j<localStorage.length ;j++){    
    let ss = JSON.parse(localStorage.getItem(j));
    if(ss.count >= 35){
      list.innerHTML +=`<li>
      <div class="red"></div><em>過度肥胖</em>
      <div><em>BMI:</em>${ss.count}</div>
      <div><em>weight:</em>${ss.weight}kg</div>
      <div><em>height:</em>${ss.height}cm</div>
      </li>`;
    }
  }
}