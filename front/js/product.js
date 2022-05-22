function fetchProduct(){
    fetch('http://localhost:3000/api/products/415b7cacb65d43b2b5c1ff70f3393ad1').then(res=>res.json()).then(product=>{
        document.querySelector('#title').innerHTML=product.name;
        document.querySelector('#price').innerHTML=product.price;
        document.querySelector('#description').innerHTML=product.description;
        //document.querySelector('#item__content').innerHTML=product.imageUrl;
      

        
            
    
    })
}

fetchProduct();