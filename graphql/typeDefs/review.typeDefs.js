import { gql } from "apollo-server"

const reviewTypeDefs = gql`

    type Review{
        user: String
        meal: String
        rating: Float
        comment: String
        id: ID!
    }

    input ReviewInput{
        user: String
        meal: String
        rating: Float
        comment: String
    }

    type Mutation{
        createReview(review: ReviewInput): Review
    }

`

export default reviewTypeDefs
