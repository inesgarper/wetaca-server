import { gql } from "apollo-server"
import { typeDefs } from "../graphql/typeDefs"
import User from "../models/User"
import server from "../server"

beforeAll(async () => {
    await User.findOneAndDelete({ name: 'Test', email: 'test@gmail.com' })
})


describe('SIGNUP', () => {
    it('Creates user when providing correct data', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    createUser(
                        userData: {
                            name: "Test",
                            lastName: "González",
                            email: "test@gmail.com",
                            password: "password1",
                            phoneNumber: 123123123,
                            birthDate: "1997/04/14"
                        }
                    ){
                        name
                    }
                }
            `
        })
        expect(result.data.createUser).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.createUser.name).toBe('Test')

    })

    it('Throws error if user does not provide all inputs', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    createUser(
                        userData: {
                            name: "",
                            lastName: "González",
                            email: "test@gmail.com",
                            password: "password1",
                            phoneNumber: 123123123,
                            birthDate: "1997/04/14"
                        }
                    ){
                        name
                    }
                }
            `
        })

        expect(result.data.createUser).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide all inputs')

    })

    it('Throws error if email is not valid', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    createUser(
                        userData: {
                            name: "Test",
                            lastName: "González",
                            email: "test123gmail.com",
                            password: "password1",
                            phoneNumber: 123123123,
                            birthDate: "1997/04/14"
                        }
                    ){
                        name
                    }
                }
            `
        })

        expect(result.data.createUser).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide valid email address')

    })

    it('Throws error if email already registered', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    createUser(
                        userData: {
                            name: "Test",
                            lastName: "González",
                            email: "test@gmail.com",
                            password: "password1",
                            phoneNumber: 123123123,
                            birthDate: "1997/04/14"
                        }
                    ){
                        name
                    }
                }
            `
        })

        expect(result.data.createUser).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Email already registered')

    })

})


describe('DELETE USER', () => {

    it('Should delete the user and return confirmation message', async () => {
        const createdUser = await server.executeOperation({
            query: gql`
                mutation {
                    createUser(
                        userData: {
                            name: "Test",
                            lastName: "González",
                            email: "test-delete@gmail.com",
                            password: "password1",
                            phoneNumber: 123123123,
                            birthDate: "1997/04/14"
                        }
                    ){
                        name
                        id
                    }
                }
            `
        })

        const result = await server.executeOperation({
            query: gql`
                mutation($deleteUserId: ID!) {
                    deleteUser(id: $deleteUserId)
                }
            `,
            variables: {
                deleteUserId: createdUser.data.createUser.id
            }
        })

        const foundUser = await User.findById(createdUser.data.createUser.id)

        expect(result.data.deleteUser).toBeTruthy()
        expect(result.data.deleteUser).toBe('User deleted')
        expect(foundUser).toBeFalsy()

    })

})


describe('LOGIN', () => {

    it('Returns a JWT Token', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    login(
                        email: "test@gmail.com",
                        password: "password1"
                    ){
                        value
                    }
                }
            `
        })

        console.log('Prueba de contexto ---------------------------------------->', server.context(result))


        expect(result.data.login).toBeTruthy()
        expect(result.data.login.value).toBeTruthy()
    })

    it('Throws an error if email or password is empty', async () => {
        const result = await server.executeOperation({
            query: gql`
                mutation {
                    login(
                        email: "",
                        password: "password1"
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
                        email: "test@gmail.com",
                        password: "password11"
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

describe('UPDATE USER', () => {

    it('Should return updated user', async () => {

        const foundUser = await User.findOne({ email: 'test@gmail.com' })

        const updatedUser = await server.executeOperation({
            query: gql`
                mutation($updateUserId: ID!, $user: UserInput ){
                    updateUser(id: $updateUserId, user: $user) {
                        phoneNumber
                    }
                }
            `,
            variables: {
                updateUserId: foundUser.id,
                user: {
                    phoneNumber: 111222333
                }
            }
        })

        expect(updatedUser.data.updateUser.phoneNumber).toBe(111222333)
        expect(updatedUser.errors).toBeFalsy()

    })

})

describe('GET ALL USERS', () => {

    // it('Should return an error if there are no users', async () => {

    // })

    it('Should return an array of users', async () => {

        const users = await server.executeOperation({
            query: gql`
                query{
                    getAllUsers{
                        name
                    }
                }
            `
        })

        expect(users.data.getAllUsers).toBeTruthy()
        expect(typeof users.data.getAllUsers.length).toBe('number')

    })

})

describe('GET CURRENT USER', () => {

    // it('Should return an error if there is no user logged in', async () => {

    // })

    // it('Should return the logged in user', async () => {

    //     const getContext = () => {
    //         const dataloaders = Object.keys(loaders).reduce((dataloaders, loaderKey) => ({
    //             ...dataloaders,
    //             [loaderKey]: loaders[loaderKey].getLoader(),
    //         }), {});

    //         return {
    //             ...context,
    //             req: {},
    //             dataloaders,
    //         };
    //     }

    //     const token = await server.executeOperation({
    //         query: gql`
    //             mutation {
    //                 login(
    //                     email: "test@gmail.com",
    //                     password: "password1"
    //                 ){
    //                     value
    //                 }
    //             }
    //         `
    //     })

    //     const currentUser = await server.executeOperation({
    //         query: gql`
    //             query{
    //                 getCurrentUser{
    //                     name
    //                 }
    //             }
    //         `,
    //         context: getContext
    //         // http: {
    //         //     headers: {
    //         //         authorization: `Bearer ${token.data.login.value}`
    //         //     }
    //         // }
    //     })

    //     console.log('el usuario ---------------------------------->', currentUser)

    //     expect(currentUser.data.getCurrentUser.name).toEqual('TestUpdated' || 'Test')

    // })

})


describe('GraphQL Schemas', () => {

    it('Should match the GraphQL TypeDefs', () => {
        expect(typeDefs).toMatchSnapshot()
    })

})

// afterAll(() => {
//     server.stop()
// })