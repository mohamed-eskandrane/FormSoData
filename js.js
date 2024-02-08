const sheetId = '1UOCYdfBFwC7CnN8Djy4aiqJhAoSYTeuRkwQz7PT4HKI';
const Script = 'https://script.google.com/macros/s/AKfycbwaELoNo63FGu5ZKofFP_mYfC9TRO-yNEuHRhnZiEafHRe-oa0bNoRQvg-vKb_ObHJ2/exec'
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
let query = encodeURIComponent('Select *');
let Users="Users";
let UrlUsers = `${base}&sheet=${Users}&tq=${query}`;
let DataUsers = [];
let Accounts="Customers";
let UrlAccounts = `${base}&sheet=${Accounts}&tq=${query}`;
let DataCustomers = [];
let Mats="Mats";
let UrlMat = `${base}&sheet=${Mats}&tq=${query}`;
let DataMat = [];
let Purchases="Purchases";
let UrlPurchases = `${base}&sheet=${Purchases}&tq=${query}`;
let Datapurchases = [];
let MoveV="MoveV";
let UrlMove = `${base}&sheet=${MoveV}&tq=${query}`;
let DataMove = [];
document.addEventListener('DOMContentLoaded', init)
function init() {
    let Loading=document.getElementById("LoadingFormBrowser");
    let FormLoad=document.getElementById("FormLoad");
    Loading.className="fa fa-refresh fa-spin";
    ConvertMode();
    LoadUsers();
    const myTimeout = setTimeout(function(){ 
      FormLoad.style.display="none";
      Loading.className="fa fa-refresh";
    clearTimeout(myTimeout);
    }, 2500);
  if (typeof(Storage) !== "undefined") {
    if( localStorage.getItem("PassWord")!=null){
      document.getElementById("User_PassWord").value=localStorage.getItem("PassWord");
    }
    if( localStorage.getItem("User_Index")!=null){
      ShowSelectForm(localStorage.getItem("ActiveForm"));
      if(localStorage.getItem("ActiveForm")=="purchasesWi"){
        LoadpurchasesWi();
      }
      if(localStorage.getItem("ActiveForm")=="purchasesBrowser"){
        LoadpurchasesBrowser();
      }
      document.getElementById("Myusername").value=localStorage.getItem("User_Name");
    }
  }
}

function ShowSelectForm(ActiveForm){
  document.getElementById("loginPage").style.display="none";
  document.getElementById("Main").style.display="none";
  document.getElementById("purchasesWi").style.display="none";
  document.getElementById("purchasesBrowser").style.display="none";
  document.getElementById(ActiveForm).style.display="flex";
  localStorage.setItem("ActiveForm",ActiveForm)
}


// *************************************Main**************

function ShowpurchasesBrowser(){
  ShowSelectForm("purchasesBrowser");
  LoadpurchasesBrowser();
}

function ShowpurchasesWi(){
  ShowSelectForm("purchasesWi");
  ClearItemP();
  LoadpurchasesWi();
}

function SignOutUser(){
  localStorage.removeItem("User_Index");
  localStorage.removeItem("User_Name");
  localStorage.removeItem("UserCode");
  document.getElementById('Myusername').value="";
  ShowSelectForm("loginPage");
}
function GoToMain(){
  ShowSelectForm("Main");
}
// **********************Loading*****************
function LoadUsers(){
  DataUsers=[];
  fetch(UrlUsers)
  .then(res => res.text())
  .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser = [];
      jsonData.table.cols.forEach((heading) => {
          if (heading.label) {
              let columnUser = heading.label;
              colzUser.push(columnUser);
          }
      })
      jsonData.table.rows.forEach((rowData) => {
          const rowUser = {};
          colzUser.forEach((ele, ind) => {
              rowUser[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
          })
          DataUsers.push(rowUser);
      })
  })
}

function LoadCustomers(){
  DataCustomers=[];
  fetch(UrlAccounts)
  .then(res => res.text())
  .then(rep => {
      const jsonData1 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzCustomers = [];
      jsonData1.table.cols.forEach((heading1) => {
          if (heading1.label) {
              let columnCustomers = heading1.label;
              colzCustomers.push(columnCustomers);
          }
      })
      jsonData1.table.rows.forEach((rowData1) => {
          const rowCustomers = {};
          colzCustomers.forEach((ele, ind) => {
              rowCustomers[ele] = (rowData1.c[ind] != null) ? rowData1.c[ind].v : '';
          })
          DataCustomers.push(rowCustomers);
      })
      LoadCustomerName()
  })
}

function LoadCustomerName(){
  let CustomerName,AccountNum;
  let optionClass;
  let ListCustomers =document.getElementById("SupllierNameList");
  ListCustomers.innerHTML="";
  for (let index = 0; index < DataCustomers.length; index++) {
    AccountNum=DataCustomers[index].AccountNum
    CustomerName=DataCustomers[index].CustomerName
    if(AccountNum!=""){
      optionClass=document.createElement("option");
      optionClass.value=CustomerName;
      optionClass.textContent=CustomerName;
      ListCustomers.appendChild(optionClass);
    }
  }
}

function GetCustomerCode(Cname){
  let CustomerName;
  let SupllierCode =document.getElementById("SupllierCode");
  for (let index = 0; index < DataCustomers.length; index++) {
    CustomerName=DataCustomers[index].CustomerName;
    if(CustomerName==Cname){
      SupllierCode.value=DataCustomers[index].AutoCode;
      return;
    }
  }
  SupllierCode.value="";
}

function GetCustomerName(Ccode){
  console.log(DataCustomers)
  let AutoCode;
  for (let index = 0; index < DataCustomers.length; index++) {
    AutoCode=DataCustomers[index].AutoCode;
    if(AutoCode==Ccode){
      return DataCustomers[index].CustomerName;
    }
  }
  return -1
}

function LoadMat(){
  DataMat=[];
  fetch(UrlMat)
  .then(res => res.text())
  .then(rep => {
      const jsonData3 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzMat = [];
      jsonData3.table.cols.forEach((heading3) => {
          if (heading3.label) {
              let columnMat = heading3.label;
              colzMat.push(columnMat);
          }
      })
      jsonData3.table.rows.forEach((rowData3) => {
          const rowMat = {};
          colzMat.forEach((ele, ind) => {
              rowMat[ele] = (rowData3.c[ind] != null) ? rowData3.c[ind].v : '';
          })
          DataMat.push(rowMat);
      })
  })
}

function LoadMove(){
  DataMove=[];
  fetch(UrlMove)
  .then(res => res.text())
  .then(rep => {
      const jsonData4 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzMove = [];
      jsonData4.table.cols.forEach((headingMove) => {
          if (headingMove.label) {
              let columnMove = headingMove.label;
              colzMove.push(columnMove);
          }
      })
      jsonData4.table.rows.forEach((rowMove) => {
          const rowMat = {};
          colzMove.forEach((ele, ind) => {
              rowMat[ele] = (rowMove.c[ind] != null) ? rowMove.c[ind].v : '';
          })
          DataMove.push(rowMat);
      })
  })
}
// ***************Sign On**************
function IsfoundUser(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
    for (let index = 0; index < DataUsers.length; index++) {
      if(TPassWord==DataUsers[index].PassWord){
        localStorage.setItem("User_Index", index);
        return true;
      }
    }
      error_User_ID.className="fa fa-warning";
      return false ;
  }

  function foundIndex(TPassWord){
      for (let index = 0; index < DataUsers.length; index++) {
        if(TPassWord==DataUsers[index].PassWord){
          return index
        }
      }
      return -1
    }
  
function Istrue(TPassWord){
  let error_User_ID= document.getElementById("error_User_ID");
  if(TPassWord===""){ error_User_ID.className="fa fa-warning"; return false;}else{ error_User_ID.className="" }
  if(IsfoundUser(TPassWord)===false){return false}else{error_User_ID.className=""}
  return true;
}

function Sign_In(){
  let User_PassWord= document.getElementById("User_PassWord");
  if (Istrue(User_PassWord.value)===true){
    let User_Index = localStorage.getItem("User_Index");
    if(DataUsers[User_Index].IsM=="Yes"){
    localStorage.setItem("User_Name", DataUsers[User_Index].UserName);
    localStorage.setItem("PassWord",DataUsers[User_Index].PassWord);
    localStorage.setItem("UserCode",DataUsers[User_Index].UserCode);
    ShowSelectForm("Main");
    location.reload();
  };
  }
}

function ShowPassword(){
  let User_PassWord= document.getElementById("User_PassWord");
  let Eye_Password= document.getElementById("Eye_Password");
  if (Eye_Password.className=="fa fa-eye"){
    User_PassWord.type="text";
    Eye_Password.className="fa fa-eye-slash";
  }else{
    User_PassWord.type="password";
    Eye_Password.className="fa fa-eye";
  }
}

// ***********************Mode*********************
function ConvertMode(){
  if (localStorage.getItem("FColor")==1){
    ConvertModeToSun();
  }else{
    ConvertModeToMoon();
  }
 }

function ConvertModeToSun(){
  localStorage.setItem("FColor", 1);
  document.getElementById("Moon").style.display="inline-block";
  document.getElementById("Sun").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "wheat"); 
  document.querySelector(':root').style.setProperty('--EColor', "white");
  document.querySelector(':root').style.setProperty('--loginColor', "whitesmoke"); 
  document.querySelector(':root').style.setProperty('--FontColor', "#f2a20b"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#a53333"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "#a53333");
  document.querySelector(':root').style.setProperty('--THColor', "wheat");  
  document.querySelector(':root').style.setProperty('--TDColor', "yellow"); 
} 
function ConvertModeToMoon(){
  localStorage.setItem("FColor", 2);
  document.getElementById("Sun").style.display="inline-block";
  document.getElementById("Moon").style.display="none";
  document.querySelector(':root').style.setProperty('--FColor', "#141e30"); 
  document.querySelector(':root').style.setProperty('--EColor', "#243b55");
  document.querySelector(':root').style.setProperty('--loginColor', "#00000080"); 
  document.querySelector(':root').style.setProperty('--FontColor', "white"); 
  document.querySelector(':root').style.setProperty('--Font2Color', "#d3f6f8"); 
  document.querySelector(':root').style.setProperty('--Font3Color', "black"); 
  document.querySelector(':root').style.setProperty('--THColor', "gray");  
  document.querySelector(':root').style.setProperty('--TDColor', "Red"); 
}  
// '''''''''''''''''''''''

// ********************purchasesWi
function ClearItemP(){
  document.getElementById("BillNumberP").value =MaxBillNumberP();
  let Ti =new Date().getTime().valueOf();
  let Ti1 =new Date().getTimezoneOffset().valueOf()
  let Ti2 =Ti1*60*1000 * -1 + Ti
  document.getElementById("BillDateP").valueAsDate =new Date(Ti2);
  document.getElementById("SupllierName").value =""
  document.getElementById("SupllierCode").value =""
  document.getElementById("NoteP1").value =""
  document.getElementById("bodyBillP").innerHTML =""
  AddRowPrElementP();
  document.getElementById("PTotal").value =""
}

function Loadpurchases(){
  Datapurchases=[];
  fetch(UrlPurchases)
  .then(res => res.text())
  .then(rep => {
      const jsonData11 = JSON.parse(rep.substring(47).slice(0, -2));
      const colzUser11 = [];
      jsonData11.table.cols.forEach((heading11) => {
          if (heading11.label) {
              let columnUser11 = heading11.label;
              colzUser11.push(columnUser11);
          }
      })
      jsonData11.table.rows.forEach((rowData11) => {
          const rowUser11 = {};
          colzUser11.forEach((ele, ind) => {
              rowUser11[ele] = (rowData11.c[ind] != null) ? rowData11.c[ind].v : '';
          })
          Datapurchases.push(rowUser11);
      })
  })
}


function MaxBillNumberP(){
  let XX;
  let BillNumbers01=[];
  for (let index = 0; index < Datapurchases.length; index++) {
    if(Datapurchases[index].Num!="" ){
      BillNumbers01.push(Datapurchases[index].BillNumber);
    }
  }
  XX= Math.max.apply(Math, BillNumbers01) + 1;
  if(isNaN(XX)==true){return 1}else{return XX}
}

function LoadpurchasesWi(){
  document.getElementById("bodyBillP").innerHTML =""
  let Loading=document.getElementById("LoadingFormBrowser");
  let FormLoad=document.getElementById("FormLoad");
  Loading.className="fa fa-refresh fa-spin";
  FormLoad.style.display="flex";
  Loadpurchases();
  LoadMat();
  LoadCustomers();
  const myTimeout = setTimeout(function(){ 
    document.getElementById("BillNumberP").value =MaxBillNumberP();
    let Ti =new Date().getTime().valueOf();
    let Ti1 =new Date().getTimezoneOffset().valueOf()
    let Ti2 =Ti1*60*1000 * -1 + Ti
    document.getElementById("BillDateP").valueAsDate =new Date(Ti2);
    AddRowPrElementP();
    FormLoad.style.display="none";
    Loading.className="fa fa-refresh";
  clearTimeout(myTimeout);
  }, 2500);
}

function AddRowPrElementP() {
  var td;
  let bodydata=document.getElementById("bodyBillP");
  let row = bodydata.insertRow();
  row.id="PRBP" + bodydata.childElementCount;
  row.className="PRBRowP";
   row.appendChild(td=document.createElement('td'));
  td.innerHTML=`<input list='listMatName2${bodydata.childElementCount}' id="PRBCodeNP${bodydata.childElementCount}"  style='width:95%;' class="TableInputMnP"  autocomplete="off" onkeyup="LoadMatsPrice2(this);"/>`;
  var datalist = document.createElement('datalist');
  datalist.id=`listMatName2${bodydata.childElementCount}`;
  td.appendChild(datalist);
  LoadMatsName2(bodydata.childElementCount);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "text";
  btb.id="MatCodeP" + bodydata.childElementCount ;
  btb.name="MatCode" + bodydata.childElementCount ;
  td.style.display="none";
  btb.className="MatCodeSP";
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMaP";
  btb.style.width="92%";
  btb.id="PRBAmountP" + bodydata.childElementCount ;
  btb.name="Amount" + bodydata.childElementCount ;
  btb.onkeyup=function(){CalculateRowAP(this.value,this.id)};
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMpP";
  btb.style.width="92%";
  btb.id="PRBPriceP" + bodydata.childElementCount ;
  btb.name="Price" + bodydata.childElementCount ;
  btb.onchange=function(){CalculateRowP(this.value,this.id)};
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "number";
  btb.autocomplete="off";
  btb.className="TableInputMtP";
  btb.style.width="92%";
  btb.readOnly=true;
  btb.id="PRBMatTotalP" + bodydata.childElementCount ;
  btb.name="MatTotal" + bodydata.childElementCount ;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('input');
  btb.type = "text";
  btb.autocomplete="off";
  btb.className="TableInputMnoP";
  btb.style.width="92%";
  btb.id="PRBNoteP" + bodydata.childElementCount ;
  btb.name="Note" + bodydata.childElementCount ;
  td.appendChild(btb);
  row.appendChild(td=document.createElement('td'));
  btb = document.createElement('input');
  btb.type = "button";
  btb.id="PRBDP" + bodydata.childElementCount;
  btb.value = "X";
  btb.className="BtnStyle";
  btb.onclick=function(){DeleteRowP(this.id)};
  td.appendChild(btb)
  };

  function LoadMatsPrice2(Mat){
    const StrId=Mat.id
    let MatCodeStr="MatCodeP" + StrId.slice(9,StrId.length);
    let MatCodeTxt =document.getElementById(MatCodeStr);
    if(Mat!=undefined){
      let MatName,MatCode;
      for (let index = 0; index < DataMat.length; index++) {
        MatName=DataMat[index].MatName
        MatCode=DataMat[index].MatCode
        if(MatName==Mat.value){
          MatCodeTxt.value=MatCode;
          return;
        }
      }
      MatCodeTxt.value="";
      return;
    }else{
      MatCodeTxt.value="";
    }
  }
  
  function DeleteRowP(TRow){
    let Row=String(TRow).slice(5,String(TRow).length);
    document.getElementById("PRBP" + Row).hidden=true;
    CaluclateTotalP();
  }

function LoadMatsName2(Num){
  let MatName,MatNum;
  let optionClass;
  let listMatName2 =document.getElementById("listMatName2" + Num);
  listMatName2.innerHTML="";
  for (let index = 0; index < DataMat.length; index++) {
    MatNum=DataMat[index].MatNum
    MatName=DataMat[index].MatName
    if(MatNum!=""){
      optionClass=document.createElement("option");
      optionClass.value=MatName;
      optionClass.textContent=MatName;
      listMatName2.appendChild(optionClass);
    }
  }
}


function CalculateRowAP(Am,TRow){
  let Row=String(TRow).slice(10,String(TRow).length);
  let Pr=document.getElementById("PRBPriceP" + Row).value
  document.getElementById("PRBMatTotalP" + Row).value = Pr * Am
  CaluclateTotalP();
}

function CalculateRowP(Pr,TRow){
  let Row=String(TRow).slice(9,String(TRow).length);
  let Am=document.getElementById("PRBAmountP" + Row).value
  document.getElementById("PRBMatTotalP" + Row).value = Pr * Am
  CaluclateTotalP();
}

function CaluclateTotalP(){
  let PTotal = document.getElementById("PTotal");
  let TableInputMt=document.getElementsByClassName("TableInputMtP");
  let total = 0 ;
  for (let index = 0; index < TableInputMt.length; index++) {
    if (TableInputMt.item(index).parentElement.parentElement.hidden==false){
      total =  total + Number(TableInputMt.item(index).value);
    }
  }
  PTotal.value=total;
}


function IstrueWare2(Ware){
  for (let index = 0; index < DataWareHouse.length; index++) {
    if(Ware.value==DataWareHouse[index].WareHouseName){
    document.getElementById("WareHouseCode2").value=DataWareHouse[index].WareHouseCode;
      return index
    }
  }
  return -1
}

  
function IstrueDataInformS2(){
  let BillDateP=document.getElementById("BillDateP");
  let CustomerName=document.getElementById("SupllierName");
  let SupllierCode=document.getElementById("SupllierCode");
  let bodyBillPur=document.getElementById("bodyBillP"); 
  let PurchasesItems=document.getElementById("purchasesItems");   
  if(BillDateP.value==""){BillDateP.style.border="2px solid #ff0000";return false}else{BillDateP.style.border="none";}
  if(SupllierCode.value==""){CustomerName.style.border="2px solid #ff0000";return false}else{CustomerName.style.border="none";}
  if(bodyBillPur.childElementCount==0){PurchasesItems.style.border="2px solid #ff0000";return false}else{PurchasesItems.style.border="2px solid rgb(155, 153, 153)";}
  if(IsTableInputMnTrueP()==false){return false};
  if(IsTableInputMaTrueP()==false){return false};
  RemoveRowHiddenP();
  if(bodyBillPur.childElementCount==0){PurchasesItems.style.border="2px solid #ff0000";return false}else{PurchasesItems.style.border="2px solid rgb(155, 153, 153)";}
  return true;
}

function IsTableInputMnTrueP(){
  let TableInputMn=document.getElementsByClassName("TableInputMnP");
  for (let index = 0; index < TableInputMn.length; index++) {
    if (TableInputMn.item(index).parentElement.parentElement.hidden==false){
      if (TableInputMn.item(index).value==""){
        TableInputMn.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMn.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}

function IsTableInputMaTrueP(){
  let TableInputMa=document.getElementsByClassName("TableInputMaP");
  for (let index = 0; index < TableInputMa.length; index++) {
    if (TableInputMa.item(index).parentElement.parentElement.hidden==false){
      if (TableInputMa.item(index).value==""){
        TableInputMa.item(index).parentElement.style.border="2px solid #ff0000";
        return false ;
      }else{
        TableInputMa.item(index).parentElement.style.border="2px solid rgb(155, 153, 153)";
      }
    }
  }
  return true ;
}

function RemoveRowHiddenP(){
  let ArraryNamesRow2=[];
  let ArraryNames2=[];
    let PRBRow=document.getElementsByClassName("PRBRowP");
    for (let index1 = PRBRow.length - 1; index1 >= 0 ; index1--) {
      if (PRBRow.item(index1).hidden==true){
        PRBRow.item(index1).remove();
      }
    }
    for (let index = 0; index < PRBRow.length; index++) {
        var RowN=PRBRow.item(index).children;
        for (let indexN = 0; indexN < RowN.length; indexN++) {
          var RowNi =RowN.item(indexN).children.item(0)
          if(RowNi.name !=""){
            ArraryNames2.push(RowNi.name);
          }
        }
        ArraryNamesRow2.push(ArraryNames2);
        ArraryNames2=[];
    }
    document.getElementById("ArrayTableP1").value=ArraryNamesRow2;
}

function onsubmitFormp1(){
  if(IstrueDataInformS2()===true){
    document.getElementById("BillNumberP").value=MaxBillNumberP();
    document.getElementById("ModeP1").value="1";
    onsubmitFormS11(6000);
  }
}

function onsubmitFormp2(){
  if(IstrueDataInformS2()===true){
    document.getElementById("ModeP1").value="2";
    onsubmitFormS11(10000);
  }
}

function IsNumTrue2(BillNumber){
  for (let index = 0; index < Datapurchases.length; index++) {
    if(Datapurchases[index].BillNumber==BillNumber ){
      return true
    }
  }
  return false
}

function onsubmitFormp3(){
  if (IsNumTrue2(document.getElementById("BillNumberP").value)==true){
    document.getElementById("ModeP1").value="3";
    onsubmitFormS11(6000);
  }
}

function onsubmitFormS11(Time){
  document.getElementById("typeP1").value="1";
  document.getElementById("UserNameP1").value=localStorage.getItem("UserCode");
  let MainForm=document.getElementById("FormpurchasesDetails");
  var w = window.open('', 'form_target', 'width=600, height=400');
  MainForm.target = 'form_target';
  MainForm.action=Script;
  MainForm.submit();
  if (MainForm.onsubmit()==true){
    const myTimeout = setTimeout(function(){ 
                w.close();
                clearTimeout(myTimeout)
                location.reload();
    }, Time);
  }
} 


// **************************purchasesBrowser***********

function GetDateFromString(Str){
  let MM,DD;
  let ZZ=[];
  let SS=String(Str).substring(5,String(Str).length-1);
  ZZ=SS.split(",");
  if (Number(ZZ[1])<9 && Number(ZZ[1]).length!= 2){ MM=0 + String(parseInt(ZZ[1]) + 1)}else{ MM=(parseInt(ZZ[1]) + 1)}
  if (Number(ZZ[2])<=9 && Number(ZZ[1]).length!= 2){ DD=0 + ZZ[2]}else{ DD=ZZ[2]}
  return ZZ[0] + "-" + MM + "-" + DD
}

function LoadpurchasesBrowser(){
  let Loading=document.getElementById("LoadingFormBrowser");
  let FormLoad=document.getElementById("FormLoad");
  Loading.className="fa fa-refresh fa-spin";
  FormLoad.style.display="flex";
  Loadpurchases();
  LoadMat();
  LoadCustomers();
  document.getElementById("bodydataP").innerHTML=""
  const myTimeout = setTimeout(function(){ 
    if (isNaN(Datapurchases[0].Num)==false){
      for (let index = 0; index < Datapurchases.length; index++) {
        if(Datapurchases[index].Num!="" ){
          AddRowPrS1(
            Datapurchases[index].BillNumber,
            Datapurchases[index].BillDateS,
            Datapurchases[index].SupllierName,
            Datapurchases[index].Total
            )
        }
      }
    }
    FormLoad.style.display="none";
    Loading.className="fa fa-refresh";
  clearTimeout(myTimeout);
  }, 2500);
}

function AddRowPrS1(BillNumberPA,BillDatePA,AccountCodePA,TotalPA) {
  let bodydata=document.getElementById("bodydataP");
  let row = bodydata.insertRow();
  row.id="P" + bodydata.childElementCount;
  let cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "BillNumberPA";
  cell.innerHTML = BillNumberPA;
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "BillDatePA";
  cell.innerHTML = GetDateFromString(BillDatePA);
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "AccountCodePA";
  cell.innerHTML = GetCustomerName(Number(AccountCodePA));
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "AccountCode";
  cell.innerHTML = Number(AccountCodePA);
  cell.style.display="none";
  cell = row.insertCell();
  cell.id="P" + bodydata.childElementCount + "TotalPA";
  cell.innerHTML = TotalPA;
  row.appendChild(td=document.createElement('td'));
  var btb = document.createElement('button');
  btb.type = "button";
  btb.id="ButPA" + bodydata.childElementCount;
  btb.onclick=function(){showdatarowsP()};
  btb.innerHTML=`<a class='fa fa-edit' style='color:#ff5e00 ; width:100% ;'> </a>`
  td.appendChild(btb)
  btb.style.cursor="pointer";
  btb.style.color="red";
  btb.style.width="100%";
  };


  function showdatarowsP() {
    let indextable= document.activeElement.parentElement.parentElement.id;
    let IndexRow =document.getElementById(indextable).children.item(0).textContent  ;
    let NameAccountTable=document.getElementById(indextable).children.item(2).textContent  ;
    let NameAccountCode=document.getElementById(indextable).children.item(3).textContent  ;
    document.getElementById("SupllierName").value=NameAccountTable;
    document.getElementById("SupllierCode").value=NameAccountCode;
    document.getElementById("bodyBillP").innerHTML="";
    document.getElementById("bodyBillP").innerHTML =""
    let Loading=document.getElementById("LoadingFormBrowser");
    let FormLoad=document.getElementById("FormLoad");
    Loading.className="fa fa-refresh fa-spin";
    FormLoad.style.display="flex";
    Loadpurchases();
    LoadMat();
    LoadCustomers();
    LoadMove();
    const myTimeout = setTimeout(function(){ 
      FormLoad.style.display="none";
      Loading.className="fa fa-refresh";
      ShowSelectForm("purchasesWi");

    for (let index = 0; index < Datapurchases.length; index++) {
      if(Datapurchases[index].BillNumber == IndexRow){
        document.getElementById("BillNumberP").value= IndexRow;
        document.getElementById("BillDateP").value=GetDateFromString(Datapurchases[index].BillDateS);
        document.getElementById("NoteP1").value=Datapurchases[index].Note;
        document.getElementById("PTotal").value=Datapurchases[index].Total;
      }
    }
    let IndexTableRow = 1;
    for (let indexM = 0; indexM < DataMove.length; indexM++) {
      if(DataMove[indexM].BillNumber == IndexRow && DataMove[indexM].Type=="1"){
        AddRowPrElementP();
        document.getElementById(`PRBCodeNP${IndexTableRow}`).value=GetMatNameFormCode1(DataMove[indexM].MatCode)
        document.getElementById(`MatCodeP${IndexTableRow}`).value= DataMove[indexM].MatCode;
        document.getElementById(`PRBAmountP${IndexTableRow}`).value= Math.abs(DataMove[indexM].Amount);
        document.getElementById(`PRBPriceP${IndexTableRow}`).value= DataMove[indexM].Price;
        document.getElementById(`PRBMatTotalP${IndexTableRow}`).value= DataMove[indexM].MatTotal;
        document.getElementById(`PRBNoteP${IndexTableRow}`).value= DataMove[indexM].Note;
        IndexTableRow++;
      }
    }
    CaluclateTotalP();
    document.getElementById("CountRowP").value=Number(IndexTableRow) - 1;
    clearTimeout(myTimeout);
  }, 2000);
  };
  function GetMatNameFormCode1(Code){
    for (let index = 0; index < DataMat.length; index++) {
      if(DataMat[index].MatCode==Code ){
        return DataMat[index].MatName;
      }
    }
  }

