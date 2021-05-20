function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == true) {
      
    } else {
      return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://manch-pr.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function loadExistingData() {
  myBookData = [];
  myHobbyData = [];
    $.ajax({
        type : "GET",
        url : "https://manch-pr.herokuapp.com/data",
        dataType : "json",
        success : function(data) {
          loadedData = data.data;
            console.log("success", data);
            data.data.forEach(elem => {
            if (elem["project"] == "Book") {
              myBookData.push(elem);
            } else {
              myHobbyData.push(elem);
            }    
        })
        displayData(myBookData, "bookDataContainer");
        displayData(myHobbyData, "hobbyDataContainer");
      },
        error : function(data) {
            console.log("Error");
        }
    });
}

function displayData(data, containerDivName) {
    document.getElementById(containerDivName).innerHTML = "";
    data.forEach(elem => {
        var item = document.createElement("div");
        item.id = "div" + elem["_id"];
        item.className = "item";
        if (Object.keys(elem).length == 1) {
            var span = document.createElement("span");
            span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
            item.appendChild(span);
        }
        Object.keys(elem).forEach(key => {
            if (key != "_id") {
                var span = document.createElement("span");

                var b = document.createElement("b");
                b.innerHTML = key + ": ";
                span.appendChild(b);
                
                span.className = "item";
                if (elem[key]) {
                    span.innerHTML += elem[key];
                } else {
                    var span1 = document.createElement("span");
                    span1.className = "undefined";
                    span1.innerHTML = "N/A";
                    span.appendChild(span1)
                }
                item.appendChild(span);

                var br = document.createElement("br");
                item.appendChild(br);
            }
        })

        if (elem["owner"] == "Mariam Sargsyan") {
          var button2 = document.createElement("button");
          button2.innerHTML = "Edit";
          button2.className = "editButton";
          button2.id = "edit_"+ elem["_id"];
          button2.addEventListener("click", function(e){
          editData(e.target.id);
          }, false);
          item.appendChild(button2);
        }

        if (elem["owner"] == "Mariam Sargsyan" || (elem["fullname"] && elem["fullname"].indexOf("Mariam Sargsyan") > -1)) {
          var button = document.createElement("button");
          button.innerHTML = "Delete";
          button.id = elem["_id"];
          button.addEventListener("click", function(e){
          deleteData(e.target.id);
          }, false);
          item.appendChild(button);
         }
         document.getElementById(containerDivName).appendChild(item);
     
    })
    

}



var loadedData = [];

function editData(id){
 var tmp = id.split("edit_");
 var item_id = tmp[1];
 console.log(item_id);

loadedData.forEach(item => {
    if (item._id == item_id && item["owner"] == "Mariam Sargsyan") {
        console.log(item); 
        localStorage = window.localStorage;
        localStorage.setItem('editItem', JSON.stringify(item));
        if (item["project"] == "Book" ) {
          document.location  = "edit_book"; 
        } else {
          document.location  = "edit_hobby";
        }
    }
  })
}


function UpdateData(e){
  console.log(UpdatedBookData);
  var UpdatedBookData= {};
  UpdatedBookData.id=document.getElementById("_id").value;
  UpdatedBookData.firstname=document.getElementById("firstNameForm").value;
  UpdatedBookData.title=document.getElementById("titleForm").value;
  UpdatedBookData.author=document.getElementById("authorForm").value;
  UpdatedBookData.color=document.getElementById("colorForm").value;
  UpdatedBookData.covertype=document.getElementById("coverTypeForm").value;
  UpdatedBookData.othercovertype=document.getElementById("otherCoverForm").value;
  UpdatedBookData.numofpages=document.getElementById("pagesForm").value;
  UpdatedBookData.price=document.getElementById("priceForm").value;
  UpdatedBookData.currency=document.getElementById("currencyForm").value;
  UpdatedBookData.language=document.getElementById("langForm").value;
  UpdatedBookData.otherlanguage=document.getElementById("otherLanguageForm").value;
  UpdatedBookData.originallanguage=document.getElementById("origLanguageForm").value;
  UpdatedBookData.otheroriginallanguage=document.getElementById("otherOrigLanguageForm").value;
  UpdatedBookData.edition=document.getElementById("editionForm").value;
  UpdatedBookData.publisher=document.getElementById("publisherForm").value;
  UpdatedBookData.publishing_date=document.getElementById("publishingdateForm").value;
  UpdatedBookData.originalpubdate=document.getElementById("origPublishingDateForm").value;
  UpdatedBookData.genre=document.getElementById("genreForm").value;
  UpdatedBookData.agerestration=document.getElementById("agerestrationForm").value;
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: "https://forclassmanch.herokuapp.com/data/update",
    data: UpdatedBookData,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("successfully editted");
    },
    error: function (xhr) {
      console.error("Error in editting", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });  
}

function loadBookEditItem() {
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem("editItem"));
  console.log(editItem);
  document.getElementById("_id").value = editItem["_id"];
  document.getElementById("firstNameForm").value =editItem["firstname"];
  document.getElementById("titleForm").value = editItem["title"];
  document.getElementById("authorForm").value = editItem["author"];  
  document.getElementById("colorForm").value = editItem["color"]; 
  document.getElementById("coverTypeForm").value = editItem["covertype"]; 
  document.getElementById("otherCoverForm").value = editItem["othercovertype"]; 
  document.getElementById("pagesForm").value = editItem["numberofpages"]; 
  document.getElementById("priceForm").value = editItem["price"]; 
  document.getElementById("currencyForm").value = editItem["currency"]; 
  document.getElementById("languageForm").value = editItem["language"]; 
  document.getElementById("otherLanguageForm").value = editItem["otherlanguage"];
  document.getElementById("origLanguageForm").value = editItem["originallanguage"];
  document.getElementById("otherOrigLanguageForm").value = editItem["otheroriginallanguage"];
  document.getElementById("editionForm").value = editItem["edition"]; 
  document.getElementById("publisherForm").value = editItem["publisher"];
  document.getElementById("publishing_dataForm").value = editItem["publishingdata"]; 
  document.getElementById("originalpubdateForm").value = editItem["origPublishingDate"];
  document.getElementById("genreForm").value = editItem["genre"];
  document.getElementById("agerestrictForm").value = editItem["agerestriction"];
  
}


function handleFullNameEditChange(){
 Myformdata.firstname=document.getElementById("firstNameForm").value;
}

function handleTitleChange() {
  Myformdata.title = document.getElementById("title").value;
}
function handleAuthorEditChange(){
 Myformdata.author=document.getElementById("authorForm").value; 
}

function handleColorEditChange(){
  Myformdata.color=document.getElementById("colorForm").value; 
}

function handleCoverEditChange(){
 Myformdata.covertype=document.getElementById("coverTypeForm").value;
}

function handleOtherCoverEditChange(){
 Myformdata.othercovertype=document.getElementById("otherCoverForm").value;
}

function handlePagesEditChange(){
 Myformdata.numberofpages=document.getElementById("pagesForm").value;
}

function handlePriceEditChange(){
  Myformdata.price=document.getElementById("priceForm").value;
}

function handleCurrencyEditChange(){
  Myformdata.currency=document.getElementById("currencyForm").value;
}

function handleLanguageEditChange(){
 Myformdata.language=document.getElementById("languageForm").value; 
}

function handleOtherLangEditChange(){
 Myformdata.otherlanguage=document.getElementById("otherLanguageForm").value;
}

function handleOrigLangEditChange(){
 Myformdata.originallanguage=document.getElementById("origLanguageForm").value;
}

function handleOtherOrigLangEditChange(){
 Myformdata.otheroriginallanguage=document.getElementById("otherOrigLanguageForm").value;
}

function handleEditionEditChange(){
 Myformdata.edition=document.getElementById("editionForm").value; 
}

function handlePublisherEditChange(){
 Myformdata.publisher=document.getElementById("publisherForm").value;
}

function handlePublishingDataEditChange(){
 Myformdata.publishing_data=document.getElementById("publishingdataForm").value;
}

function handleOrigPubDateEditChange(){
 Myformdata.originalpubdate=document.getElementById("origPublishingDateForm").value;
}

function handleGenreEditChange(){
  Myformdata.genre=document.getElementById("genreForm").value;
}

function handleAgeRestEditChange(){
  Myformdata.agerestriction=document.getElementById("agerestrictForm").value;
}


function loadHobbyEditItem(){
  localStorage = window.localStorage;
  editItem = JSON.parse(localStorage.getItem("editItem"));
  console.log(editItem);
  document.getElementById("_id").value = editItem["_id"];
  document.getElementById("chesshobbyEdit").value = editItem["fname"];
  document.getElementById("whyloveEdit").value =editItem["whylove"];
  document.getElementById("ageEdit").value = editItem["age"];  
  document.getElementById("regenerateEdit").value = editItem["regenerate"]; 
  document.getElementById("categorydescribechessEdit").value = editItem["categorydescribechess"]; 
  document.getElementById("celebrityEdit").value = editItem["celebrity"]; 
  document.getElementById("whoEdit").value = editItem["who"]; 
  document.getElementById("chancetomeetEdit").value = editItem["chancetomeet"]; 
  document.getElementById("firstquestionEdit").value = editItem["firstquestion"]; 
}

function EditData(e){
  console.log(UpdatedHobbyData);
  var UpdatedHobbyData= {};
  UpdatedHobbyData.id=document.getElementById("_id").value;
  UpdatedHobbyData.chesshobby=document.getElementById("chesshobbyEdit").value;
  UpdatedHobbyData.whylove=document.getElementById("whyloveEdit").value;
  UpdatedHobbyData.age=document.getElementById("ageEdit").value;
  UpdatedHobbyData.regenerate=document.getElementById("regenerateEdit").value;
  UpdatedHobbyData.categorydescribechess=document.getElementById("categorydescribechessEdit").value;
  UpdatedHobbyData.celebrity=document.getElementById("celebrityEdit").value;
  UpdatedHobbyData.who=document.getElementById("whoEdit").value;
  UpdatedHobbyData.chancetomeet=document.getElementById("chancetomeetEdit").value;
  UpdatedHobbyData.firstquestion=document.getElementById("firstquestionEdit").value;
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: "https://forclassmanch.herokuapp.com/data/update",
    data: UpdatedHobbyData,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("successfully editted");
    },
    error: function (xhr) {
      console.error("Error in editting", xhr);
    },
    complete: function () {
      console.log("Complete");  
      }
  });  
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
  MyFormData.categorydescribechess=document.getElementById("categorydescribechess").value;          }
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
};

    