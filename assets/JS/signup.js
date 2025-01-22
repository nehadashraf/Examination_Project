let first_name = document.getElementById("first-name");
let last_name = document.getElementById("last-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm-password");
let All_fields = document.querySelectorAll("input");
let submit = document.getElementById("signup");
let error = document.querySelectorAll(".error");
console.log(All_fields);

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const namePattern = /^[A-Z`a-z]+([ A-Za-z'-]*[A-Za-z])?$/;
const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  let isValidFirstName = false,
  isValidLastName = false,
  isValidEmail = false,
  isValidPassword = false,
  isValidConfirmPassword = false;


function ValidName(input, value, index) {
  if (!namePattern.test(value)) {
    console.log("error");
    error[index].innerHTML = `invalid name`;
    input.classList.remove("mb-4");
    error[index].classList.remove("none");
  } else {
    console.log("ok");
    input.classList.add("mb-4");
    error[index].classList.add("none");
    if(input==first_name)
    {
      isValidFirstName=true;
    }
    else{
      isValidLastName=true
    }
  }
}
function ValidEmail(value, index) {
  if (!emailPattern.test(value)) {
    error[index].innerHTML = `invalid email`;
    email.classList.remove("mb-4");
    error[index].classList.remove("none");
  } else {
    email.classList.add("mb-4");
    error[index].classList.add("none");
    isValidEmail=true;
  }
}
function ValidPassword(value, index) {
  if (!passwordPattern.test(value)) {
    error[index].innerHTML = `Password must be at least 8 characters long,
            include an uppercase letter, a lowercase letter, a number, 
            and a special character`;
    error[index].classList.remove("none");
    password.classList.remove("mb-4");
  } else {
    password.classList.add("mb-4");
    error[index].classList.add("none");
    isValidPassword=true;
    return true;
  }
}
function ValidConfirmPassword(value, index) {
  if (!(value === password.value)) {
    error[index].innerHTML = `Password doesn't match`;
    error[index].classList.remove("none");
  } else {
    error[index].classList.add("none");
    isValidConfirmPassword=true;
  }
}

 function Submit(e) {
  
  e.preventDefault();
  let correct = 0;

  const inputs = [
    { field: first_name, error: error[0] },
    { field: last_name, error: error[1] },
    { field: email, error: error[2] },
    { field: password, error: error[3] },
    { field: confirm_password, error: error[4] },
  ];
  inputs.forEach((input) => {
    if (!input.field.value.trim()) {
      input.error.innerHTML = "This Field Is Required";
      input.field.classList.remove("mb-4");
      input.error.classList.remove("none");
      if(input.field==first_name)
      {
        isValidFirstName=false
      }
      if(input.field==last_name)
      {
        isValidLastName=false;
      }
      if(input.field==email)
      {
        isValidEmail=false;
      }
      if(input.field==password)
      {
        isValidPassword=false;
      }
      if(input==confirm_password)
      {
        isValidConfirmPassword=false;
      }
    } else {
      input.error.innerHTML = "";
      input.error.classList.add("none");
      input.field.classList.add("mb-4");
      
    }
  });
  
  if (isValidFirstName&&isValidLastName&&isValidEmail&&isValidPassword&&isValidConfirmPassword) {
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    console.log("Signup successful!");
  }
} 

first_name.addEventListener("input", function () {
  ValidName(this, this.value, 0);
});
last_name.addEventListener("input", function () {
  ValidName(this, this.value, 1);
});
email.addEventListener("input", function () {
  ValidEmail(this.value, 2);
});
password.addEventListener("input", function () {
  if (ValidPassword(this.value, 3)) {
    ValidConfirmPassword(confirm_password.value, 4);
  }
});
confirm_password.addEventListener("input", function () {
  ValidConfirmPassword(this.value, 4);
});
submit.addEventListener("click", function (e) {
  Submit(e);
});
