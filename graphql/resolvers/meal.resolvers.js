import Meal from '../../models/Meal.js'
import Order from '../../models/Order.js'
import setNewMenu from '../../utils/setNewMenu.js'
import getCookingList from '../../utils/getCookingList.js'
import calculatePortionNutritionalValues from '../../utils/calculatePortionNutritionalValues.js'
import formatMealsByType from '../../utils/formatMealsByType.js'

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
        MEAT: 'meat',
        CHICKEN: 'chicken',
        FISH: 'fish',
        PASTA: 'pasta',
        RICE: 'rice',
        GRATINATED: 'gratinated',
        LEGUME: 'legume',
        INTERNATIONAL: 'international',
        VEGGIE: 'veggie',
        STARTER: 'starter',
        FULL: 'full',
        LIGHT: 'light',
        DESSERT: 'dessert'
    },

    Query: {
        getAllMeals: async () => {
            const meals = await Meal.find()
            return formatMealsByType(meals)
        },

        getMealDetails: async (_, { mealID }) => await Meal.findById(mealID),

        getNutritionalValues: async (_, { mealID }) => {

            const meal = await Meal.findById(mealID)
            return calculatePortionNutritionalValues(meal)
        },

        getMealsByCategory: async (_, { mealCategory }) => await Meal.find({ category: mealCategory }),

        getMenu: async () => {
            const mealsInMenu = await Meal.find({ currentlyInMenu: true })
            return formatMealsByType(mealsInMenu)
        },

        getMealsToCook: async () => {

            const orders = await Order.find({ status: 'Ordered' }).populate('meals.mealID')
            return getCookingList(orders)
        }
    },

    Mutation: {
        createMeal: (_, { mealData }) => {

            // for (const input in mealData) {
            //     for (const addressInput in subscriptionData.address) {
            //         if (subscriptionData.address[addressInput] === '') throw new UserInputError('Provide all inputs')
            //     }
            //     if (subscriptionData[input] === '') throw new UserInputError('Provide all inputs')
            // }

            const meal = new Meal({ ...mealData, currentlyInMenu: false, nextWeekInMenu: false })
            return meal.save()
        },

        updateMeal: async (_, { mealID, mealData }) => {

            return await Meal.findByIdAndUpdate(mealID, { $set: mealData }, { new: true })
        },

        deleteMeal: async (_, { mealID }) => {

            const deletedMeal = await Meal.findByIdAndDelete(mealID)
            return `The meal ${deletedMeal.name} was successfully deleted!`
        },

        addMealToMenu: async (_, { mealID }) => {

            return await Meal.findByIdAndUpdate(mealID, { nextWeekInMenu: true }, { new: true })
        },

        removeMealFromMenu: async (_, { mealID }) => {

            return await Meal.findByIdAndUpdate(mealID, { nextWeekInMenu: false }, { new: true })
        },

        publishNewMenu: async () => {

            const mealsCurrentlyInMenu = await Meal.find({ currentlyInMenu: true })
            const newMealsInMenu = await Meal.find({ nextWeekInMenu: true })

            return setNewMenu(mealsCurrentlyInMenu, newMealsInMenu)
        }
    }
}

export default mealResolvers