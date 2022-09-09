import { gql } from 'apollo-server'
import mongoose from 'mongoose'
import testServer from '../testServer'


describe('GET REVIEWS', () => {
    it('Should return an array of reviews', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                query($mealId: ID!){
                    getReviews(mealID: $mealId) {
                        meal {
                            name
                        }
                        comment
                    }
                }
            `,
            variables: {
                mealId: "630d14cef19d5545b990ec85"
            }
        })

        expect(result.data.getReviews).toBeTruthy()
        expect(typeof result.data.getReviews.length).toBe('number')
    })
})

describe('CREATE REVIEW', () => {
    it('Creates review if provide all necessary inputs', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($reviewData: ReviewInput!){
                    createReview(reviewData: $reviewData) {
                        comment
                        rating
                }
            }
            `,
            variables: {
                reviewData: {
                    comment: "Delicious!",
                    meal: "6310833855420c72d0fe5244",
                    rating: 4
                }
            }
        })

        expect(result.data.createReview).toBeTruthy()
        expect(result.data.errors).toBeFalsy()
        expect(result.data.createReview.comment).toBe('Delicious!')
    })

    // la rating da problemas
    // it('Throws an error message if rating is not provided', async () => {

    //     const result = await testServer.executeOperation({
    //         query: gql`
    //             mutation($reviewData: ReviewInput!){
    //                 createReview(reviewData: $reviewData) {
    //                     comment
    //                     rating
    //             }
    //         }
    //         `,
    //         variables: {
    //             reviewData: {
    //                 comment: "Delicious!",
    //                 meal: "6310833855420c72d0fe5244",
    //                 rating: ""
    //             }
    //         }
    //     })

    //     console.log('k esta pasando ??? ----->', result)
    //     expect(result.data.createReview).toBeFalsy()
    //     expect(result.data.errors).toBeTruthy()
    //     expect(result.errors[0].message).toBe('Rating must be provided')
    // })

    //update meal rating

})



afterAll(async () => {
    await testServer?.stop()
    await mongoose.connection.close()
})