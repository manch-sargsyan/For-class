function Validatecurrentvalue(){
  var currentvalue=document.getElementById("fname").value;
  console.log("Eventcall;", currentvalue.length)
  if (currentvalue.length > 10){
   document.getElementById("fullnameerror").innerHTML="Bad";
  } else{
    document.getElementById("fullnameerror").innerHTML="Good";
  }
}

function handleFullNameChange(){
 Myformdata.firstname=document.getElementById("firstname").value;

}

function handleTitleChange(){
 Myformdata.title=document.getElementById("title").value;
}

function handleAuthorChange(){
  Myformdata.author=document.getElementById("author").value;
}

function handleColorChange(){
  Myformdata.color=document.getElementById("color").value;
}

function handleCoverTypeChange(e){
 Myformdata.covertype= e.target.value; 
 if (Myformdata.covertype !="other"){
   Myformdata.othercovertype="";
   document.getElementById("othertext").style.display="none";
 } else{
   document.getElementById("othertext").style.display="block";
 }
}

function handleNumofPagesChange(){
  Myformdata.numofpages=document.getElementById("numofpages").value;
}

function handlePriceChange(){
 Myformdata.price=document.getElementById("price").value;
}

function handleCurrencyChange(){
 Myformdata.currency=document.getElementById("currency").value;
}

function handleLanguageChange(event){
  Myformdata.otherLanguageValue= event.target.value;
  if (Myformdata.language != "otherlang"){
    Myformdata.otherlanguage="";
    document.getElementById("language").style.display="none";
  } else{
    document.getElementById("language").style.display="block";
  }
}
function handleOtherLanguageChange(){
  if (Myformdata.otherlang=="otherlang") {
    document.getElementById("otherLanguageValue").value;
  }
}

function handleoriginallangchange(event){
 Myformdata.language=event.target.value;
 if (Myformdata.otherLanguageValue != "other"){
   Myformdata.otherLanguageValue="";
   document.getElementById("orig_kanguage").style.display="none";
 } else{
   document.getElementById("orig_kanguage").style.display="block";
 }
}

function handleOtherlanguagechange(){
 if (Myformdata.origLanguage=="otheroriglang"){
   document.getElementById("otherOrigLanguageValue").value;
 }
}

function handleEditionChange(){
  Myformdata.edition=document.getElementById("edition").value;
}
function handlePublisherChange(){
  Myformdata.publisher=document.getElementById("publisher").value;
  }

function handlePublishingDateChange() {
  Myformdata.publishingdate = document.getElementById("publishing_date").value;
}

function handleOrigPublishingDateChange() {
  Myformdata.origpublishingdate = document.getElementById("original_publishing_date").value;
}

function handleGenreChange() {
  Myformdata.genre = document.getElementById("genre").value;
}

function handleAgeRegistrationChange() {
  Myformdata.ageregistration = document.getElementById("ageregistration").value;
}

function showTheBookData(e){
handleFullnameChange()
handleTitleChange()
handleAuthorChange() 
handleColorChange()
handleCoverMaterialchange()
handleNumofPagesChange() 
handlePriceChange()
handleCurrencyChange()
handleLanguageChange()
handleOtherLanguageChange()
handleOrigLanguageChange(e)
handleOtherOrigLanguageChange()
handleEditionChnage()
handlePublisherChange()
handlePublishingDateChange()
handleOrigPublishingDateChange()
handleGenreChange()
handleAgeRegistrationChange()
  e.preventDefault();
  console.log(Myformdata);


function SaveData(e){
  console.log(Myformdata)
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: "https://manch-pr.herokuapp.com/data",
    data: Myformdata,
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



var Myformdata={
  "project": "Book",
  "owner": "Mariam Sargsyan",
  "firstname" : "",
  "title" : "",
  "author" : "",
  "color" : "",
  "covertype" : "",
  "numofpages" : "",
  "price" : "",
  "currency" : "",
  "language" : "",
  "otherLanguageValue" : "",
  "origLanguage" : "",
  "otherOrigLangauageValue" : "",
  "edition" : "",
  "dimensions" : "",
  "publisher" : "",
  "publishingdate" : "",
  "origpublishingdate" : "",
  "genre" : "",
  "ageregistration" : ""
}
