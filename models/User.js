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