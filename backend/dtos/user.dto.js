module.exports = class UserDto {
    email;
    id;
    roles;
    isActivated;

    constructor(model) {
        this.email       = model.email;
        this.id          = model._id;
        this.isActivated = model.isActivated;
        this.roles       = model.roles;
    }
}