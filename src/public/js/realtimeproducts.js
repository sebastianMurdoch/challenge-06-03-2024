const socket=io()

socket.on("products", products=>{
    console.log(products)
    let divProducts = document.getElementById("products");

    // Generate HTML for the unordered list
    let ulHTML = "<ul>";
    products.forEach(product => {
        ulHTML += `<li>${product.id} ${product.title}</li>`;
    });
    ulHTML += "</ul>";

    divProducts.innerHTML = ulHTML;
})