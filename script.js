import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getDatabase, push, ref, onValue, set, update, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"


const firebaseConfig = {

    apiKey: "AIzaSyCsOpI3Ws8F_1BfQV4qspnjwsuDI0XavZw",
    authDomain: "store-27853.firebaseapp.com",
    databaseURL: "https://store-27853-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "store-27853",
    storageBucket: "store-27853.appspot.com",
    messagingSenderId: "1043701083439",
    appId: "1:1043701083439:web:fb04134c5441ec912d45da"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const productsArray = []
const productsNameArray = []

async function getProducts() {
    const firebaseProducts = await get(ref(db, '/products/'))
    for (let i = 0; i < firebaseProducts.val().length; i++) {
        productsArray.push(firebaseProducts.val()[i])
        productsNameArray.push(firebaseProducts.val()[i].name)
    }

    console.log(productsArray)
    console.log(productsNameArray)
    showProducts(productsArray)
    addToCart(productsArray, productsNameArray)

}
getProducts()

function showProducts() {
    for (let i = 0; i < productsArray.length; i++) {
        const productContainer = document.getElementById('product-container')
        const productCard = document.createElement('div')
        productCard.classList.add('product-card')
        productContainer.append(productCard)
        const imgContainer = document.createElement('div')
        imgContainer.classList.add('img-container')
        productCard.append(imgContainer)
        const productImg = document.createElement('img')
        productImg.classList.add('product-img')
        productImg.src = productsArray[i].imgUrl
        imgContainer.append(productImg)
        const productName = document.createElement('h3')
        productName.innerHTML = productsArray[i].name
        const productPrice = document.createElement('h2')
        productPrice.innerHTML = productsArray[i].price
        const amountInput = document.createElement('input')
        amountInput.type = 'number';
        amountInput.placeholder = "0";
        amountInput.min = "0";

        const toCartBtn = document.createElement('button')
        toCartBtn.innerHTML = 'Add to cart'
        productCard.append(productName, productPrice, amountInput, toCartBtn)

    }


}

const cartArray = []
let cartAmount = 0

function addToCart() {
    const buttons = document.querySelectorAll('button')
    buttons.forEach(button => button.addEventListener("click", function (event) {
        event.preventDefault()
        if (event.target.parentNode.childNodes[3].value == 0) {
            alert('Please provide amount')
        }

        cartArray.push({
            imgUrl: event.target.parentNode.childNodes[0].firstChild.currentSrc,
            name: event.target.parentNode.childNodes[1].innerText,
            price: event.target.parentNode.childNodes[2].innerText,
            amount: event.target.parentNode.childNodes[3].value
        })


        const IndexOfProduct = productsNameArray.indexOf(event.target.parentNode.childNodes[1].innerText)
        console.log('indexofProduct: ' + IndexOfProduct)
        if(productsArray[IndexOfProduct].inStock == 0){
            alert('This item is out of stock')
        }
        else if (event.target.parentNode.childNodes[3].value > productsArray[IndexOfProduct].inStock) {
            alert('only ' + productsArray[IndexOfProduct].inStock + ' in stock')
        }
        
        else {
            console.log(productsArray[IndexOfProduct].inStock)
            productsArray[IndexOfProduct].inStock = productsArray[IndexOfProduct].inStock - event.target.parentNode.childNodes[3].value
            console.log(productsArray[IndexOfProduct].inStock)
        }



        cartAmount++
        const cartLink = document.getElementById('cart-link')
        cartLink.innerHTML = 'Cart('+cartAmount +')'
        document.body.append(cartLink)
        console.log(cartArray)
        console.log(cartAmount)
        localStorage.setItem("cartArray", JSON.stringify(cartArray));

        event.target.parentNode.childNodes[3].value = ''
        
        

    }

    ));
    //cartArray.push({name:"John", imgURl:"Doe", age:50, eyeColor:"blue"})
}



const testArray = []
/* const testObject = {
    imgUrl: event.target.parentNode.childNodes[0].firstChild.currentSrc,
    name: event.target.parentNode.childNodes[1].innerText,
    price: event.target.parentNode.childNodes[2].innerText,
    amount: event.target.parentNode.childNodes[3].value
}; */


function addObject(array, object) {
    array.push(object)
}

//addObject(testArray, testObject)




console.log(testArray)







function changeInStock(product, newStock) {
    update(ref(db, 'products/' + product + '/'), {
        inStock: newStock
    });
}



//changeInStock(1, 4)