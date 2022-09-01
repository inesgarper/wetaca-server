import Meal from '../../models/Meal.js'
import Order from '../../models/Order.js'

const mealResolvers = {

    MealType: {
        UNIQUE: 'Platos Únicos',
        LIGHT: 'Platos Ligeros',
        FULL: 'Platos Completos',
        VEGGIE: 'Veggie',
        STARTER: 'Entrantes',
        DESSERT: 'Postres'
    },

    MealCategory: {
        MEAT: 'Carne',
        CHICKEN: 'Pollo',
        FISH: 'Pescado',
        PASTA: 'Pasta',
        RICE: 'Arroz',
        GRATINATED: 'Gratinado',
        LEGUME: 'Legumbres',
        INTERNATIONAL: 'Internacional',
        VEGGIE: 'Veggie',
        STARTER: 'Entrante',
        FULL: 'Completo',
        LIGHT: 'Ligero',
        DESSERT: 'Postre'
    },

    Query: {
        getAllMeals: async () => await Meal.find(),

        getMealDetails: async (_, args) => await Meal.findById({ _id: args.mealID }),

        getMealsByCategory: async (_, args) => {
            const { mealCategory } = args

            const meals = await Meal.find({ category: mealCategory })
            return meals
        },

        getMenu: async () => await Meal.find({ currentlyInMenu: true }),

        getMealsToCook: async () => {

            const orders = await Order.find({ status: 'Actived' }).populate('meals.mealID')
            const mealsToCook = []

            orders.forEach(order => {
                order.meals.forEach(meal => {

                    const mealInArr = mealsToCook.find(elm => elm.meal.name === meal.mealID.name)

                    if (mealInArr) {
                        mealInArr.quantity += meal.quantity
                    } else {
                        mealsToCook.push({
                            meal: meal.mealID,
                            quantity: meal.quantity
                        })
                    }
                })
            })

            return mealsToCook
        }
    },

    Mutation: {
        addMeal: (_, args) => {
            const meal = new Meal({ ...args.mealData })
            return meal.save()
        },

        updateMeal: async (_, args) => {
            const { mealID, mealData } = args

            const updatedMeal = await Meal.findByIdAndUpdate(mealID, { $set: mealData }, { new: true })
            return updatedMeal
        },

        deleteMeal: async (_, args) => {
            const { mealID } = args

            const deletedMeal = await Meal.findByIdAndDelete(mealID)
            return `The meal ${deletedMeal.name} was successfully deleted!`
        },

        addMealToMenu: async (_, args) => {
            const { mealID } = args

            const updatedMeal = await Meal.findByIdAndUpdate(mealID, { currentlyInMenu: true }, { new: true })
            return updatedMeal
        },

        removeMealFromMenu: async (_, args) => {
            const { mealID } = args

            const updatedMeal = await Meal.findByIdAndUpdate(mealID, { currentlyInMenu: false }, { new: true })
            return updatedMeal
        }
    }
}

export default mealResolvers