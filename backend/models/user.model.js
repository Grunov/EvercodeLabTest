const { Schema, model, Types} = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: {  type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    roles: [
        {
            type: Types.ObjectId,
            ref: 'Role'
        }
    ]
});

module.exports = model('User', UserSchema);