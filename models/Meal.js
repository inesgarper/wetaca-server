import mongoose from "mongoose"
const { Schema, model } = mongoose

const schema = new Schema(
    {
        name: {
            type: String,
        },
        type: {
            type: String,
            enum: ['Platos Únicos', 'Platos Ligeros', 'Platos Completos', 'Veggie', 'Entrantes', 'Postres'],
        },
        ingredients: {
            type: String,
        },
        category: [{
            type: String,
            enum: ['Carne', 'Pollo', 'Pescado', 'Pasta', 'Gratinado', 'Arroz', 'Legumbres', 'Internacional']
        }],
        weight: {
            type: Number,
        },
        price: {
            type: Number
        },
        images: {
            finals: [{
                type: String
            }],
            wip: [{
                type: String
            }]
        },
        description: {
            type: String
        },
        allergens: {
            celery: {
                type: Boolean,
            },
            gluten: {
                type: Boolean,
            },
            crustaceans: {
                type: Boolean,
            },
            eggs: {
                type: Boolean
            },
            fish: {
                type: Boolean
            },
            lupin: {
                type: Boolean
            },
            milk: {
                type: Boolean
            },
            molluscs: {
                type: Boolean
            },
            mustard: {
                type: Boolean
            },
            peanuts: {
                type: Boolean
            },
            sesame: {
                type: Boolean
            },
            soybeans: {
                type: Boolean
            },
            sulphurDioxide: {
                type: Boolean
            },
            sulphites: {
                type: Boolean
            },
        },
        nutritionalValues: {
            calories: {
                type: Number
            },
            totalFats: {
                type: Number
            },
            saturatedFat: {
                type: Number
            },
            carbs: {
                type: Number
            },
            protein: {
                type: Number
            },
            sugar: {
                type: Number
            },
            fiber: {
                type: Number
            },
            sodium: {
                type: Number
            }
        },
        lastWeekInMenu: {
            type: Date
        },
        popularity: {
            averageRating: {
                type: Number
            },
            timesOrdered: {
                type: Number
            }
        }
    },
    {
        timestamps: true
    }
)

export default model('Meal', schema)