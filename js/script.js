/* =========================================================
   WePlay - External JavaScript (js/script.js)
   CPIS-358 - JavaScript part: Nouf Seraj

   Works with the HTML pages as they are. Every feature first
   checks that its element exists on the current page, so one
   file serves all four pages.
   ========================================================= */


// ---------- Global variables ----------
var moreMatchesShown = false;  // is the extra matches table showing?
var termsAccepted = false;     // is the terms checkbox ticked?


/* ---------------------------------------------------------
   1. HELPER FUNCTIONS
   --------------------------------------------------------- */

// count the characters in a text (for...in visits every character)
function countCharacters(text) {
    var count = 0;

    for (var position in text)
        count++;

    return count;
}

// show an error message under a field and make the field red
function showError(fieldId, errorId, message) {
    document.getElementById(errorId).innerHTML = message;
    document.getElementById(errorId).style.color = "red";
    document.getElementById(errorId).style.fontSize = "14px";
    document.getElementById(fieldId).style.border = "2px solid red";
}

// remove the error message and make the field green
function showValid(fieldId, errorId) {
    document.getElementById(errorId).innerHTML = "";
    document.getElementById(fieldId).style.border = "2px solid green";
}

// return a field to its normal look
function clearField(fieldId, errorId) {
    document.getElementById(fieldId).style.border = "";
    document.getElementById(fieldId).style.backgroundColor = "";
    document.getElementById(errorId).innerHTML = "";
}

// when the user clicks inside a field, color it light yellow
function addFocusEffect(fieldId) {
    document.getElementById(fieldId).onfocus = function () {
        document.getElementById(fieldId).style.backgroundColor = "lightyellow";
    };
}


/* ---------------------------------------------------------
   3. HOME PAGE - dynamic text, dynamic picture, new elements
   --------------------------------------------------------- */

// greeting that changes with the time of day
function showGreeting() {
    var now = new Date();
    var hour = now.getHours();
    var greeting;

    if (hour < 12)
        greeting = "Good Morning";
    else if (hour < 18)
        greeting = "Good Afternoon";
    else
        greeting = "Good Evening";

    document.getElementById("idea").innerHTML =
        "<h2 id='greeting' style='color: #549554;'>" + greeting +
        ", gamer! Ready for today's matches?</h2>" +
        document.getElementById("idea").innerHTML;
}

function zoomPicture() {
    var picture = document.getElementById("logoPic");
    picture.width = 330;
    picture.height = 99;
    picture.style.border = "4px solid #549554";
    picture.style.borderRadius = "10px";
}

function resetPicture() {
    var picture = document.getElementById("logoPic");
    picture.width = 300;
    picture.height = 90;
    picture.style.border = "";
    picture.style.borderRadius = "";
}

// add the "Show more matches" button and an empty place for the table
function addMoreMatchesButton() {
    document.getElementById("matches").innerHTML +=
        "<button id='moreBtn' class='btn' onclick='toggleMoreMatches()'>" +
        "Show more matches</button>" +
        "<div id='moreMatches'></div>";
}

// return the cells of one extra match
function getMatchRow(number) {
    switch (number) {
        case 1:
            return "<td>24 Nov 2026</td><td>8:30 PM</td><td>Dota 2</td>" +
                "<td>Team Falcons vs Twisted Minds</td>";
        case 2:
            return "<td>27 Nov 2026</td><td>10:00 PM</td><td>Valorant</td>" +
                "<td>R8 Esports vs Al Qadsiah</td>";
        case 3:
            return "<td>1 Dec 2026</td><td>7:30 PM</td><td>Rocket League</td>" +
                "<td>Twisted Minds vs R8 Esports</td>";
        default:
            return "";
    } // end switch
}

// add the extra table, or delete it if it is already showing
function toggleMoreMatches() {
    var rows = "";

    if (moreMatchesShown == false) {
        // build the rows with a for loop
        for (var i = 1; i <= 3; i++) {
            rows += "<tr id='extraRow" + i + "' onmouseover='highlightRow(" + i + ")' " +
                "onmouseout='normalRow(" + i + ")'>" + getMatchRow(i) + "</tr>";
        }

        document.getElementById("moreMatches").innerHTML =
            "<table class='matches'><caption>More upcoming matches</caption>" +
            "<thead><tr><th>Date</th><th>Time</th><th>Game</th><th>Match</th></tr></thead>" +
            "<tbody>" + rows + "</tbody></table>";

        document.getElementById("moreBtn").innerHTML = "Hide extra matches";
        moreMatchesShown = true;
    }
    else {
        document.getElementById("moreMatches").innerHTML = "";   // delete the table
        document.getElementById("moreBtn").innerHTML = "Show more matches";
        moreMatchesShown = false;
    }
}

function highlightRow(number) {
    document.getElementById("extraRow" + number).style.backgroundColor = "#d9f0d9";
}

function normalRow(number) {
    document.getElementById("extraRow" + number).style.backgroundColor = "";
}


/* ---------------------------------------------------------
   4. VALIDATION FUNCTIONS (each one returns true or false)
   --------------------------------------------------------- */

function validateName() {
    var name = document.getElementById("fullName").value;

    if (name == "") {
        showError("fullName", "nameError", "Please enter your full name.");
        return false;
    }
    else if (countCharacters(name) < 3) {
        showError("fullName", "nameError", "Name must be at least 3 characters.");
        return false;
    }
    else {
        showValid("fullName", "nameError");
        return true;
    }
}

function validateEmail(fieldId, errorId) {
    var email = document.getElementById(fieldId).value;
    var atCount = 0;          // how many @ signs
    var atPosition = -1;      // where the @ is
    var dotAfterAt = false;   // is there a dot after the @ ?

    // look at every character of the email
    for (var p in email) {
        var position = parseInt(p);

        if (email[p] == "@") {
            atCount++;
            atPosition = position;
        }
        else if (email[p] == "." && atPosition > 0 && position > atPosition + 1) {
            dotAfterAt = true;
        }
    }

    if (email == "") {
        showError(fieldId, errorId, "Please enter your email.");
        return false;
    }
    else if (atCount != 1 || atPosition < 1 || dotAfterAt == false) {
        showError(fieldId, errorId, "Email must look like name@example.com.");
        return false;
    }
    else {
        showValid(fieldId, errorId);
        return true;
    }
}

function validatePhone() {
    var phone = document.getElementById("phone").value;
    var phoneLength = countCharacters(phone);
    var allDigits = true;
    var allSame = true;

    // check that every character is a digit
    for (var p in phone) {
        if (phone[p] < "0" || phone[p] > "9") {
            allDigits = false;
            break;
        }
    }

    // check if the last 8 digits are all the same, like 0555555555
    for (var q in phone) {
        if (parseInt(q) >= 2 && phone[q] != phone[2]) {
            allSame = false;
            break;
        }
    }

    if (phone == "") {
        showError("phone", "phoneError", "Please enter your phone number.");
        return false;
    }
    else if (allDigits == false) {
        showError("phone", "phoneError", "Phone number must contain digits only.");
        return false;
    }
    else if (phoneLength != 10 || phone[0] != "0" || phone[1] != "5") {
        showError("phone", "phoneError", "Phone must start with 05 and have exactly 10 digits.");
        return false;
    }
    else if (allSame == true) {
        showError("phone", "phoneError", "Please enter a real phone number.");
        return false;
    }
    else {
        showValid("phone", "phoneError");
        return true;
    }
}

// date of birth: not in the future, at least 10 years old, not more than 100 years ago
function validateBirthDate(showAlert) {
    var field = document.getElementById("birthDate");
    var message = "";

    if (field.value == "") {
        field.style.border = "";
        return true;                    // the field is optional
    }

    var birthYear = parseInt(field.value);
    var age = 2026 - birthYear;

    if (age < 0)
        message = "Date of birth cannot be in the future.";
    else if (age < 10)
        message = "You must be at least 10 years old to sign up.";
    else if (age > 100)
        message = "Please enter a valid date of birth (not more than 100 years ago).";

    if (message != "") {
        field.style.border = "2px solid red";
        if (showAlert)
            window.alert(message);
        return false;
    }
    else {
        field.style.border = "2px solid green";
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("password").value;
    var passwordLength = countCharacters(password);
    var digits = 0;
    var i = 0;

    // count the digits in the password (while loop)
    while (i < passwordLength) {
        if (password[i] >= "0" && password[i] <= "9")
            digits++;
        i++;
    }

    if (password == "") {
        showError("password", "passwordError", "Please enter a password.");
        return false;
    }
    else if (passwordLength < 8) {
        showError("password", "passwordError", "Password must be at least 8 characters.");
        return false;
    }
    else if (digits == 0) {
        showError("password", "passwordError", "Password must contain at least one number.");
        return false;
    }
    else if (digits == passwordLength) {
        showError("password", "passwordError", "Password must contain letters too.");
        return false;
    }
    else {
        showValid("password", "passwordError");
        return true;
    }
}

function validateConfirm() {
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirmPassword").value;

    if (confirm == "") {
        showError("confirmPassword", "confirmError", "Please confirm your password.");
        return false;
    }
    else if (confirm != password) {
        showError("confirmPassword", "confirmError", "Passwords do not match.");
        return false;
    }
    else {
        showValid("confirmPassword", "confirmError");
        return true;
    }
}

function validateTerms() {
    if (termsAccepted == false) {
        document.getElementById("termsError").innerHTML =
            "You must agree to the terms and conditions.";
        document.getElementById("termsError").style.color = "red";
        return false;
    }
    else {
        document.getElementById("termsError").innerHTML = "";
        return true;
    }
}

function validateLoginPassword() {
    var password = document.getElementById("loginPassword").value;

    if (password == "") {
        showError("loginPassword", "loginPasswordError", "Please enter your password.");
        return false;
    }
    else if (countCharacters(password) < 8) {
        showError("loginPassword", "loginPasswordError", "Password is at least 8 characters.");
        return false;
    }
    else {
        showValid("loginPassword", "loginPasswordError");
        return true;
    }
}


/* ---------------------------------------------------------
   5. SIGN UP PAGE
   --------------------------------------------------------- */

// runs when the Sign Up button is clicked
function validateSignup() {
    // call every check so all the errors show at once
    var nameOk = validateName();
    var emailOk = validateEmail("email", "emailError");
    var phoneOk = validatePhone();
    var birthOk = validateBirthDate(true);
    var passwordOk = validatePassword();
    var confirmOk = validateConfirm();
    var termsOk = validateTerms();

    if (nameOk && emailOk && phoneOk && birthOk && passwordOk && confirmOk && termsOk) {
        window.alert("Welcome to WePlay, " +
            document.getElementById("fullName").value + "! Your account is ready.");

        // empty the text fields
        document.getElementById("fullName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("birthDate").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        clearSignupForm();
    }
    else if (birthOk) {
        // a wrong birth date already showed its own alert
        window.alert("Please fix the fields marked in red.");
    }

    return false;   // stay on the page (there is no server)
}

// remove all colors and messages (also runs when Clear is clicked)
function clearSignupForm() {
    clearField("fullName", "nameError");
    clearField("email", "emailError");
    clearField("phone", "phoneError");
    clearField("password", "passwordError");
    clearField("confirmPassword", "confirmError");
    document.getElementById("birthDate").style.border = "";
    document.getElementById("termsError").innerHTML = "";
}

function setupSignupForm() {
    var form = document.getElementById("signupForm");

    form.onsubmit = validateSignup;
    form.onreset = function () {
        termsAccepted = false;      // Clear un-ticks the checkbox
        clearSignupForm();
    };

    addFocusEffect("fullName");
    addFocusEffect("email");
    addFocusEffect("phone");
    addFocusEffect("birthDate");
    addFocusEffect("password");
    addFocusEffect("confirmPassword");

    // check each field when the user leaves it
    document.getElementById("fullName").onblur = function () {
        document.getElementById("fullName").style.backgroundColor = "";
        validateName();
    };
    document.getElementById("email").onblur = function () {
        document.getElementById("email").style.backgroundColor = "";
        validateEmail("email", "emailError");
    };
    document.getElementById("phone").onblur = function () {
        document.getElementById("phone").style.backgroundColor = "";
        validatePhone();
    };
    document.getElementById("birthDate").onblur = function () {
        document.getElementById("birthDate").style.backgroundColor = "";
        validateBirthDate(true);
    };
    document.getElementById("password").onblur = function () {
        document.getElementById("password").style.backgroundColor = "";
        validatePassword();
    };
    document.getElementById("confirmPassword").onblur = function () {
        document.getElementById("confirmPassword").style.backgroundColor = "";
        validateConfirm();
    };

    // every click on the checkbox switches it between ticked and not ticked
    document.getElementById("terms").onclick = function () {
        termsAccepted = !termsAccepted;
        validateTerms();
    };
}


/* ---------------------------------------------------------
   6. LOGIN PAGE
   --------------------------------------------------------- */

function validateLogin() {
    var emailOk = validateEmail("loginEmail", "loginEmailError");
    var passwordOk = validateLoginPassword();

    if (emailOk && passwordOk) {
        window.alert("Login successful! Welcome back to WePlay.");
        document.getElementById("loginEmail").value = "";
        document.getElementById("loginPassword").value = "";
        clearField("loginEmail", "loginEmailError");
        clearField("loginPassword", "loginPasswordError");
    }
    else {
        window.alert("Please fix the fields marked in red.");
    }

    return false;   // stay on the page (there is no server)
}

function setupLoginForm() {
    var form = document.getElementById("loginForm");

    form.onsubmit = validateLogin;

    addFocusEffect("loginEmail");
    addFocusEffect("loginPassword");

    document.getElementById("loginEmail").onblur = function () {
        document.getElementById("loginEmail").style.backgroundColor = "";
        validateEmail("loginEmail", "loginEmailError");
    };
    document.getElementById("loginPassword").onblur = function () {
        document.getElementById("loginPassword").style.backgroundColor = "";
        validateLoginPassword();
    };
}


/* ---------------------------------------------------------
   7. START WHEN THE PAGE HAS LOADED
   --------------------------------------------------------- */

// home page
function startHome() {
    showGreeting();
    addMoreMatchesButton();
}

// sign up page
function startSignup() {
    setupSignupForm();
}

// login page
function startLogin() {
    setupLoginForm();
}
