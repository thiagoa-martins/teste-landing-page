const boxProducts = document.querySelector("#boxProducts");
const buttonMoreProducts = document.getElementById("buttonMoreProducts");

let products = "";

fetch("https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1")
.then(turnIntoJson)
.then(listProducts)
.then(displayProducts)

buttonMoreProducts.addEventListener("click", function() {
    fetch("https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1")
    .then(turnIntoJson)
    .then(newPage)  
});

function turnIntoJson(response) {
  return response.json();
}

function listProducts(response) {

    response.products.forEach(product => {
        products += `
            <div class="product">
                <div class="image">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                
                <div class="product-information">
                    <h4 class="title-product">Produto ${product.id + 1}</h4>
    
                    <p class="description">
                        ${product.description}
                    </p>
    
                    <span class="old-price">De: R$ ${product.oldPrice},00</span>
    
                    <span class="new-price">Por: R$ ${product.price},00<span>ou ${product.installments.count}x de R$ ${product.installments.value}</span></span>
    
                    <button class="button">Comprar</button>            
                </div>                 
            </div>
        `;
    });

    return products;
}

function displayProducts(products) {
    boxProducts.innerHTML = products;
}

function newPage(response) {
    const newPage = response.nextPage;
    
    fetch(`https://${newPage}`)
    .then(turnIntoJson)
    .then(listProducts)
    .then(displayProducts)
    
    buttonMoreProducts.classList.add("hidden-button");
}

const form = document.querySelector("#form");
const inputSubmit = document.querySelector("#inputSubmit");

const inputName = document.forms["form"]["name"];
const inputEmail = document.forms["form"]["email"];
const inputCpf = document.forms["form"]["cpf"];
const inputGenre = document.forms["form"]["genre"];

inputSubmit.addEventListener("click", function() {
    form.onsubmit = function(e) {
        e.preventDefault();

        inputName.addEventListener("keyup", function() {
            checkName();
        });

        inputEmail.addEventListener("keyup", function() {
            checkEmail();
        });

        inputCpf.addEventListener("keyup", function() {
            checkCpf();
        });

        let hasError = false;

        function checkName() {
            if(inputName.value == "") {
                hasError = true;
    
                const span = inputName.nextSibling.nextSibling;
    
                span.innerText = "Informe o seu nome completo";
    
                inputName.classList.add("error");
            } else {
                const span = inputName.nextSibling.nextSibling;
                
                span.innerText = "";
    
                inputName.classList.remove("error"); 
            }
        }
        
        function checkEmail() {
            if(inputEmail.value == "") {
                hasError = true;

                const span = inputEmail.nextSibling.nextSibling;

                span.innerText = "Informe um email válido";

                inputEmail.classList.add("error");
            } else {
                const span = inputEmail.nextSibling.nextSibling;

                span.innerText = "";

                inputEmail.classList.remove("error"); 
            }
        }
        
        function checkCpf() {
            if((inputCpf.value == "") || !(inputCpf.value.length == 11)) {
                hasError = true;
    
                const span = inputCpf.nextSibling.nextSibling;
    
                span.innerText = "Informe um cpf válido";
    
                inputCpf.classList.add("error");
            } else {
                const span = inputCpf.nextSibling.nextSibling;
    
                span.innerText = "";
    
                inputCpf.classList.remove("error"); 
            }
        }
        
        checkName();
        checkEmail();
        checkCpf();

        if(!hasError) {
            const span = inputSubmit.nextSibling.nextSibling;
            span.innerText = "Seus dados foram enviados com sucesso!"

            setTimeout(() => {
                span.innerHTML = "";
            }, 5000);

            inputName.value = "";
            inputEmail.value = "";
            inputCpf.value = "";
            inputGenre[0].checked = false;
            inputGenre[1].checked = false;
        }
    }
});

const formFriend = document.getElementById("formFriend");
const buttonSubmitNow = document.getElementById("buttonSubmitNow");
const boxEmail = document.getElementsByClassName("box-email");

const inputNameFriend = document.forms["formFriend"]["friendName"];
const inputEmailFriend = document.forms["formFriend"]["friendEmail"];

buttonSubmitNow.addEventListener("click", function() {
    formFriend.onsubmit = function(e) {
        e.preventDefault();

        inputNameFriend.addEventListener("keyup", function() {
            checkNameFriend();
        });
    
        inputEmailFriend.addEventListener("keyup", function() {
            checkEmailFriend();
        });
    
        let hasError = false;
    
            function checkNameFriend() {
                if(inputNameFriend.value == "") {
                    hasError = true;
        
                    const span = inputNameFriend.nextSibling.nextSibling;
        
                    span.innerText = "Informe o seu nome completo";
        
                    inputNameFriend.classList.add("error");
                } else {
                    const span = inputNameFriend.nextSibling.nextSibling;
        
                    span.innerText = "";
        
                    inputNameFriend.classList.remove("error"); 
                }
            }
        
            function checkEmailFriend() {
                if(inputEmailFriend.value == "") {
                    hasError = true;
        
                    const span = inputEmailFriend.nextSibling.nextSibling;
        
                    span.innerText = "Informe um email válido";
        
                    inputEmailFriend.classList.add("error");
                } else {
                    const span = inputEmailFriend.nextSibling.nextSibling;
        
                    span.innerText = "";
        
                    inputEmailFriend.classList.remove("error"); 
                }
            }
        
            checkNameFriend();
            checkEmailFriend();
        
            if(!hasError) {
                const span = buttonSubmitNow.nextSibling.nextSibling;
                span.innerText = "Os dados do seu amigo foram enviados com sucesso!"

                setTimeout(() => {
                    span.innerHTML = "";
                }, 5000);

                inputNameFriend.value = "";
                inputEmailFriend.value = "";
            }
    }
});



