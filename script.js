// Assignment Code
var generateBtn = document.querySelector("#generate");


// ------------- Document this
var charTypes = {
  lowercase: 1,
  uppercase: 2,
  numeric: 4,
  special: 8
}
// --------------------------------------

// My function:
function generatePassword() {
  // According to our acceptance criteria, first we must prompt the user
  // for the length of our password. The password should be between 8 and
  // 128 characters.
  var passwordLength;
  var charType = 0; // (integer between 0 and 15)

  // We use parseInt here instead of calling the Number() function since
  // we need an integer password length
  while (true) {
    let n = parseInt(window.prompt("Please enter the length of your desired password (8 to 128 characters)"));
    if (isNaN(n)) {
      continue;
    }
    if (n < 8 && n > 128) {
      continue;
    }
    passwordLength = n;
    break;
  }

  while (!charType) {
    

  }

}



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
