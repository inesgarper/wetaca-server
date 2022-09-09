import Meal from '../../models/Meal.js'
import Order from '../../models/Order.js'
import setNewMenu from '../../utils/setNewMenu.js'
import getCookingList from '../../utils/getCookingList.js'

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
        getAllMeals: async () => await Meal.find(),

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

        getMealsByCategory: async (_, { mealCategory }) =>  await Meal.find({ category: mealCategory }),

        getMenu: async () => await Meal.find({ currentlyInMenu: true }),

        getMealsToCook: async () => {

            const orders = await Order.find({ status: 'Ordered' }).populate('meals.mealID')
            const cookingList = getCookingList(orders)

            return cookingList
        }
    },

    Mutation: {
        addMeal: (_, { mealData }) => {

            const meal = new Meal({ ...mealData })
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

            const menu = setNewMenu(mealsCurrentlyInMenu, newMealsInMenu)

            return menu
        }
    }
}

export default mealResolvers