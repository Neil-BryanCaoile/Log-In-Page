// Author:    Neil Bryan Caoile
// StudentId: 817643697

var errorMsg = document.querySelectorAll(".error-message");
var inputText = document.querySelectorAll("input");
var errorMsg = document.querySelectorAll(".error-message");
var icon = document.querySelectorAll("#icon-checker");
var isUsername;
var isPassword;
var isMatched;
var isContact;
var isEmail;
var isGender;
var male = document.querySelectorAll("input")[5];
var female = document.querySelectorAll("input")[6];

// Check strength of username and password
checkStrength(inputText[0], errorMsg[0], icon[0]);
checkStrength(inputText[1], errorMsg[1], icon[1]);

// When Submit clicked
document.querySelector("button").addEventListener("click", function () {
  // Username Check
  isUsername = check(inputText[0], errorMsg[0], icon[0]);
  // Password Check
  check(inputText[1], errorMsg[1], icon[1]);
  // Password2 Check
  if (check(inputText[2], errorMsg[2], icon[2]) && isMatched) {
    isPassword = true;
  }
  // Check contact if no input
  if (inputText[3].value == null || inputText[3].value == "") {
    showError(icon[3], errorMsg[3]);
  }

  if (inputText[4].value == null || inputText[4].value == "") {
    showError(icon[4], errorMsg[4]);
    isEmail = false;
  } else {
    isEmail = true;
  }
  // If radio is not checked
  if (male.checked == false && female.checked == false) {
    isGender = false;
    showError(icon[5], errorMsg[5]);
  } else {
    isGender = true;
  }
});

// When radio button click remove icon and errror Message
male.addEventListener("click", function () {
  errorMsg[5].innerHTML = "<br>";
  icon[5].classList.remove("visible");
});
female.addEventListener("click", function () {
  errorMsg[5].innerHTML = "<br>";
  icon[5].classList.remove("visible");
});

//Show error icon and error message
function showError(icon, errorMsg) {
  errorMsg.innerHTML = "Error";
  errorMsg.classList.add("unavailable");
  errorMsg.classList.remove("accepted");

  icon.setAttribute("src", "images/cancel.png");
  icon.classList.add("visible");
}

// Check if password is matched.
inputText[2].addEventListener("keyup", function () {
  if (inputText[1].value == inputText[2].value) {
    isAcepted(icon[2], errorMsg[2]);
    errorMsg[2].innerHTML = "Matched";
    isMatched = true;
  } else {
    showError(icon[2], errorMsg[2]);
    errorMsg[2].innerHTML = "Sorry password do not match.";
    isMatched = false;
  }
  if (inputText[2].value.length == 0) {
    removeValidation(icon[2], errorMsg[2]);
    isMatched = false;
  }
});

//Remove validation when no input
function removeValidation(icon, errorMsg) {
  icon.setAttribute("src", "images/cancel.png");
  icon.classList.remove("visible");
  errorMsg.innerHTML = "<br>";
  errorMsg.classList.remove("unavailable");
}

//Checks if onlu number are inputed;
inputText[3].addEventListener("keyup", function () {
  var phone = inputText[3].value;
  for (var i = 0; i < phone.length; i++) {
    if (
      phone[i] == "0" ||
      phone[i] == "1" ||
      phone[i] == "2" ||
      phone[i] == "3" ||
      phone[i] == "4" ||
      phone[i] == "5" ||
      phone[i] == "6" ||
      phone[i] == "7" ||
      phone[i] == "8" ||
      phone[i] == "9"
    ) {
      isContact = true;
      isAcepted(icon[3], errorMsg[3]);
    } else {
      isContact = false;
    }
  }
  if (inputText[3].value.length == 0) {
    removeValidation(icon[3], errorMsg[3]);
  } else {
    if (!isContact) {
      showError(icon[3], errorMsg[3]);
      errorMsg[3].innerHTML = "OPPS! Numbers only.";
    }
  }
});

//remove validation when email is keyup
inputText[4].addEventListener("keyup", function () {
  if (inputText[3].value.length == 0) {
    removeValidation(icon[4], errorMsg[4]);
  }
});

//Reset
document.querySelector("#reset").addEventListener("click", function () {
  male.checked = false;
  female.checked = false;
  for (var i = 0; i < inputText.length; i++) {
    inputText[i].value = "";
    icon[i].classList.remove("visible");
    errorMsg[i].innerHTML = "<br>";
  }
});

//Check if no input and less than 5
function check(inputText, errorMsg, icon) {
  if (
    inputText.value == null ||
    inputText.value == "" ||
    inputText.value.length < 5
  ) {
    showError(icon, errorMsg);
    return false;
  } else {
    errorMsg.classList.remove("legend");
    errorMsg.classList.remove("great");

    errorMsg.classList.add("accepted");
    errorMsg.innerHTML = "ACEPTED";

    icon.setAttribute("src", "images/check-mark.png");
    icon.classList.add("visible");

    return true;
  }
}

//Check password strength.
function checkStrength(inputText, errorMsg, icon) {
  inputText.addEventListener("keyup", function () {
    if (inputText.value.length < 5) {
      showError(icon, errorMsg);
      errorMsg.innerHTML = "Must be Greater than 5";

      errorMsg.classList.remove("great");
      errorMsg.classList.remove("legend");
      errorMsg.classList.remove("accepted");

      if (inputText.value.length == 0) {
        errorMsg.innerHTML = "<br>";
        icon.setAttribute("src", "images/cancel.png");
        icon.classList.remove("visible");

        errorMsg.classList.remove("great");
        errorMsg.classList.remove("unavailable");
        errorMsg.classList.remove("legend");
      }

      errorMsg.classList.add("unavailable");
    } else if (inputText.value.length < 7) {
      icon.setAttribute("src", "images/check-mark.png");
      icon.classList.add("visible");
      errorMsg.innerHTML = "Great";

      errorMsg.classList.add("great");
      errorMsg.classList.remove("legend");
    } else {
      errorMsg.classList.add("legend");
      errorMsg.innerHTML = "Legend";
    }
  });
}

function isAcepted(icon, errorMsg) {
  icon.setAttribute("src", "images/check-mark.png");
  icon.classList.add("visible");
  errorMsg.innerHTML = "Acepted";
  errorMsg.classList.add("accepted");
}
//Call this when submit
function validation() {
  if (isUsername && isPassword && isContact && isGender && isEmail) {
    return true;
  } else {
    return false;
  }
}
