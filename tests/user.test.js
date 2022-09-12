import { gql } from "apollo-server"
import mongoose from "mongoose"
import { typeDefs } from "../graphql/typeDefs"
import User from "../models/User"
import testServer, { userContext } from "../testServer"
import { user } from "./helpers"


beforeAll(async () => {

    await User.deleteMany()

    const newUser = new User(user)
    await newUser.save()

    userContext._id = newUser.id
})


describe('SIGNUP', () => {
    it('Creates user when providing correct data', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                mutation($userData: UserInput){
                    createUser(userData: $userData) {
                        name
                        id
                    }
                }
            `,
            variables: {
                userData: {
                    name: "SignUp",
                    lastName: "Test",
                    email: "signuptest@gmail.com",
                    password: "password1",
                    phoneNumber: 123123123,
                    birthDate: "1997/04/14",
                }
            }
        })

        expect(result.data.createUser).toBeTruthy()
        expect(result.errors).toBeFalsy()
        expect(result.data.createUser.name).toBe('SignUp')

    })

    it('Throws error if user does not provide all inputs', async () => {
        const result = await testServer.executeOperation({
            query: gql`
                mutation($userData: UserInput){
                    createUser(userData: $userData) {
                        name
                    }
                }
            `,
            variables: {
                userData: {
                    name: "",
                    lastName: "Test",
                    email: "signuptest@gmail.com",
                    password: "password1",
                    phoneNumber: 123123123,
                    birthDate: "1997/04/14",
                }
            }
        })

        expect(result.data.createUser).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide all inputs')

    })

    it('Throws error if email is not valid', async () => {
        const result = await testServer.executeOperation({
            query: gql`
                mutation($userData: UserInput){
                    createUser(userData: $userData) {
                        name
                    }
                }
            `,
            variables: {
                userData: {
                    name: "SignUp",
                    lastName: "Test",
                    email: "signuptestgmail.com",
                    password: "password1",
                    phoneNumber: 123123123,
                    birthDate: "1997/04/14",
                }
            }
        })

        expect(result.data.createUser).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide valid email address')

    })

    it('Throws error if email already registered', async () => {
        const result = await testServer.executeOperation({
            query: gql`
                mutation($userData: UserInput){
                    createUser(userData: $userData) {
                        name
                    }
                }
            `,
            variables: {
                userData: {
                    name: "SignUp",
                    lastName: "Test",
                    email: "signuptest@gmail.com",
                    password: "password1",
                    phoneNumber: 123123123,
                    birthDate: "1997/04/14",
                }
            }
        })

        expect(result.data.createUser).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Email already registered')

    })
})

// FUNCIONA
describe('DELETE USER', () => {

    it('Should delete the user and return confirmation message', async () => {

        const user = await User.findOne({ email: "signuptest@gmail.com" })

        const result = await testServer.executeOperation({
            query: gql`
                mutation($deleteUserId: ID!){
                    deleteUser(id: $deleteUserId)
                }
            `,
            variables: {
                deleteUserId: user.id
            }
        })

        const foundUser = await User.findById(user.id)

        expect(result.data.deleteUser).toBeTruthy()
        expect(result.data.deleteUser).toBe('User SignUp Test was deleted!')
        expect(foundUser).toBeFalsy()

    })
})

// FUNCIONA
describe('LOGIN', () => {

    it('Returns a JWT Token', async () => {
        const result = await testServer.executeOperation({
            query: gql`
                mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        value
                    }
                }
            `,
            variables: {
                email: "testuser@gmail.com",
                password: "password1"
            }
        })

        expect(result.data.login).toBeTruthy()
        expect(result.data.login.value).toBeTruthy()
    })

    it('Throws an error if email or password is empty', async () => {
        const result = await testServer.executeOperation({
            query: gql`
                mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        value
                    }
                }
            `,
            variables: {
                email: "",
                password: "password"
            }
        })

        expect(result.data.login).toBeFalsy()
        expect(result.errors).toBeTruthy()
        expect(result.errors[0].message).toBe('Provide email and password')

    })

    it('Throws an error if password is wrong', async () => {
        const result = await testServer.executeOperation({
            query: gql`
                mutation Login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        value
                    }
                }
            `,
            variables: {
                email: "testuser@gmail.com",
                password: "password"
            }
        })

        expect(result.errors[0].message).toBe('Wrong credentials')

    })

    // it('Throws an error if email is not registered', async () => {

    //     const result = testServer.executeOperation({
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

// FUNCIONA
describe('UPDATE USER', () => {

    it('Should return updated user', async () => {

        const updatedUser = await testServer.executeOperation({
            query: gql`
                mutation($userData: UserInput){
                    updateUser(userData: $userData) {
                        phoneNumber
                    }
                }
            `,
            variables: {
                userData: {
                    phoneNumber: 111222333
                }
            }
        })

        expect(updatedUser.data.updateUser.phoneNumber).toBe(111222333)
        expect(updatedUser.errors).toBeFalsy()

    })
})


describe('GET ALL USERS', () => {

    it('Should return an array of users', async () => {

        const users = await testServer.executeOperation({
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

// COMPROBAR

describe('GET CURRENT USER', () => {

    // it('Should return an error if there is no user logged in', async () => {

    // })

    it('Should return the logged in user', async () => {

        const result = await testServer.executeOperation({
            query: gql`
                query{
                    getCurrentUser {
                        name
                        id
                    }
                }
            `
        })
        expect(result.data.getCurrentUser.name).toBe('Test')

    })
})


// FUNCIONA

describe('GraphQL Schemas', () => {

    it('Should match the GraphQL TypeDefs', () => {
        expect(typeDefs).toMatchSnapshot()
    })
})