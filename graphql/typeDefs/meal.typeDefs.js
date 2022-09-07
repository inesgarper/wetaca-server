import { gql } from "apollo-server"

const mealTypeDefs = gql`

    # Enums

    enum MealType {
        UNIQUE
        LIGHT
        FULL
        VEGGIE
        STARTER
        DESSERT
    }

    enum MealCategory {
        MEAT
        CHICKEN
        FISH
        PASTA
        RICE
        GRATINATED
        LEGUME
        INTERNATIONAL
        VEGGIE
        STARTER
        FULL
        LIGHT
        DESSERT
    }

    # Definitions

    type Meal{
        name: String!
        type: MealType!
        ingredients: String!
        category: MealCategory!
        weight: Int!
        price: Float!
        description: String!
        allergens: Allergens!
        nutritionalValues: NutritionalValues!
        currentlyInMenu: Boolean
        lastWeekInMenu: Date
        popularity: Popularity!
        id: ID!
    }
   
    type Allergens{
        celery: Boolean
        gluten: Boolean
        crustaceans: Boolean
        eggs: Boolean
        fish: Boolean
        lupin: Boolean
        milk: Boolean
        molluscs: Boolean
        mustard: Boolean
        peanuts: Boolean
        sesame: Boolean
        soybeans: Boolean
        sulphurDioxide: Boolean
        sulphites: Boolean
    }

    type NutritionalValues{
        calories: Float
        totalFats: Float
        saturatedFat: Float
        carbs: Float
        protein: Float
        sugar:  Float
        fiber: Float
        sodium: Float
    }

    type Popularity{
        averageRating: Float
        timesOrdered: Int
    }

    type MealToCook {
        meal: Meal
        quantity: Float
    }


    # Inputs

    input MealInput{
        name: String
        type: MealType
        ingredients: String
        category: MealCategory
        weight: Int
        price: Float
        description: String
        allergens: AllergensInput
        nutritionalValues: NutritionalValuesInput
        lastWeekInMenu: Date
        popularity: PopularityInput
    }

    input AllergensInput{
        celery: Boolean
        gluten: Boolean
        crustaceans: Boolean
        eggs: Boolean
        fish: Boolean
        lupin: Boolean
        milk: Boolean
        molluscs: Boolean
        mustard: Boolean
        peanuts: Boolean
        sesame: Boolean
        soybeans: Boolean
        sulphurDioxide: Boolean
        sulphites: Boolean
    }

    input NutritionalValuesInput{
        calories: Float
        totalFats: Float
        saturatedFat: Float
        carbs: Float
        protein: Float
        sugar:  Float
        fiber: Float
        sodium: Float
    }

    input PopularityInput{
        averageRating: Float
        timesOrdered: Int
    }


    # Querys

    type Query{

        getAllMeals: [Meal],

        getMealDetails(
            mealID: ID
        ): Meal,

        getNutritionalValues(
            mealID: ID
        ): NutritionalValues

        getMealsByCategory(
            mealCategory: MealCategory
        ): [Meal],

        getMenu: [Meal],

        getMealsToCook: [MealToCook]
    }


    # Mutations

    type Mutation{
        
        addMeal(
            mealData: MealInput
        ): Meal,

        updateMeal(
            mealID: ID, 
            mealData: MealInput
        ): Meal,

        deleteMeal(
            mealID: ID
        ): String,

        # Cambiaría la propiedad nextWeekInMenu a true
        addMealToMenu(
            mealID: ID
        ): Meal,

        # Cambiaría la propiedad nextWeekInMenu a false
        removeMealFromMenu(
            mealID: ID
        ): Meal,

        # A todas las meals con nextWeekInMenu en true les pondría currentlyInMenu a true, y después pondría nextWeekInMenu a false
        # Actualizaría la fecha de lastWeekInMenu
        publishNewMenu: [Meal]
    }


    # Custom Scalars
    scalar Date
`

export default mealTypeDefs