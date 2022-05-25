//this function send a request to the backend to show the list products

function fetchProducts(){
    fetch('http://localhost:3000/api/products').then(res=>res.json()).then(products=>{ //http is endpoint url to interact with an external API
        const items = document.querySelector('#items');
        console.log(products);

        products.forEach(product => {
            items.innerHTML+=`
            <a href="./product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>
          </a>
            `
    
        });
    })
}

fetchProducts();

