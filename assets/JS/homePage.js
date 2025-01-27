let startHtml =document.getElementById("html-exam")
let startCss =document.getElementById("css-exam")
let startJs =document.getElementById("js-exam");
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
