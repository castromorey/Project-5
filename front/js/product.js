

function fetchProduct(){
    fetch('http://localhost:3000/api/products/415b7cacb65d43b2b5c1ff70f3393ad1').then(res=>res.json()).then(product=>{
        
        document.querySelector('#title').innerHTML=product.name;
        document.querySelector('#price').innerHTML=product.price;
        document.querySelector('#description').innerHTML=product.description;
        document.querySelector(".item__img").innerHTML=`<img src="${product.imageUrl}" alt="" />`;
        

    
            
    
    })
}

fetchProduct();

/*
prueba

let url = 'http://localhost:3000/api/products';
  fetch(url)
      .then( response => res.json() )
      .then( data => showData(data) )
      .catch( error => console.log(error) )

  const showData = (data) => {
      console.log(data)
      let body = ""
      for (var i = 0; i < data.length; i++) {      
         body+=`<tr><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].email}</td></tr>`
      }
      document.getElementById('data').innerHTML = body
 
  }*/
