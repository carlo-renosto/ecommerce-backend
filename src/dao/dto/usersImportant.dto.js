
export class usersImportantDto {
    constructor(userInfo) {
        this._id = `${userInfo._id}`;
        this.fullName = `${userInfo.first_name} ${userInfo.last_name}`;
        this.firstName = `${userInfo.first_name}`;
        this.lastName = `${userInfo.last_name}`;
        this.email = `${userInfo.email}`;
        this.role = `${userInfo.role}`;
        this.status = `${userInfo.status}`
    }
}