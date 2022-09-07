import { gql } from "apollo-server"

const reviewTypeDefs = gql`

    # Definitions

    type Review{
        user: String
        meal: String
        rating: Float
        comment: String
        id: ID!
    }




    # Inputs

    input ReviewInput{
        meal: String!
        rating: Float!
        comment: String!
    }

    # Querys

    type Query{

        getReviews(
            mealId: ID!
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
