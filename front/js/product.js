
const colorsElm = document.querySelector('#colors');
const qtyElm = document.querySelector('#quantity');

const searchParams = new URLSearchParams(location.search);
const productId = searchParams.get('id');

let data = {};

//this function make a request to the API to show list product
function fetchProduct(){ 
    fetch('http://localhost:3000/api/products/' + productId).then(res=>res.json()).then(({name, price, imageUrl, ...product})=>{
        
        data = {
            name,
            price, 
            imageUrl
        };
        
        document.title = name;
        document.querySelector('#title').innerHTML=name;
        document.querySelector('#price').innerHTML=price;
        document.querySelector('#description').innerHTML=product.description;
        document.querySelector(".item__img").innerHTML=`<img src="${imageUrl}" alt="${product.altTxt}" />`;
        
        product.colors.map((color) => {
            colorsElm.innerHTML+=`<option value="${color}">${color}</option>`;
        });
        
        
    })
}

fetchProduct(); //This function add items to the cart page

const addToCart = () => {



    data = {
        ...data,
        productId,
        color: colorsElm.value,
        qty: Number(qtyElm.value)
    }

    // console.log(data)

    const errors = {};
    
    // if(document.querySelector('.item__content__settings__color p')) document.querySelector('.item__content__settings__color p').innerHTML = ``;


    if(!data.color) {
        errors.color = 'Must select a color.'
        alert(errors.color);
        return;
        //console.dir(document.querySelector('#colors'));
        // document.querySelector('#colors').parentElement.innerHTML += `<p style="color: red;">${errors.color}</p>`;

    }

  

    if(!data.qty) {
        errors.qty = 'Quantity must be 1 or more'
        alert(errors.qty);
        return;
        //document.querySelector('.item__content__settings__quantity').parentElement.innerHTML += '<p>Quantity must be 1 or more</p>';
    }

    

    //list from local storage
    if(Object.keys(errors).length === 0 ) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

     
     const product = cart.find(item => item.productId === data.productId && item.color === data.color );
        if(product) {
            product.qty = product.qty + data.qty;

            //console.log({cart})

            cart = cart.filter(item => {
                return product.productId !== item.productId
            })

            //console.log({cart})

            localStorage.setItem('cart', JSON.stringify([...cart, product]))
     
        }else{
            localStorage.setItem('cart', JSON.stringify([...cart, data]))
        }

        alert('Product added to cart')
       
    }else{
        console.log({errors})
    }

}
addToCart.innerHTML = 'Item added to the cart';
document.querySelector('#addToCart').addEventListener('click', addToCart );
