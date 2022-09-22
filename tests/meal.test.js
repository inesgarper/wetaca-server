import { gql } from "apollo-server"
// import { typeDefs } from "../graphql/typeDefs"
import Meal from "../models/Meal.js"
import testServer, { userContext } from "../testServer.js"
import { baseMenuMeal, initialMeals, newMeal } from "./helpers.js"

beforeAll(async () => {

    await Meal.deleteMany()

    const firstMeal = new Meal(initialMeals[0])
    await firstMeal.save()

    const secondMeal = new Meal(initialMeals[1])
    await secondMeal.save()
})

describe('GET ALL MEALS', () => {

    it('Must return an array with meals', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                query {
                    getAllMeals{
                        name
                        category
                        price
                    }
                }
            `
        })

        expect(result.data.getAllMeals).toBeInstanceOf(Array)
        expect(result.data.getAllMeals.length).toBeGreaterThan(0)
        result.data.getAllMeals.forEach(meal => {
            expect(meal).toHaveProperty('category')
        })
    })
})

describe('GET MEAL DETAILS', () => {

    it('Must return a meal from its ID', async () => {

        const meal = await Meal.findOne()

        const result = await testServer.executeOperation({
            query: gql`
                query($mealID: ID) {
                    getMealDetails(mealID: $mealID){
                        name
                        category
                        price
                    }
                }
            `,
            variables: {
                mealID: meal.id
            }
        })

        expect(result.data.getMealDetails).toHaveProperty('name', `${meal.name}`)
    })
})

describe('GET NUTRITIONAL VALUES', () => {

    it('Must calculate and return nutritrional values per portion', async () => {

        const meal = await Meal.findOne()

        const result = await testServer.executeOperation({
            query: gql`
                query($mealID: ID) {
                    getNutritionalValues(mealID: $mealID){
                        calories
                    }
                }
            `,
            variables: {
                mealID: meal.id
            }
        })

        const caloriesValue = parseFloat((meal.nutritionalValues.calories * (meal.weight / 100)).toFixed(2))

        expect(result.data.getNutritionalValues).toHaveProperty('calories', caloriesValue)
    })
})

describe('GET MEALS BY CATEGORY', () => {

    it('Must return an array of meals matching the given category', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                query($mealCategory: MealCategory) {
                    getMealsByCategory(mealCategory: $mealCategory){
                        name
                        category
                    }
                }
            `,
            variables: {
                mealCategory: 'DESSERT'
            }
        })

        expect(result.data.getMealsByCategory).toBeInstanceOf(Array)
        result.data.getMealsByCategory.forEach(meal => {
            expect(meal).toHaveProperty('category', 'DESSERT')
        })

    })
})

describe('GET MENU', () => {

    it('Must return an array of meals currently in menu', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                query {
                    getMenu {
                        name
                        currentlyInMenu
                    }
                }
            `,
        })

        expect(result.data.getMenu).toBeInstanceOf(Array)
        result.data.getMenu.forEach(meal => {
            expect(meal).toHaveProperty('currentlyInMenu', true)
        })

    })
})

// // Get Meals To Cook -- No se puede hacer hasta que no estén las orders y las subscriptions, la haré más adelante!

describe('CREATE MEAL', () => {

    it('Create a meal when provide correct data', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($mealData: MealInput){
                    createMeal(mealData: $mealData) {
                        name
                        id
                    }
                }
            `,
            variables: {
                mealData: newMeal
                // {
                //     "name": "GAZPACHO",
                //     "type": "STARTER",
                //     "ingredients": "Tomate, agua, pepino, pimiento verde, aceite de oliva, pan de picos, vinagre de jerez, aceite de oliva virgen extra, pasta de tomate, cebolla morada, sal y ajo confitado.",
                //     "category": "STARTER",
                //     "weight": 300,
                //     "price": 2.99,
                //     "description": "Nuestra sopa fría por excelencia: con aceite de oliva virgen extra y el equilibrio perfecto de hortalizas para comenzar de forma suave y fresca cualquier comida.",
                //     "allergens": {
                //         "gluten": true
                //     },
                //     "nutritionalValues": {
                //         "calories": 113.75,
                //         "carbs": 5.95,
                //         "fiber": 1.29,
                //         "protein": 1.28,
                //         "saturatedFat": 1.6,
                //         "sodium": 1.06,
                //         "sugar": 2.94,
                //         "totalFats": 9.49
                //     }
                // }
            }
        })

        expect(result.data.createMeal).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.createMeal.name).toBe('GAZPACHO')
    })

    // it('Must throw an error if user does not provide all inputs', async () => {

    //     const result = await testServer.executeOperation({
    //         query: gql`
    //             mutation($mealData: MealInput){
    //                 createMeal(mealData: $mealData) {
    //                     name
    //                     id
    //                 }
    //             }
    //         `,
    //         variables: {
    //             mealData:
    //             {
    //                 "name": "",
    //                 "type": "STARTER",
    //                 "ingredients": "Tomate, agua, pepino, pimiento verde, aceite de oliva, pan de picos, vinagre de jerez, aceite de oliva virgen extra, pasta de tomate, cebolla morada, sal y ajo confitado.",
    //                 "category": "",
    //                 "weight": 300,
    //                 "price": 2.99,
    //                 "description": "Nuestra sopa fría por excelencia: con aceite de oliva virgen extra y el equilibrio perfecto de hortalizas para comenzar de forma suave y fresca cualquier comida.",
    //             }
    //         }
    //     })
    // })
})

describe('ADD MEAL TO MENU', () => {

    it('Must switch property "nextWeekInMenu" to true', async () => {

        const meal = await Meal.findOne({ nextWeekInMenu: false })

        const result = await testServer.executeOperation({
            query: gql`
                mutation($mealID: ID){
                    addMealToMenu(mealID: $mealID) {
                        name
                        nextWeekInMenu
                    }
                }
            `,
            variables: {
                mealID: meal.id
            }
        })

        const { data: { addMealToMenu } } = result

        expect(addMealToMenu).toHaveProperty('nextWeekInMenu', true)

    })
})

describe('REMOVE MEAL FROM MENU', () => {

    it('Must switch property "nextWeekInMenu" to false', async () => {

        const meal = await Meal.findOne({ nextWeekInMenu: true })

        const result = await testServer.executeOperation({
            query: gql`
                mutation($mealID: ID){
                    removeMealFromMenu(mealID: $mealID) {
                        name
                        nextWeekInMenu
                    }
                }
            `,
            variables: {
                mealID: meal.id
            }
        })

        const { data: { removeMealFromMenu } } = result

        expect(removeMealFromMenu).toHaveProperty('nextWeekInMenu', false)

    })
})

