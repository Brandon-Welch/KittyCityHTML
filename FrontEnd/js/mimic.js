// I am going for an SPA (Single Page Application)

/*
    It is helpful to organize your function into two types

        - Communication with your API
            - This things like your specific endpoints
            - all the CRUD operations for your api should be established and tested first in your script before you go ahead and start using them
        - Manipulating your DOM
            - Generating and tearing down components


*/

const BASE_URL = "http://localhost:5123";

let current_user = {};


// This means I need functions that can be run to create entire components on the fly, and tear them down once I am done with them

// I want to do this, so that I can keep track of the users' information on the same script

// User Container Div
const userContainerDiv = document.querySelector("#user-authorization-container");

// User homepage containers
const homePageContainerDiv = document.querySelector("#home-page-container");
const userProfileContainerDiv = document.querySelector("#user-profile-container");
const newCategoryContainerDiv = document.querySelector("#new-category-container");
const newProductContainerDiv = document.querySelector("#new-product-container");
const allProductsContainerDiv = document.querySelector("#all-products-container");




// Login Container Creation Function
function GenerateLoginContainer() {
    // Create the main login container div
    let loginDiv = document.createElement("div");
    loginDiv.id = "login-container";

    // Create the username input field and label
    let usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username-input';

    let usernameInputLabel = document.createElement('label');
    usernameInputLabel.textContent = "Username";

    // Create the password input field and label
    let passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password-input';

    let passwordInputLabel = document.createElement('label');
    passwordInputLabel.textContent = "Password";

    // Create the login button
    let loginButton = document.createElement('button');
    loginButton.textContent = "Login";

    // Append the login container to the main user container
    userContainerDiv.appendChild(loginDiv);

    // Append the username and password fields and labels to the login container
    loginDiv.appendChild(usernameInputLabel);
    loginDiv.appendChild(usernameInput);
    loginDiv.appendChild(passwordInputLabel);
    loginDiv.appendChild(passwordInput);
    loginDiv.appendChild(loginButton);

    // Add an event listener to the login button to handle login
    loginButton.addEventListener("click", GetLoginInformation);
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
    let username = document.querySelector("#username-input").value;
    let password = document.querySelector("#password-input").value;

    // Call the function to log in the user
    LoginUser(username, password);
}



// Generate and tear down a login component
GenerateLoginContainer();
// TeardownLoginContainer(); // Uncomment this line to tear down the login component



// Generate a homepage for the user

function generateHomePageContainer(userData){

    generateUserProfileContainer(userData);
    generateNewCategoryContainer();
    generateNewProductContainer();
    generateAllProductsContainer();
}

// teardown the homepage for the user
function tearDownHomePageContainer(){
    while(homePageContainer.firstChild){
        homePageContainer.firstChild.remove();
    }
}


function generateNewCategoryContainer(){

    // This is used to wipe the slate clean
    // To prevent any kind of duplicate
    while(newCategoryContainerDiv.firstElementChild){
        newCategoryContainerDiv.firstElementChild.remove();
    }

    let categoryNameInput = document.createElement("input");
    categoryNameInput.id = "category-name-input";
    categoryNameInput.type = "text";
    categoryNameInput.placeholder = "Food, Drink, etc";

    let categoryLabel = document.createElement("h5");
    categoryLabel.textContent = "New Category Creator";

    let categorySubmitButton = document.createElement("button");
    categorySubmitButton.textContent = "Submit";

    newCategoryContainerDiv.appendChild(categoryLabel);
    newCategoryContainerDiv.appendChild(categoryNameInput);
    newCategoryContainerDiv.appendChild(categorySubmitButton);

}

function generateNewProductContainer(){
    while(newProductContainerDiv.firstChild){
        newProductContainerDiv.firstChild.remove();
    }

    let productNameInput = document.createElement("input");
    productNameInput.id = "product-name-input";
    productNameInput.type = "text";

    let productPriceInput = document.createElement("input");
    productPriceInput.id = "product-price-input";
    productPriceInput.type = "number";

    let productCategoryInput = document.createElement("input");
    productCategoryInput.id = "product-category-input";
    productCategoryInput.type = "text";

    let productAvailableInput = document.createElement("input");
    productAvailableInput.id = "product-available-input";
    productAvailableInput.type = "checkbox";

    let productLabel = document.createElement("h5");
    productLabel.textContent = "New Product Creator";

    let productSubmitButton = document.createElement("button");
    productSubmitButton.textContent = "Submit";

    productSubmitButton.addEventListener("click", getNewProductInput);


    newCategoryContainerDiv.appendChild(productLabel);
    newCategoryContainerDiv.appendChild(productNameInput);
    newCategoryContainerDiv.appendChild(productPriceInput);
    newCategoryContainerDiv.appendChild(productCategoryInput);
    newCategoryContainerDiv.appendChild(productAvailableInput);
    newCategoryContainerDiv.appendChild(productSubmitButton);

}

function getNewProductInput(){
    let name = document.querySelector("#product-name-input").value;
    let price = document.querySelector("#product-price-input").value;
    let category = document.querySelector("#product-category-input").value;
    let available = document.querySelector("#product-available-input").checked;

    if(name && price && category){
        CreateNewProduct(name, price, category, available);
    }else{
        NewProductErrorField();
    }

}

// This is not really functionality, it is UI/UX things for the website which make the process of interacting with your website better for the user.
function NewProductErrorField(){
    // generate components on the page that tell the user that they have done something wrong that is not a pop box
    // alert("You need to provide fields");

}


function generateUserProfileContainer(userData){

    while(userProfileContainerDiv.firstChild){
        userProfileContainerDiv.firstChild.remove()
    }

    let userHeader = document.createElement("h2");

    userHeader.textContent = userData.username;

    userProfileContainerDiv.appendChild(userHeader);
}

async function generateAllProductsContainer(){

    while(allProductsContainerDiv.firstChild){
        allProductsContainerDiv.firstChild.remove();
    }

    let products = await GetAllProducts();
    for (const product of products) {
        let elementCreated = generateProductElement(product);
        allProductsContainerDiv.appendChild(elementCreated);
    }
}


// generate product element
function generateProductElement(product){
    let productElementDiv = document.createElement("div");
    productElementDiv.id = `product-${product.productId}`;
    let productIdLabel = document.createElement("h5");
    productIdLabel.textContent = product.productId;
    let productNameLabel = document.createElement("h5");
    productNameLabel.textContent = product.name;
    let productPriceLabel = document.createElement("h5");
    productPriceLabel.textContent = product.price;
    let productCategoryNameLabel = document.createElement("h5");
    productCategoryNameLabel.textContent = product.categoryName;
    let productAvailableLabel = document.createElement("h5");
    console.log(product);
    if(product.isAvailable){
        productAvailableLabel.textContent = "Available";
    }else{
        productAvailableLabel.textContent = "Unavailable";
    }

    productElementDiv.appendChild(productIdLabel);
    productElementDiv.appendChild(productNameLabel);
    productElementDiv.appendChild(productPriceLabel);
    productElementDiv.appendChild(productCategoryNameLabel);
    productElementDiv.appendChild(productAvailableLabel);


    productElementDiv.style.border = "thick solid #0000FF";
    productElementDiv.style.textAlign = "center";

    return productElementDiv;
}


// User Controller Functions

// Function to log in the user

/*
    This is a combination of Async Await and the Fetch API

    The Fetch API is dedicated to doing asynchronous network requests
    By default the Fetch API will be doing GET requests to a specific endpoint

    The syntax of a fetch request looks like this:


    fetch("URL", {REQUEST DATA BODY})

    for example a GET Request would look like this:

    fetch("URL"); // this is because by default the Fetch API will do a get request so you do not have to provide a request body


    For a post request, and any request other than a GET request, you have to provide the request body object


    First thing you need, is the URL that you want to communicate with. For this example, we are attempting to login to our database, and so we are communicating the the User controller, with the login action that is routed to /login

    so the URL for that specific action is POST : http://localhost:5236/Users/login

    To make a fetch request a POST request, the second parameter to the fetch() call is an object that defines the request

    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({JS Object})
    }

*/
async function LoginUser(username, password) {
    try {
        let response = await fetch(`${BASE_URL}/Users/login`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json" // Corrected the content type to 'application/json'
            },
            body: JSON.stringify({
                "Username": username, 
                "Password": password
            })
        });

        let data = await response.json();
        current_user = data;

        TeardownLoginContainer()
        generateHomePageContainer(data);
        // console.log(data);
    } catch (e) {
        console.error('Error logging in:', e); // Added error logging
    }
}

async function GetAllUsers(){
    try{
        let response = await fetch(`${BASE_URL}/Users`);
        let data = await response.json();
        console.log(data);
        return data;
    }catch(Error){
        console.error(Error);
    }
}

async function GetUserById(id){
    try{
        let response = await fetch(`${BASE_URL}/Users/${id}`);
        let data = await response.json();
        console.log(data);
        return data;
    }catch(Error){
        console.error(Error);
    }
}

// This function is used to create a new user
// This is a critical function for registering someone in this application
// After having made this function, and tested it out, you can now build out the inputs and buttons needed to allow someone to create a user from the website

async function CreateNewUser(username, password, email){
    try{
        let response = await fetch(`${BASE_URL}/Users`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json" // Corrected the content type to 'application/json'
            },
            body: JSON.stringify({
                "Username": username, 
                "Password": password,
                "Email": email
            })
        });
        // let data = await response.json();
        // console.log(data);
        console.log(response);
        if(response.ok){
            // alert will create a pop up box that the user will see no matter waht
            // This is not a good way of telling the user that what they did was successful or unsuccessful, it is just here as a placeholder for development purposes
            // A preferable solution is a modal
            alert("User is created!")
        }else{
            alert("User was not created")
        }
    }catch(error){
        console.error(error);
    }
}

// CRUD functions for these data models

// Products
// CREATE
async function CreateNewProduct(Name, Price, CategoryName, IsAvailable){
    try{
        let response = await fetch(`${BASE_URL}/Products`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json" // Corrected the content type to 'application/json'
            },
            body: JSON.stringify({
                "ProductId": -1,
                Name,
                Price,
                CategoryName,
                IsAvailable
            })
        });
        // let data = await response.json();
        // console.log(data);
        console.log(response);
        if(response.ok){
            // alert will create a pop up box that the user will see no matter waht
            // This is not a good way of telling the user that what they did was successful or unsuccessful, it is just here as a placeholder for development purposes
            // A preferable solution is a modal
            alert("Product is created!")
        }else{
            alert("Product was not created")
        }
    }catch(error){
        console.error(error);
    }
}
// READ
// Get by id
async function GetProductById(id){
    try{
        let response = await fetch(`${BASE_URL}/Products/${id}`);
        let data = await response.json();
        console.log(data);
    }catch(error){
        console.error(error);
    }
}

// Get all of them
async function GetAllProducts(){
    try{
        let response = await fetch(`${BASE_URL}/Products`);
        let data = await response.json();
        return data;
    }catch(error){
        console.error(error);
    }
}
// UPDATE
// DELETE

// Categories
// CREATE
async function CreateNewCategory(Name){
    try{
        let response = await fetch(`${BASE_URL}/Categories`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json" // Corrected the content type to 'application/json'
            },
            body: JSON.stringify({
                Name
            })
        });
        // let data = await response.json();
        // console.log(data);
        console.log(response);
        if(response.ok){
            // alert will create a pop up box that the user will see no matter waht
            // This is not a good way of telling the user that what they did was successful or unsuccessful, it is just here as a placeholder for development purposes
            // A preferable solution is a modal
            alert("Category is created!")
        }else{
            alert("Category was not created")
        }
    }catch(error){
        console.error(error);
    }
}
// READ
// UPDATE
// DELETE


// Test these API calls as you are making them so that you can verify that it works inside your script before you actually use them in your website
// GetAllUsers();
// GetUserById(1);

// CreateNewUser("user2", "pass2", "user2@email.com");


// CreateNewCategory("Drink");
// CreateNewCategory("Toy");
// CreateNewCategory("Electronic");


// CreateNewProduct("Water", 1.00, "Drink", true);
// CreateNewProduct("Pokemon Toy", 2.00, "Toy", true);
// CreateNewProduct("Gadget", 20.00, "Electronic", true);


// GetAllProducts();
// GetProductById(2);