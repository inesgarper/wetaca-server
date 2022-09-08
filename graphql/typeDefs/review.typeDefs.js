import { gql } from "apollo-server"

const reviewTypeDefs = gql`

    # Definitions

    type Review{
        user: User!
        meal: Meal!
        rating: Float!
        comment: String
        id: ID!
    }


    # Inputs

    input ReviewInput{
        meal: ID!
        rating: Float!
        comment: String
    }

    # Querys

    type Query{

        getReviews(
            mealID: ID!
        ): [Review]
    }

    # Mutations

    type Mutation{
        
        createReview(
            reviewData: ReviewInput!
        ): Review
    }

`

export default reviewTypeDefs
