import mongoose from "mongoose"
const { Schema, model } = mongoose

const schema = new Schema(
    {
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        },
        name: {
            type: String,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        phoneNumber: {
            type: Number
        },
        birthDate: {
            type: Date
        },
        address: {
            street: {
                type: String,
            },
            number: {
                type: Number,
            },
            city: {
                type: String,
            },
            province: {
                type: String
            },
            postCode: {
                type: Number
            },
        },
        paymentMethods: [{
            cardNumber: {
                type: String
            },
            cardName: {
                type: String
            },
            securityCode: {
                type: Number
            },
            expiration: {
                type: Date
            }
        }]
    },
    {
        timestamps: true
    }
)

export default model('User', schema)