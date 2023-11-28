// Assignment Code
var generateBtn = document.querySelector("#generate");

const lowercaseChars = "abcdefghijklmnopqrstuvwxyz".split('');
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const numericChars = "0123456789".split('');

/* Both the '\' and '"' characters can break our code if not escaped
    Hence:
    \ ---> \\
    " ---> \"
*/
const specialChars = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split(''); // We must escape \  hence \\ and \"


// This helper-function can extract a boolean from human language.
// Javascript already has the concept of "truthiness" but all non-empty
// strings evaluate to true i.e. "No" would evaluate to true. I built on
// the concept of truthy/falsy to return true for text like ("t", "yes", "true", etc.)
// and to return false for text like ("n", "no", "false", etc.) 
function evalInput(string) {
  return !["", "n", "no", "not", "nope", "na", "nay", "nah", "naw", "never", 
          "hell no", "null", "f", "false", "0", "decline", "refuse",
          "object", "oppose", "deny"].includes(string.toLowerCase())
}

/* Very common pattern in Javascript to choose a random element of an array.

To obtain our random array element we merely need to return the value stored
at a random index.

To get our random index:

   We take the random float from Math.random (between 0 and 1), multiply
   that number by the length of our array, finally, we floor that number to
   obtain a random integer between 0 and the length of our array - 1.
*/
function randChoose(array) {
  return array[Math.floor(array.length*Math.random())];
}


// My function:
function generatePassword() {
  // According to our acceptance criteria, first we must prompt the user
  // for the length of our password. The password should be between 8 and
  // 128 characters.
  var passwordLength;
  var ourPasswordChars = [];
  var ourPassword = [];
  
  // We use parseInt here instead of calling the Number() function since
  // we need an integer password length
  while (true) {
    let n = parseInt(window.prompt("Please enter the length of your desired password (8 to 128 characters)"));
    if (isNaN(n) || n < 8 || n > 128) {
      continue;
    }
    passwordLength = n;
    break;
  }

  while (!ourPasswordChars.length) {
    // Prompt for lowercase
    if (evalInput(window.prompt("Would you like your password to contain lowercase characters (abc...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(lowercaseChars);
    }
    if (evalInput(window.prompt("Would you like your password to contain uppercase characters (ABC...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(uppercaseChars);
    }
    if (evalInput(window.prompt("Would you like your password to contain numeric characters (0123...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(numericChars);
    }
    if (evalInput(window.prompt("Would you like your password to contain special characters (!?#...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(specialChars);
    }
  }

  for (let i = 0; i < passwordLength; i++) {
    ourPassword.push(randChoose(ourPasswordChars));
  }
  return ourPassword.join('');
}



// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
