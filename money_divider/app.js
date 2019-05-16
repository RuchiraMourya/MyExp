 document.getElementById('submitBtn').addEventListener('click', formSubmit);
 var nameListArray = [];

 function formSubmit() {
     var nameList = document.getElementById('nameList').value;
     document.getElementById("addPerson").style.display = "none";
     document.getElementById("title").textContent = "Enter paid money";
     document.getElementById("GoBack").textContent = "Go Back";
     document.getElementById("GoBack").addEventListener("click", goBackMain);
     var collectDataDiv = document.getElementById("collectData");
     collectDataDiv.style.display = "block";
     var nameList = nameList.replace(/(^,)|(,$)/g, "");
     nameListArray = nameList.split(",");
     if (nameListArray.length < 2) {
         nothingToGive(true);
         return;
     }

     if (checkIdenticalValue(nameListArray)) {
         nothingToGive();
         return;
     }

     for (i = 0; i < nameListArray.length; i++) {
         var divWrapper = document.createElement("div");
         collectDataDiv.appendChild(divWrapper);
         var nameBox = document.createElement("div");
         nameBox.className = "nameBox";
         nameBox.textContent = nameListArray[i];
         var moneyBox = document.createElement("input");
         moneyBox.className = "moneyBox";
         moneyBox.value = "0";
         divWrapper.appendChild(nameBox);
         divWrapper.appendChild(moneyBox);
     }

     var buttonBox = document.createElement("button");
     buttonBox.textContent = "Done";
     buttonBox.id = "doneBtn";
     collectDataDiv.appendChild(buttonBox);
     buttonBox.addEventListener("click", doneActionFunc);
 }



 function calculateAndSimplify(valueA, valueB, indexA, indexB) {
     document.getElementById("title").textContent = "Give Back";
     var resultDiv = document.querySelector("#finalResult ul");
     var sub = valueA - valueB;
     var resultString = nameListArray[indexB] + " will give " + Math.round(sub) + "rs to " + nameListArray[indexA];
     var resultList = document.createElement("li");
     resultList.textContent = resultString;
     resultDiv.appendChild(resultList);
 }

 function doneActionFunc() {
     console.log("done clicked");
     var receiveBucket = [],
         dataMatrixRow = [],
         dataMatrix = [],
         receiveBucketList = {};

     document.getElementById("collectData").style.display = "none";
     // get data from person blocks
     var moneyBoxList = document.getElementsByClassName('moneyBox');
     var length = moneyBoxList.length;
     for (var i = 0; i < length; i++) {
         for (var j = 0; j < length; j++) {
             dataMatrixRow.push(parseInt((moneyBoxList[i].value)) / length);
         }
         dataMatrix.push(dataMatrixRow);
         dataMatrixRow = [];
     }
     for (var i = 0; i < length; i++) {
         for (var j = 0; j < length; j++) {
             if (i == j) {
                 break;
             } else if (dataMatrix[i][j] > dataMatrix[j][i]) {
                 calculateAndSimplify(dataMatrix[i][j], dataMatrix[j][i], i, j);
             } else {
                 calculateAndSimplify(dataMatrix[j][i], dataMatrix[i][j], j, i);
             }
         }
     }
 }

 function goBackMain() {
     nameListArray = [];
     document.getElementById("title").innerHTML = "Enter Person Name(separate by comma)";
     document.getElementById("GoBack").textContent = "";
     document.getElementById("addPerson").style.display = "block";
     document.getElementById("collectData").style.display = "none";
     document.getElementById("collectData").innerHTML = "";
     document.getElementById("finalResult").style.display = "none";
     document.querySelector("#finalResult ul").innerHTML = "";
 }

 function checkIdenticalValue(array) {
     for (var i = 0; i < array.length - 1; i++) {
         if (array[i] !== array[i + 1]) {
             return false;
         }
     }
     return true;
 }

 function nothingToGive(isFirst) {
     document.getElementById("title").innerHTML = "Nothing to give :-D";
     document.getElementById("GoBack").textContent = "Go Back";
     document.getElementById("GoBack").addEventListener("click", goBackMain);
 }