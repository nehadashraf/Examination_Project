let first_name = document.getElementById("first-name");
let last_name = document.getElementById("last-name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm-password");
let All_fields = document.querySelectorAll("input");
let submit = document.getElementById("signup");
let error = document.querySelectorAll(".error");
let togglepssword=document.querySelector(".togglePassword");
let toggleConfirmPassword=document.querySelector(".toggleConfirmPassword");
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
  if (!input.value.trim()) return RequirdField(input, index);
  if (!namePattern.test(value)) {
    console.log("error");
    error[index].innerHTML = `invalid name`;
    input.classList.remove("mb-4");
    error[index].classList.remove("none");
    return false;
  } else {
    console.log("ok");
    input.classList.add("mb-4");
    error[index].classList.add("none");
    return true;
  }
}

function ValidEmail() {
  if (!email.value.trim()) return RequirdField(email, 2);
  if (!emailPattern.test(email.value)) {
    error[2].innerHTML = `invalid email`;
    email.classList.remove("mb-4");
    error[2].classList.remove("none");
    return false;
  } else {
    email.classList.add("mb-4");
    error[2].classList.add("none");
    return true;
  }
}
function ValidPassword() {
  if (!password.value.trim()) return RequirdField(password, 3);
  if (!passwordPattern.test(password.value)) {
    error[3].innerHTML = `Password must be at least 8 characters long,
            include an uppercase letter, a lowercase letter, a number, 
            and a special character`;
    error[3].classList.remove("none");
    password.classList.remove("mb-4");
    return false;
  } else {
    password.classList.add("mb-4");
    error[3].classList.add("none");
    return true;
  }
}
function ValidConfirmPassword() {
  if (!confirm_password.value.trim()) return RequirdField(confirm_password, 4);
  if (!(password.value === confirm_password.value)) {
    error[4].innerHTML = `Password doesn't match`;
    error[4].classList.remove("none");
    return false;
  } else {
    error[4].classList.add("none");
    return true;
  }
}
function RequirdField(input, index) {
  error[index].innerHTML = `This field is required`;
  input.classList.remove("mb-4");
  error[index].classList.remove("none");
  return false;
}
function showHidePassword(input,field){
  let icon=input.querySelector("i");
  console.log(icon.classList.contains);
  if (icon.classList.contains("fa-eye")) {
    field.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    field.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

function Submit(e) {
  e.preventDefault();
  if (
    ValidName(first_name, first_name.value, 0) &&
    ValidName(last_name, last_name.value, 1) &&
    ValidEmail() &&
    ValidPassword() &&
    ValidConfirmPassword() 
  ) {
    localStorage.setItem("email",email.value);
    localStorage.setItem("password",password.value);
    document.querySelectorAll("input").forEach((input)=>{
      input.value="";
    })
    window.location.href="../../Pages/signin.html"
  }
}

first_name.addEventListener("input", function () {
  ValidName(this, this.value, 0);
});
last_name.addEventListener("input", function () {
  ValidName(this, this.value, 1);
});
email.addEventListener("input", function () {
  ValidEmail();
});
password.addEventListener("input", function () {
  if (ValidPassword()) {
    ValidConfirmPassword();
  }
});
confirm_password.addEventListener("input", function () {
  ValidConfirmPassword();
});
submit.addEventListener("click", function (e) {
  Submit(e);
});
togglepssword.addEventListener("click", function () {
  showHidePassword(togglepssword,password)
});
toggleConfirmPassword.addEventListener("click", function () {
  showHidePassword(toggleConfirmPassword,confirm_password)
});

