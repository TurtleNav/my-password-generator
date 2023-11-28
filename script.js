// Assignment Code
var generateBtn = document.querySelector("#generate");

// The following four constants are the sets of characters that COULD be added to our password if a
// user wishes for that particular type of characters to be in their password
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz".split('');
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const numericChars = "0123456789".split('');

/* Both the '\' and '"' characters can break our code if not escaped
    Hence:
    \ ---> \\
    " ---> \"
*/
const specialChars = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split(''); // We must escape \  hence \\ and \"

/* This helper-function can extract a boolean from human language.
   I built on the concept of truthy/falsy to return false for a greater number of strings.
   These falsy strings include: ("n", "no", "false", etc.)
*/
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

// My implementation of generatePassword:
function generatePassword() {
  // According to our acceptance criteria, first we must prompt the user
  // for the length of our password. The password should be between 8 and
  // 128 characters. This Number will be stored in the passwordLength variable:
  var passwordLength;

  // The set of potential characters in our password. Should be a linear combination
  // of the four constants defined at the top of this file
  var ourPasswordChars = [];

  // The set of characters that will constitute our password
  var ourPassword = [];
  
  // We use parseInt here instead of calling the Number() function since
  // we need an integer password length
  while (!passwordLength) {
    let n = parseInt(window.prompt("Please enter the length of your desired password (8 to 128 characters)"));
    if (isNaN(n) || n < 8 || n > 128) {
      continue;
    }
    passwordLength = n;
  }

  while (!ourPasswordChars.length) {
    // Prompt for lowercase
    if (evalInput(window.prompt("Would you like your password to contain lowercase characters (abc...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(lowercaseChars);
    }
    // Prompt for uppercase
    if (evalInput(window.prompt("Would you like your password to contain uppercase characters (ABC...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(uppercaseChars);
    }
    // Prompt for numeric
    if (evalInput(window.prompt("Would you like your password to contain numeric characters (0123...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(numericChars);
    }
    // Prompt for special
    if (evalInput(window.prompt("Would you like your password to contain special characters (!?#...)? [y, n]"))) {
      ourPasswordChars = ourPasswordChars.concat(specialChars);
    }
  }

  // Continually append a randomly chosen element from `ourPasswordChars` until `ourPassword` has a length of
  // `passwordLength`
  for (let i = 0; i < passwordLength; i++) {
    ourPassword.push(randChoose(ourPasswordChars));
  }
  // Finally, return the concatenation of each element as a string (what our password is in the textbox)
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
