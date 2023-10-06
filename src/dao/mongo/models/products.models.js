
import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description:  {
        type: String, required: true
    },
    code: {
        type: String, required: true, unique: true
    },
    price: {
        type: Number, required: true
    },
    stock: {
        type: Number, required: true
    },
    category: {
        type: String, required: true, enums: ["Ropa", "Tecnologia", "Deportes"]
    },
    thumbnail: String
});

const productsModel = mongoose.model(productsCollection, productSchema);

export { productsModel as productsModel };