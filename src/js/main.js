const boxProdutos = document.querySelector("#boxProducts");
const buttonMoreProducts = document.getElementById("buttonMoreProducts");

let products = "";

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);

        listProducts(response);
        
        boxProdutos.innerHTML = products;

        const newPage = response.nextPage;

        buttonMoreProducts.addEventListener("click", () => {

            xhttp.onreadystatechange = function() {
                if(this.readyState == 4 && this.status == 200) {
                    const response = JSON.parse(this.responseText);
                    
                    listProducts(response);

                    boxProdutos.innerHTML = products; 
                }
            }

            xhttp.open("GET", `https://${newPage}`, true);
            xhttp.send();

            buttonMoreProducts.classList.add("hidden-button");
                 
        });
    }
};

xhttp.open("GET", `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1`, true);

xhttp.send();

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
}

/**
 * O que tenho que fazer?
 * - evitar código repetido utilizando funções
 */

const form = document.querySelector("#form");

const inputSubmit = document.forms.form.submit;

form.addEventListener("submit", function(e) {
    e.preventDefault();

    validate();
});

function validate() {
    const inputName = document.forms.form.name;
    const inputEmail = document.forms.form.email;
    const inputCpf = document.forms.form.cpf;
    
    if(inputName.value == "") {
        const span = inputName.nextSibling.nextSibling;

        span.innerText = "Informe o seu nome completo";

        inputName.classList.add("error");
    } else {
        const span = inputName.nextSibling.nextSibling;
        
        span.innerText = "";

        inputName.classList.remove("error"); 
    }
    console.log(inputEmail.value)

    if(inputEmail.value == "") {
        const span = inputEmail.nextSibling.nextSibling;

        span.innerText = "Informe um email válido";

        inputEmail.classList.add("error");
    } else {
        const span = inputEmail.nextSibling.nextSibling;

        span.innerText = "";

        inputEmail.classList.remove("error"); 
    }

    if((inputCpf.value == "") || !(inputCpf.value.length == 11)) {

        console.log(inputCpf.value.length)
        const span = inputCpf.nextSibling.nextSibling;

        span.innerText = "Informe um cpf válido";

        inputCpf.classList.add("error");
    } else {
        const span = inputCpf.nextSibling.nextSibling;

        span.innerText = "";

        inputCpf.classList.remove("error"); 
    }
}

