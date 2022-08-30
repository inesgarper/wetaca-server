import { gql } from "apollo-server"

const mealTypeDefs = gql`

    # Definitions

    type Meal{
        name: String!
        type: String!
        ingredients: String!
        category: String!
        weight: Int!
        price: Float!
        description: String!
        allergens: Allergens!
        nutritionalValues: NutritionalValues!
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


    # Querys

    type Query{
        hello: String
        # getCurrentUser: User
    }


    # Inputs

    input MealInput{
        name: String!
        type: String!
        ingredients: String!
        category: String!
        weight: Int!
        price: Float!
        description: String!
        allergens: AllergensInput!
        nutritionalValues: NutritionalValuesInput!
        lastWeekInMenu: Date
        popularity: PopularityInput!
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


    # Mutations

    type Mutation{
        addMeal(mealData: MealInput): Meal

        # login(
        #     email: String!
        #     password: String!
        # ): Token
    }


    # Custom Scalars
    scalar Date
`

export default mealTypeDefs