let email = document.getElementById("email");
let password = document.getElementById("password");
let submit = document.getElementById("signin");
let error = document.querySelectorAll(".error");

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");
  console.log(storedEmail,storedPassword);
  

function ValidEmail() {
  if (!email.value.trim()) return RequirdField(email, 0);
  if (!emailPattern.test(email.value)) {
    error[0].innerHTML = `invalid email`;
    email.classList.remove("mb-4");
    error[0].classList.remove("none");
    return false;
  } else {
    email.classList.add("mb-4");
    error[0].classList.add("none");
    return true;
  }
}
function ValidPassword() {
  if (!password.value.trim()) return RequirdField(password, 1);
  if (!passwordPattern.test(password.value)) {
    error[1].innerHTML = `Password must be at least 8 characters long,
              include an uppercase letter, a lowercase letter, a number, 
              and a special character`;
    error[1].classList.remove("none");
    password.classList.remove("mb-4");
    return false;
  } else {
    password.classList.add("mb-4");
    error[1].classList.add("none");
    return true;
  }
}

function Submit(e) {
  e.preventDefault();
  if (ValidEmail() && ValidPassword() && email.value==storedEmail &&password.value==storedPassword) {
    console.log("ok");
    
    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
    window.location.href="../../Pages/homePage.html"
  }else{
    console.log("not match");
    
  }
}

function RequirdField(input, index) {
  error[index].innerHTML = `This field is required`;
  input.classList.remove("mb-4");
  error[index].classList.remove("none");
  return false;
}

email.addEventListener("input", function () {
  ValidEmail();
});
password.addEventListener("input", function () {
  ValidPassword();
});
submit.addEventListener("click", function (e) {
  Submit(e);
});
