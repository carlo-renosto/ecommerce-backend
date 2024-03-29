
export class usersDto {
    constructor(userInfo, cartInfo) {
        this.fullName = `${userInfo.first_name} ${userInfo.last_name}`;
        this.firstName = `${userInfo.first_name}`;
        this.lastName = `${userInfo.last_name}`;
        this.role = `${userInfo.role}`;
        this.status = `${userInfo.status}`
        this.cartId = `${cartInfo._id}`;
        this.products = cartInfo.products;
    }
}