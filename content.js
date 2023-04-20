console.log("content Js loded");
var closeButton = document.getElementById("close");
if (closeButton) {
  closeButton.click();
}
console.log("Closes The popup");
// Prompt user for login credentials
var username = "{enter username}";
var password = "{enter your password}";

// Fill in login form and submit
var usernameField = document.getElementById("LoginModel_Email");
if (usernameField) {
  usernameField.value = username;
}
console.log("Filded up username");
var passwordField = document.getElementById("LoginModel_Password");
if (passwordField) {
  passwordField.value = password;
}
try {
  console.log("Clicking Submit Button");
  document.querySelector('input[type="Submit"]').click();
} catch {
  console.error("Error In submit");
}

console.log("Wait for login to complete");
setTimeout(function () {
  console.log("Navigating to Addtimesheet Page");

  var today = new Date();
  var month = (today.getMonth() + 1).toString().padStart(2, "0");
  var day = today.getDate().toString().padStart(2, "0");
  var year = today.getFullYear().toString();
  var formattedDate = month + "/" + day + "/" + year;

  console.log("Selecting project");

  console.log("Selected Dropdown Value");

  var input = prompt("Please enter the text you want to input:", "");
  console.log('Calling the API');

  var model = {
    ProjectId: 2,//Select your Project ID
    TaskDescription: input,
    CreateDt: formattedDate,
    EmployeeId: 999,//Select your Employee ID
    workinghour: "08:00",
  };

  var jsonData = JSON.stringify(model);
  Api(jsonData);
}, 5000); 
// Wait 5 seconds for login to complete


let hasBeenCalled = false;

function Api(jsonData) {
  if (!hasBeenCalled) {
    var xhr = new XMLHttpRequest();
  xhr.open("POST", "/TimeSheet/SaveTimeSheet");
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = xhr.responseText;
      if (data > 0) {
        alert("TimeSheet has been Added Successfully!");
        window.location.href = "https://www.corporatehours.com/Project/TimeSheet";

      } else {
        alert( "Some error occured,Please try again.");
      }
    } else {
      alert("Request failed. Returned status of " + xhr.status);
    }
  };
  xhr.onerror = function () {
    alert("Request failed. Please try again later.");
  };
  var formData = new FormData();
  formData.append("modelParameter", jsonData);
  xhr.send(formData);
    hasBeenCalled = true;
  }
}