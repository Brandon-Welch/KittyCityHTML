
//Base URL
const BASE_URL = "http://localhost:5123";

let current_user = {};
{

// User Container Div
const userContainerDiv = document.querySelector("#user-authorization-container");

// Login Container Creation Function
function GenerateLoginContainer() {
    // Create the main login container div
    let loginDiv = document.createElement("div");
    loginDiv.id = "login-container";

    /*
    // Create the username input field and label
    let usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = "Enter Username"; //add default text in field
    usernameInput.setAttribute("required","required") //makes field required
    usernameInput.id = 'username-input';

    let usernameInputLabel = document.createElement('label');
    usernameInputLabel.textContent = "Username";

    // Create the password input field and label
    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = "Enter Password"; //add default text in field
    usernameInput.setAttribute("required","required")//makes field required
    passwordInput.id = 'password-input';

    let passwordInputLabel = document.createElement('label');
    passwordInputLabel.textContent = "Password";
*/

    // Create the login button
    let loginButton = document.createElement('button');
    loginButton.textContent = "Login";

    // Append the login container to the main user container
    userContainerDiv.appendChild(loginDiv);

    // Append the username and password fields and labels to the login container
        //loginDiv.appendChild(usernameInputLabel);
        //loginDiv.appendChild(usernameInput);
        //loginDiv.appendChild(passwordInputLabel);
        //loginDiv.appendChild(passwordInput);
    loginDiv.appendChild(loginButton);

    // Add an event listener to the login button to handle login
    loginButton.addEventListener("click", ()=>{
        window.open("file:///C:/Users/A140953/Documents/RevatureTraining/KittyCity/KittyCityHTML/FrontEnd/services.html");
    });
}

// Function to tear down the login container
function TeardownLoginContainer() {
    // Find the login container
    let loginDiv = document.querySelector("#login-container");

    // If the login container exists, remove all its children
    if (loginDiv != null) {
        while (loginDiv.firstChild) {
            loginDiv.firstChild.remove();
        }
    }
}

// Function to get login information from input fields
function GetLoginInformation() {
    let userName = document.querySelector("#username-input").value;
    let userPassword = document.querySelector("#password-input").value;

    // Call the function to log in the user
    LoginUser(userName, userPassword);
}

// Function to log in the user
async function LoginUser(userName, userPassword) {
    try {
        let response = await fetch(`${BASE_URL}/Login/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json" // Corrected the content type to 'application/json'
            },
            body: JSON.stringify({
                "userName": userName, 
                "userPassword": userPassword
            })
        });

        let data = await response.json();
        current_user = data;
        console.log(current_user);
        console.log(data);
    } catch (e) {
        console.error("Error logging in:", e); // Added error logging
    }
}

// Generate and tear down a login component
GenerateLoginContainer();


}

//Function to clear login form and display welcome back message after login
function displayGreeting(event) {
    event.preventDefault();
    document.getElementById('confirmationDiv').innerHTML = 'Hello, Welcome back to Kitty City!';
  }



/*
/////////////////////////////////
////////// Register /////////////
/////////////////////////////////

// Register Container Div
const registerContainerDiv = document.querySelector("#register-authorization-container");

// Register Container Creation Function
function GenerateRegisterContainer() {
    // Create the main register container div
    let registerDiv = document.createElement("div");
    registerDiv.id = "login-container";

    // Create the username input field and label
    let usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = "Enter Username"; //add default text in field
    usernameInput.setAttribute("required","required") //makes field required
    usernameInput.id = 'username-input';

    let usernameInputLabel = document.createElement('label');
    usernameInputLabel.textContent = "Username";

    // Create the password input field and label
    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = "Enter Password"; //add default text in field
    usernameInput.setAttribute("required","required")//makes field required
    passwordInput.id = 'password-input';

    let passwordInputLabel = document.createElement('label');
    passwordInputLabel.textContent = "Password";

    // Create the email input field and label
    let emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.placeholder = "Enter E-mail"; //add default text in field
    emailInput.setAttribute("required","required") //makes field required
    emailInput.id = 'email-input';

    let emailInputLabel = document.createElement('label');
    emailInputLabel.textContent = "Email";

    // Create the register button
    let registerButton = document.createElement('button');
    registerButton.textContent = "Register";

    // Append the register container to the main register container
    registerContainerDiv.appendChild(registerDiv);

    // Append the username, password, and fields and labels to the register container
    registerDiv.appendChild(usernameInputLabel);
    registerDiv.appendChild(usernameInput);
    registerDiv.appendChild(passwordInputLabel);
    registerDiv.appendChild(passwordInputLabel);
    registerDiv.appendChild(emailInput);
    registerDiv.appendChild(emailInput);
    registerDiv.appendChild(registerButton);

    // Add an event listener to the register button to handle register
    registerButton.addEventListener("click", GetRegisterInformation);
}
// Function to tear down the register container
function TeardownRegisterContainer() {
    // Find the register container
    let registerDiv = document.querySelector("#register-container");

    // If the register container exists, remove all its children
    if (registerDiv != null) {
        while (registerDiv.firstChild) {
            registerDiv.firstChild.remove();
        }
    }
}

// Function to get register information from input fields
function GetRegisterInformation() {
    let userName = document.querySelector("#username-input").value;
    let userPassword = document.querySelector("#password-input").value;
    let userEmail = document.querySelector("#userEmail-input").value;

    // Call the function to register the user
    RegisterUser(userName, userPassword, userEmail);
}

// Function to register the user
async function RegisterUser(userName, userPassword, userEmail) {
    try {
        let response = await fetch(`${BASE_URL}/Person`, { //FIXME: is this right????????
            method: "POST",
            headers: {
                'Content-Type': "application/json" // Corrected the content type to 'application/json'
            },
            body: JSON.stringify({
                "userName": userName, 
                "userPassword": userPassword,
                "userEmail": userEmail
            })
        });

        let data = await response.json();
        current_user = data;
        console.log(current_user);
        console.log(data);
    } catch (e) {
        console.error("Error registering:", e); // Added error logging
    }
}

// Generate and tear down a login component
GenerateRegisterContainer();

*/