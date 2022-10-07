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
        category: {
            type: String,
            enum: ['meat', 'chicken', 'fish', 'pasta', 'gratinated', 'rice', 'legume', 'international', 'veggie', 'starter', 'full', 'light', 'dessert']
        },
        weight: {
            type: Number,
        },
        price: {
            type: Number
        },
        images: {
            finals: {
                type: [String],
                default: 'https://images.assetsdelivery.com/compings_v2/pavelstasevich/pavelstasevich1811/pavelstasevich181101035.jpg'
            },
            wip: {
                type: [String]
            }
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
        nextWeekInMenu: {
            type: Boolean
        },
        currentlyInMenu: {
            type: Boolean
        },
        lastWeekInMenu: {
            type: Date
        },
        averageRating: {
            type: Number
        },

    },
    {
        timestamps: true
    }
)

export default model('Meal', schema)