# Module 3 - Challenge by Luc Tourangeau

In this challenge, I had to modify the existing code for a password generation webpage.
This webpage needed to at the bare minimum:
* Upon clicking the "generate password button, start the password generation process which
  is nothing more than a series of prompts
* Prompt the user for the length of the password (only valid between 8 and 128 characters)
* Prompt the user for the characters that should constitute the password:
  * Prompt (true/false) if the user wants lowercase characters in their password
  * Prompt (true/false) if the user wants uppercase characters in their password
  * Prompt (true/false) if the user wants numeric characters in their password
  * Prompt (true/false) if the user wants special characters in their password
* Output the generated password to a text box on the webpage

## Rationale
To achieve the various acceptance criteria, I made some design choices. No one knows better
than front-end programmers that if there is a way to break code then users will find it. The
first user prompt asking the length of the password was designed as follows:
```javascript
var passwordLength;
while (!passwordLength) {
  let n = parseInt(window.prompt("Please enter the length of your desired password (8 to 128 characters)"));
  if (isNaN(n) || n < 8 || n > 128) {
    continue;
  }
  passwordLength = n;
```
The code within the while-loop is straight forward and essentially tries to parse out an
integer from the user input string and if this string is between 8 and 128 then we set our
`passwordLength` variable to the parsed-out integer. `parseInt` is a robust function that
will either return NaN (Not a Number) or an integer-valued Number so I can very easily test
if the user input was valid by checking if it was evaluated to a NaN. Obviously, if parseInt
returned a numeric value then we can check if it is between 8 and 128 by using our less-than
and greater-than symbols.

I made great use of this while-loop pattern:
```javascript

while (condition that is true until valid user input) {
  ... code here ...
}
```
This code pattern allows my webpage to continually prompt a user until they provide valid input.

NOTE: `parseInt` will truncate any decimal out of a Number in the user input. I see this as
desired behavior since a user that asks for a password that is 32.4 characters long should not
be upset with receiving a 32 character long password.

To achieve the series of prompts asking the user for the types of characters they wish to
have in their password, I once more utilized the while-loop pattern above:
```javascript
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz".split('');
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
const numericChars = "0123456789".split('');
const specialChars = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split(''); // We must escape \  hence \\ and \"

var ourPasswordChars = []; // array of valid characters for our password
while (!ourPasswordChars.length) {
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
```

NOTE: I have a helper function not defined in this code snippet (`evalInput`). This function merely evaluates a string
for various human-style ways of saying no: 'no', 'naw', 'false', 'deny', etc. (importantly, the blank string, '', also
evaluates to false since it reflects that the user entered no value whatsoever) to a boolean (true/false).

If `evalInput` evaluates to true then we say these set of characters are potentially going to be in our password by 
concatenating the set of characters to our initially empty array `ourPasswordChars`. 

Finally, using our `passwordLength` and `ourPasswordchars` we can make our random password using a for-loop:
```javascript
var ourPassword = [];

function randChoose(array) {
  return array[Math.floor(array.length*Math.random())];
}

for (let i = 0; i < passwordLength; i++) {
  ourPassword.push(randChoose(ourPasswordChars));
}
return ourPassword.join('');
```
The `randChoose` function is a simple random element selecting pattern for an array. By multiplying our array's
length by Math.random (a number between 0 and 1) we can get a random number between 0 and the length of our array.
This random number can be translated into a random index of our array by using the `Math.floor` function which
outputs a random integer-valued number between 0 and our array's length - 1 which, trivially, can be used to access
a random element at that particular index.

Our for-loop appends a randomly chosen element from our array containing the complete set of user specified characters to
an array until it has a length equal to `passwordLength`.

Finally, to get a password from this array we use the `Array.join` method with a blank string ('') separating each character
in our password array `ourPassword` and this is what is output into the text box of the webpage.















