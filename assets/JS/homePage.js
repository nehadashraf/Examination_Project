const startHtml =document.getElementById("html-exam")
const startCss =document.getElementById("css-exam")
const startJs =document.getElementById("js-exam");
const name =document.getElementById("name");
const logout=document.querySelector(".logout")

name.innerHTML = `Hello, ${localStorage.getItem("fistName")}`;


function logoutUser() {
  
  localStorage.clear();

  
  window.location.href="../../Pages/signup.html"; 
}
logout.addEventListener("click",logoutUser);


console.log(startCss);
startHtml.addEventListener("click",function(){
  const data = { key: "HTML"};
  const params = new URLSearchParams(data);
  window.location.href = `../../Pages/exam.html?${params}`;
})
startCss.addEventListener("click",function(){
  const data = { key: "CSS"};
  const params = new URLSearchParams(data);
  window.location.href = `../../Pages/exam.html?${params}`;
})
startJs.addEventListener("click",function(){
  const data = { key: "JS"};
  const params = new URLSearchParams(data);
  window.location.href = `../../Pages/exam.html?${params}`;
})
