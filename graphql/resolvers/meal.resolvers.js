import Meal from '../../models/Meal.js'

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
        getMealDetails: async (_, args) => await Meal.findById({ _id: args.mealID })
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

    }
}

export default mealResolvers