
const client_socket = io();

client_socket.emit("request_products");

const template = Handlebars.compile(`
   {{#each products}}
        <div class="products-view-div">
            <div class="product-view-div">
                <div class="product-title-div">
                    <h3>{{this.title}}</h3>
                    <button class="button-extend">+</button>
                </div>
                <hr>
                <p>Descripcion: {{this.description}}</p>
                <p>Codigo: {{this.code}}</p>
                <p class="element-hidden">Precio: $ {{this.price}}</p>
                <p class="element-hidden">Stock: {{this.stock}} unidades</p>
                <p class="element-hidden">Categoria: {{this.category}}</p>
                <p class="element-hidden">Imagen: {{this.thumbnail}}</p>
            </div>  
            <form method="post" action="/api/carts/productAdd/{{this._id}}">
                <input type="submit" value="Añadir al carrito">
            </form>
        </div>
    {{/each}}
`);

client_socket.on("products", (products) => {
    const container = document.getElementsByClassName('products-div')[0];
    container.innerHTML = template({ products });
});

client_socket.on("product-add", (product) => {
    const container = document.getElementsByClassName('products-div')[0];
    container.innerHTML += template({ products: [product] });
});

client_socket.on("product-update", (product) => {
    const container = document.getElementsByClassName('products-div')[0];
    const updatedHTML = template({ products: [product] });
    const updatedProduct = container.querySelector(`[data-product-id="${product._id}"]`);

    if(updatedProduct) {
        updatedProduct.innerHTML = updatedHTML;
    } 
    else {
        container.innerHTML += updatedHTML;
    }
});

client_socket.on("product-delete", (pid) => {
    const container =document.getElementsByClassName('products-div')[0];
    const deletedProduct = container.querySelector(`[data-product-id="${pid}"]`);

    if(deletedProduct) {
        deletedProduct.remove();
    }
});


document.getElementsByClassName('products-div')[0].addEventListener('click', function(event) {
    if(event.target.classList.contains('button-extend')) {
        const button = event.target.closest('.button-extend');
        var elements = button.parentElement.parentElement.querySelectorAll(".element-hidden");

        if(elements.length > 0) {
            elementsChange(elements, "element-hidden", "element-visible", button)
        }
        else {
            elements = button.parentElement.parentElement.querySelectorAll(".element-visible");
            elementsChange(elements, "element-visible", "element-hidden", button)
        }
    }
});

function elementsChange(elements, classRemove, classAdd, button) {
    elements.forEach(element => {
        element.classList.remove(classRemove);
        element.classList.add(classAdd);
    });
    
    button.textContent = classRemove === "hidden" ? "-" : "+";
}