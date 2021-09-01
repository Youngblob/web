
let header = "./includes/header.html"
if(["/dash","/dash.html","/src/dash.html"].includes(window.location.pathname)){
  header = "./includes/header-dash.html"
}

console.log(header,window.location.pathname)
fetch(header).then(response => {
    return response.text()
  })
  .then(data => {
    // console.log(data)
    document.querySelector("header").innerHTML = data;
});

fetch("./includes/footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    try{
      document.querySelector("footer").innerHTML = data;

    }
    catch(e){}
});

