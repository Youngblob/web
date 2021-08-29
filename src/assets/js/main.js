
header = "./includes/header.html"

fetch(header).then(response => {
    return response.text()
  })
  .then(data => {
    console.log(data)
    document.querySelector("header").innerHTML = data;
});

fetch("./includes/footer.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("footer").innerHTML = data;
});

