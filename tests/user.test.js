import { gql, UserInputError } from "apollo-server"
import { typeDefs } from "../graphql/typeDefs"
import server from "../server"

describe ('SIGNUP', () => {
    it('Throws an error if email or password is empty', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    login(
                        email: "",
                        password: "antonio"
                    ){
                        value
                    }
                }
            `
        })

        expect(result.data.login).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide all inputs')

    })
})

describe('LOGIN', () => {

    it('Returns a JWT Token', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    login(
                        email: "archi@gmail.com",
                        password: "antonio"
                    ){
                        value
                    }
                }
            `
        })

        expect(result.data.login).toBeTruthy()
        expect(result.data.login.value).toBeTruthy()
    })

    it('Throws an error if email or password is empty', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    login(
                        email: "",
                        password: "antonio"
                    ){
                        value
                    }
                }
            `
        })

        expect(result.data.login).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide email and password')

    })

    it('Throws an error if password is wrong', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    login(
                        email: "archi@gmail.com",
                        password: "antonioo"
                    ){
                        value
                    }
                }
            `
        })

        expect(result.errors[0].message).toBe('Wrong credentials')

    })

    // it('Throws an error if email is not registered', async () => {

    //     const result = server.executeOperation({
    //         query: gql`
    //                 mutation {
    //                     login(
    //                         email: "notauser@gmail.com",
    //                         password: "password"
    //                     ){
    //                         value
    //                     }
    //                 }
    //             `
    //     })

    //     expect(function () {
    //         result
    //     }).toThrowError('User not found');
    // })

})


describe('GraphQL Schemas', () => {

    it('Should match the GraphQL TypeDefs', () => {
        expect(typeDefs).toMatchSnapshot()
    })

})