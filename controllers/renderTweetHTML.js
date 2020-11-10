var htmlString = document.currentScript.getAttribute('test')
var index = document.currentScript.getAttribute('index')
var candidate = document.currentScript.getAttribute('candidate')
var para = document.createElement("p");
para.innerHTML = htmlString
var element = document.getElementById(`${candidate}${index} `);
if(index == "0") {
  element.classList.add("active")
}
element.appendChild(para);