const boxProdutos = document.querySelector("#boxProducts");

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText);
        
        let products = "";

        response.products.forEach(product => {
            products += `
            <div class="product">
                <div class="image">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                
                <div class="product-information">
                    <h4 class="title-product">${product.name}</h4>

                    <p class="description">
                        ${product.description}
                    </p>

                    <span class="old-price">De: R$ ${product.oldPrice},00</span>

                    <span class="new-price">Por: R$ ${product.price},00<span>ou ${product.installments.count}x de R$ ${product.installments.value}</span></span>

                    <button class="button">Comprar</button>            
                </div>                 
            </div>
        `;
            console.log(`${product.installments.count}`)
        });

        boxProdutos.innerHTML = products;
    }
};

xhttp.open("GET", "https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1", true);

xhttp.send();