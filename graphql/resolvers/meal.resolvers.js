import Meal from '../../models/Meal.js'
import Order from '../../models/Order.js'
import { ApolloError } from 'apollo-server'
import setNewMenu from '../../utils/setNewMenu.js'
import { getCookingList } from '../../utils/getCookingList.js'

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
        getAllMeals: async (_, args, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Meal.find()
        },

        getMealDetails: async (_, { mealID }) => await Meal.findById(mealID),

        getNutritionalValues: async (_, { mealID }) => {

            const meal = await Meal.findById(mealID)

            const nutritionalValuesPerPortion = {}
            const nutritionalValuesPer100g = Object.entries(meal.nutritionalValues)

            nutritionalValuesPer100g.forEach(([key, value]) => {
                nutritionalValuesPerPortion[key] = parseFloat((value * (meal.weight / 100)).toFixed(2))
            })

            return nutritionalValuesPerPortion
        },

        getMealsByCategory: async (_, { mealCategory }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Meal.find({ category: mealCategory })
        },

        getMenu: async () => await Meal.find({ currentlyInMenu: true }),

        getMealsToCook: async () => {

            // if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            const orders = await Order.find({ status: 'Ordered' }).populate('meals.mealID')
            const cookingList = getCookingList(orders)

            return cookingList
        }
    },

    Mutation: {
        addMeal: (_, { mealData }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            const meal = new Meal({ ...mealData })
            return meal.save()
        },

        updateMeal: async (_, { mealID, mealData }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Meal.findByIdAndUpdate(mealID, { $set: mealData }, { new: true })
        },

        deleteMeal: async (_, { mealID }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            const deletedMeal = await Meal.findByIdAndDelete(mealID)
            return `The meal ${deletedMeal.name} was successfully deleted!`
        },

        addMealToMenu: async (_, { mealID }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Meal.findByIdAndUpdate(mealID, { nextWeekInMenu: true }, { new: true })
        },

        removeMealFromMenu: async (_, { mealID }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await Meal.findByIdAndUpdate(mealID, { nextWeekInMenu: false }, { new: true })
        },

        publishNewMenu: async (_, args, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            const mealsCurrentlyInMenu = await Meal.find({ currentlyInMenu: true })
            const newMealsInMenu = await Meal.find({ nextWeekInMenu: true })

            const menu = setNewMenu(mealsCurrentlyInMenu, newMealsInMenu)

            return menu

        }


    }
}

export default mealResolvers