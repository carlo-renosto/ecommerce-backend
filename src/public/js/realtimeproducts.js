
const client_socket = io();

client_socket.emit("request_products");

client_socket.on("products", (products) => {
    displayProducts(products);
});

client_socket.on("product-add", (product) => {
    addProduct(product);
});

client_socket.on("product-update", (product) => {
    updateProduct(product);
});

client_socket.on("product-delete", (pid) => {
    deleteProduct(pid);
});

function displayProducts(products) {
    const container = document.getElementById('div-products');
    container.innerHTML = "";

    products.forEach(product => {
        const div_container = document.createElement("div");
        var div_content = document.createElement("div");

        if(product.thumbnail == undefined) product.thumbnail = "";

        div_content.innerHTML = `
            <input class="pid" type="hidden" value=${product._id}>
            <h3>${product.title}, ID ${product._id}</h3>
            <button class="button">+</button>
            <hr>
            <p>Descripcion: ${product.description}</p>
            <p>Codigo: ${product.code}</p>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock} unidades</p>
            <p>Categoria: ${product.category}</p>
            <p>Imagen: ${product.thumbnail}</p>
        `;

        div_container.classList.add("div-container");
        div_content.classList.add("div-content");

        container.append(div_container);
        div_container.append(div_content);
    });
}

function addProduct(product) {
    const container = document.getElementById('div-products');
    const div_container = document.createElement("div");
    var div_content = document.createElement("div");

    div_content.innerHTML = `
        <input class="pid" type="hidden" value=${product._id}>
        <h3>${product.title}, ID ${product._id}</h3>
        <p>Descripcion: ${product.description}</p>
        <p>Codigo: ${product.code}</p>
        <p>Precio: $${product.price}</p>
        <p>Stock: ${product.stock} unidades</p>
        <p>Categoria: ${product.category}</p>
        <p>Imagen: ${product.thumbnail}</p>
    `;
    
    div_container.classList.add("div-container");
    div_content.classList.add("div-content");

    container.append(div_container);
    div_container.append(div_content);
}

function updateProduct(product) {
    var products = document.getElementsByClassName("div-content");
    var inputs = document.getElementsByClassName("pid");

    for(var i=0;i<inputs.length;i++) {
        if(product._id == inputs[i].value) {
            products[i].innerHTML = `
                <input class="pid" type="hidden" value=${product._id}>
                <h3>${product.title}, ID ${product._id}</h3>
                <p>Descripcion: ${product.description}</p>
                <p>Codigo: ${product.code}</p>
                <p class="hidden">Precio: $${product.price}</p>
                <p class="hidden">Stock: ${product.stock} unidades</p>
                <p class="hidden">Categoria: ${product.category}</p>
                <p class="hidden">Imagen: ${product.thumbnail}</p>
            `;

            return;
        }
    }
}

function deleteProduct(pid) {
    var products = document.getElementsByClassName("div-container");
    var inputs = document.getElementsByClassName("pid");

    for(var i=0;i<inputs.length;i++) {
        if(pid == inputs[i].value) {
            products[i].innerHTML = "";
            return;
        }
    }
}