
import { faker } from "@faker-js/faker";

const { database, string, image, commerce } = faker;

export const mockProduct = () => {
    return {
        id: database.mongodbObjectId(),
        title: commerce.product(),
        description: commerce.productDescription(),
        code: string.alphanumeric(5),
        price: parseFloat(commerce.price()),
        stock: parseInt(string.numeric(3)),
        category: commerce.productAdjective(),
        thumbnail: image.url()
    } 
};