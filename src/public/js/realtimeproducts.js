
const client_socket = io();

client_socket.emit("request_products");

const template = Handlebars.compile(`
    {{#each products}}
        <div id="div-container">
            <div id="div-content">
                <h3>{{this.title}}</h3>
                <button class="button">+</button>
                <hr>
                <p>Descripcion: {{this.description}}</p>
                <p>Codigo: {{this.code}}</p>
                <p class="hidden">Precio: $ {{this.price}}</p>
                <p class="hidden">Stock: {{this.stock}} unidades</p>
                <p class="hidden">Categoria: {{this.category}}</p>
                <p class="hidden">Imagen: {{this.thumbnail}}</p>
            </div>
        </div>
    {{/each}}
`);

client_socket.on("products", (products) => {
    const container = document.getElementById('div-products');
    container.innerHTML = template({ products });
});

client_socket.on("product-add", (product) => {
    const container = document.getElementById('div-products');
    container.innerHTML += template({ products: [product] });
});

client_socket.on("product-update", (product) => {
    const container = document.getElementById('div-products');
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
    const container = document.getElementById('div-products');
    const deletedProduct = container.querySelector(`[data-product-id="${pid}"]`);

    if(deletedProduct) {
        deletedProduct.remove();
    }
});