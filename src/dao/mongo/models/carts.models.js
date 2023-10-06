
import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: [
          {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: {
              type: Number,
              required: true
            }
          }
        ],
        default: []
       }
       
       //find().populate("products.id")
});

const cartsModel = mongoose.model(cartsCollection, cartSchema);

export { cartsModel as cartsModel };