
var gameNumber = 1;
var moreMatchesShown = false;
var termsAccepted = false;
var currentYear = 2026;
var birthMessage = "";

//  Functions and Events =====
function startHome() {
    showGreeting();
    addGamePicture();
    addMoreMatchesButton();
}

function startSignup() {
    setupSignupForm();
}

function startLogin() {
    setupLoginForm();
}

// ===== Logo hover on the home page =====

function zoomPicture() {
    document.getElementById("logoPic").style.boxShadow = "0px 0px 15px #39FF88";
    document.getElementById("logoPic").style.borderRadius = "10px";
}

function resetPicture() {
    document.getElementById("logoPic").style.boxShadow = "";
    document.getElementById("logoPic").style.borderRadius = "";
}

// ===== Greeting by time of day =====
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

// ===== Game of the day picture  =====

function getGameName(number) {
    switch (number) {
        case 1:
            return "Valorant";
        case 2:
            return "Rocket League";
        case 3:
            return "EA SPORTS FC";
        default:
            return "Dota 2";
    }
}

function getGameColor(number) {
    switch (number) {
        case 1:
            return "#ff4655";
        case 2:
            return "#0078f2";
        case 3:
            return "#1db954";
        default:
            return "#c23c2a";
    }
}

function addGamePicture() {
    document.getElementById("idea").innerHTML +=
        "<div id='gameBox'></div>" +
        "<p id='gameText'></p>" +
        "<p id='nextGames'></p>" +
        "<p><small>Click the picture to see the next game.</small></p>";

    showGame();
}

function showGame() {
    var name = getGameName(gameNumber);
    var color = getGameColor(gameNumber);
    var list = "";
    var next = gameNumber;
    var count = 1;

    document.getElementById("gameBox").innerHTML =
        "<img src='images/game" + gameNumber + ".png' alt='" + name + "' " +
        "width='300' height='100' onclick='nextGame()' " +
        "onmouseover='zoomGame(this)' onmouseout='resetGame(this)'>";

    document.getElementById("gameText").innerHTML =
        "<strong>Game of the day:</strong> " + name;
    document.getElementById("gameText").style.color = color;

    while (count <= 3) {
        next++;
        if (next > 4)
            next = 1;

        list += getGameName(next);
        if (count < 3)
            list += ", ";

        count++;
    }

    document.getElementById("nextGames").innerHTML = "Coming up next: " + list;
}

function nextGame() {
    gameNumber++;
    if (gameNumber > 4)
        gameNumber = 1;

    showGame();
}

function zoomGame(picture) {
    var color = getGameColor(gameNumber);

    picture.style.width = "330px";
    picture.style.height = "110px";
    picture.style.border = "3px solid " + color;
    picture.style.borderRadius = "14px";
    picture.style.boxShadow = "0px 0px 15px " + color;
}

function resetGame(picture) {
    picture.style.width = "300px";
    picture.style.height = "100px";
    picture.style.border = "";
    picture.style.borderRadius = "";
    picture.style.boxShadow = "";
}

// ===== Show / hide extra matches table =====

function addMoreMatchesButton() {
    document.getElementById("matches").innerHTML +=
        "<p><button id='moreBtn' class='more-btn' onclick='toggleMoreMatches()'>" +
        "Show more matches</button></p>" +
        "<div id='moreMatches'></div>";
}

function getMatchRow(number) {
    switch (number) {
        case 1:
            return "<td>24 Nov 2026</td><td>8:30 PM</td><td>Dota 2</td>" +
                "<td>Team Falcons vs Twisted Minds</td>";
        case 2:
            return "<td>27 Nov 2026</td><td>10:00 PM</td><td>Valorant</td>" +
                "<td>R8 Esports vs Al Qadsiah</td>";
        default:
            return "<td>1 Dec 2026</td><td>7:30 PM</td><td>Rocket League</td>" +
                "<td>Twisted Minds vs R8 Esports</td>";
    }
}

function toggleMoreMatches() {
    var rows = "";

    if (moreMatchesShown == false) {
        for (var i = 1; i <= 3; i++) {
            rows += "<tr onmouseover='highlightRow(this)' onmouseout='normalRow(this)'>" +
                getMatchRow(i) + "</tr>";
        }

        document.getElementById("moreMatches").innerHTML =
            "<table class='matches'><caption>More upcoming matches</caption>" +
            "<thead><tr><th>Date</th><th>Time</th><th>Game</th><th>Match</th></tr></thead>" +
            "<tbody>" + rows + "</tbody></table>";

        document.getElementById("moreBtn").innerHTML = "Hide extra matches";
        moreMatchesShown = true;
    }
    else {
        document.getElementById("moreMatches").innerHTML = "";
        document.getElementById("moreBtn").innerHTML = "Show more matches";
        moreMatchesShown = false;
    }
}

function highlightRow(row) {
    row.style.backgroundColor = "#2a3a2f";
}

function normalRow(row) {
    row.style.backgroundColor = "";
}

// ===== Form  functions=====
//  Change HTML elements and CSS styles using script
function showError(fieldId, errorId, message) {
    document.getElementById(errorId).innerHTML = message;
    document.getElementById(errorId).style.color = "#ff6b6b";
    document.getElementById(errorId).style.fontSize = "14px";
    document.getElementById(fieldId).style.border = "2px solid red";
    document.getElementById(fieldId).style.backgroundColor = "";
}

function showValid(fieldId, errorId) {
    document.getElementById(errorId).innerHTML = "";
    document.getElementById(fieldId).style.border = "2px solid #39FF88";
    document.getElementById(fieldId).style.backgroundColor = "";
}

function clearField(fieldId, errorId) {
    document.getElementById(fieldId).style.border = "";
    document.getElementById(fieldId).style.backgroundColor = "";
    document.getElementById(errorId).innerHTML = "";
}

function highlightField(fieldId) {
    document.getElementById(fieldId).style.backgroundColor = "lightyellow";
}

// ===== Form Validation functions =====

function validateName() {
    var name = document.getElementById("fullName").value;

    if (name == "") {
        showError("fullName", "nameError", "Please enter your full name.");
        return false;
    }
    else if ("" + parseInt(name) == name) {
        showError("fullName", "nameError", "Name cannot be a number.");
        return false;
    }
    else {
        showValid("fullName", "nameError");
        return true;
    }
}

function validateEmail(fieldId, errorId) {
    var email = document.getElementById(fieldId).value;

    if (email == "") {
        showError(fieldId, errorId, "Please enter your email.");
        return false;
    }
    else {
        showValid(fieldId, errorId);
        return true;
    }
}

function validatePhone() {
    var phone = document.getElementById("phone").value;
    var number = parseInt(phone);

    if (phone == "") {
        showError("phone", "phoneError", "Please enter your phone number.");
        return false;
    }
    else if ("0" + number != phone) {
        showError("phone", "phoneError", "Phone must start with 0 and contain digits only.");
        return false;
    }
    else if (number < 500000000 || number > 599999999) {
        showError("phone", "phoneError", "Phone must start with 05 and have exactly 10 digits.");
        return false;
    }
    else if ((number - 500000000) % 11111111 == 0) {
        showError("phone", "phoneError", "Please enter a real phone number.");
        return false;
    }
    else {
        showValid("phone", "phoneError");
        return true;
    }
}

function validateBirthDate() {
    var birth = document.getElementById("birthDate").value;
    var year = parseInt(birth);
    var age = currentYear - year;

    if (birth == "")
        birthMessage = "";
    else if (year > currentYear)
        birthMessage = "Date of birth cannot be in the future.";
    else if (age < 10)
        birthMessage = "You must be at least 10 years old to sign up.";
    else if (age > 100)
        birthMessage = "Please enter a valid date of birth.";
    else
        birthMessage = "";

    document.getElementById("birthDate").style.backgroundColor = "";

    if (birth == "") {
        document.getElementById("birthDate").style.border = "";
        return true;
    }
    else if (birthMessage != "") {
        document.getElementById("birthDate").style.border = "2px solid red";
        return false;
    }
    else {
        document.getElementById("birthDate").style.border = "2px solid #39FF88";
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("password").value;

    if (password == "") {
        showError("password", "passwordError", "Please enter a password.");
        return false;
    }
    else if ("" + parseInt(password) == password) {
        showError("password", "passwordError", "Password must contain letters too.");
        return false;
    }
    else if (password.toUpperCase() == password) {
        showError("password", "passwordError", "Password must contain at least one small letter.");
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
        document.getElementById("termsError").style.color = "#ff6b6b";
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
    else {
        showValid("loginPassword", "loginPasswordError");
        return true;
    }
}

// ===== Sign Up page =====
function validateSignup() {
    var nameOk = validateName();
    var emailOk = validateEmail("email", "emailError");
    var phoneOk = validatePhone();
    var birthOk = validateBirthDate();
    var passwordOk = validatePassword();
    var confirmOk = validateConfirm();
    var termsOk = validateTerms();

    if (nameOk && emailOk && phoneOk && birthOk && passwordOk && confirmOk && termsOk) {
        window.alert("Welcome to WePlay, " +
            document.getElementById("fullName").value + "! Your account is ready.");

        document.getElementById("fullName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("birthDate").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";
        clearSignupForm();
    }
    else if (birthOk == false) {
        window.alert(birthMessage + " Please fix the fields marked in red.");
    }
    else {
        window.alert("Please fix the fields marked in red.");
    }
    return false;
}

function clearSignupForm() {
    clearField("fullName", "nameError");
    clearField("email", "emailError");
    clearField("phone", "phoneError");
    document.getElementById("birthDate").style.border = "";
    document.getElementById("birthDate").style.backgroundColor = "";
    clearField("password", "passwordError");
    clearField("confirmPassword", "confirmError");
    document.getElementById("termsError").innerHTML = "";
}

function setupSignupForm() {
    document.getElementById("signupForm").onsubmit = function () {
        return validateSignup();
    };
    document.getElementById("signupForm").onreset = function () {
        termsAccepted = false;
        clearSignupForm();
    };

    document.getElementById("fullName").onfocus = function () { highlightField("fullName"); };
    document.getElementById("email").onfocus = function () { highlightField("email"); };
    document.getElementById("phone").onfocus = function () { highlightField("phone"); };
    document.getElementById("birthDate").onfocus = function () { highlightField("birthDate"); };
    document.getElementById("password").onfocus = function () { highlightField("password"); };
    document.getElementById("confirmPassword").onfocus = function () { highlightField("confirmPassword"); };

    document.getElementById("fullName").onblur = function () { validateName(); };
    document.getElementById("email").onblur = function () { validateEmail("email", "emailError"); };
    document.getElementById("phone").onblur = function () { validatePhone(); };
    document.getElementById("birthDate").onblur = function () { validateBirthDate(); };
    document.getElementById("password").onblur = function () { validatePassword(); };
    document.getElementById("confirmPassword").onblur = function () { validateConfirm(); };

    document.getElementById("terms").onclick = function () {
        termsAccepted = !termsAccepted;
        validateTerms();
    };
}

// ===== Login page=====

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
    return false;
}

function setupLoginForm() {
    document.getElementById("loginForm").onsubmit = function () {
        return validateLogin();
    };

    document.getElementById("loginEmail").onfocus = function () { highlightField("loginEmail"); };
    document.getElementById("loginPassword").onfocus = function () { highlightField("loginPassword"); };

    document.getElementById("loginEmail").onblur = function () {
        validateEmail("loginEmail", "loginEmailError");
    };
    document.getElementById("loginPassword").onblur = function () {
        validateLoginPassword();
    };
}
