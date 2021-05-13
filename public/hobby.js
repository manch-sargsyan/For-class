


var MyFormData={
  "owner": "Mariam Sargsyan",
  "project": "Hobby",
  "chesshobby" : "",
  "whylove" : "",
  "age" : "",
  "regenerate" : "",
  "categorydescribechess" : "",
  "celebrity" : "",
  "who" : "",
  "chancetomeet" : "",
  "firstquestion" : "",
}


function handlechesshobbyChange() {
  MyFormData.chesshobby = document.getElementById("fname").value;
}

function handlewhyloveChange(){
  MyFormData.whylove=document.getElementById("whylove").value;
  }


function handleageChange(event){
  MyFormData.age= document.getElementById("age").value;
  
}

function handleregenerateChange(){
  MyFormData.regenerate=document.getElementById("regenerate").value;
  
}

function handlecategorydescribechessChange(){
  MyFormData.categorydescribechess=document.getElementById("categorydescribechess").value;
  var options = document.getElementsByName("categorydescribechess");
  if (options) {
      for (var i = 0; i < options.length; i++) {
          if (options[i].checked){
               MyFormData.categorydescribechess = options[i].value;
          }
}

function handlecelebritychange(){
  MyFormData.celebrity=document.getElementById("celebrity").value;
}

function handlewhoChange(){
  MyFormData.who=document.getElementById("who").value;
}

function handlechancetomeetChange(){
  MyFormData.chancetomeet=document.getElementById("chancetomeet").value;
}

function handlefirstquestionChnage(){
  MyFormData.firstquestion=document.getElementById("firstquestion").value;
}

function showTheHobbyData(e){
  e.preventDefault();
  handlechesshobbyChange();
  handlewhyloveChange();
  handleageChange();
  handleregenerateChange();
  handlecategorydescribechessChange();
  handlecelebritychange();
  handlewhoChange();
  handlechancetomeetChange();
  handlefirstquestionChnage();
  console.log(MyFormData);


function SaveHobbyData(event){
  var check=CheckData();
  if (check==1){
console.log(MyFormData);

  event.preventDefault();
   $.ajax({
    type: 'POST',
    url: "https://manch-pr.herokuapp.com/data",
    data: MyFormData,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });  
 
  }
  else{
    console.log("Data not saved");
  };
  
}