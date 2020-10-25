htmlString = document.currentScript.getAttribute('test')
var para = document.createElement("p");
para.innerHTML = htmlString
var element = document.getElementById("div1");
element.appendChild(para);