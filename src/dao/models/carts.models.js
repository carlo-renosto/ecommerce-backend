
import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    _uid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true
    },
    products: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: { type: Number, required: true }
    }]
});

const cartsModel = mongoose.model(cartsCollection, cartSchema);

export { cartsModel as cartsModel };