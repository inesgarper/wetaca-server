import User from './../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ApolloError, UserInputError } from 'apollo-server'

const saltRounds = 10


const userResolvers = {

    Query: {

        getCurrentUser: (_, args, { currentUser }) => {

            if (!currentUser) throw new ApolloError('Log in required')

            return currentUser
        },

        getAllUsers: async (_, args, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') throw new ApolloError('Not authorizated, needs permissions')

            return await User.find()
        },
    },

    Mutation: {
        createUser: async (_, { userData }) => {

            // EMPTY FIELDS VALIDATION

            for (const input in userData) {
                if (userData[input] === '') throw new UserInputError('Provide all inputs')
            }

            // EMAIL VALIDATION

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
            if (!emailRegex.test(userData.email)) {
                throw new UserInputError('Provide valid email address')
            }

            // CHECK DUPLICATED USERS

            const { email, password } = userData
            const foundUser = await User.findOne({ email })

            if (foundUser) {
                throw new UserInputError('Email already registered')
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const user = new User({ ...userData, password: hashedPassword })
            return user.save()
        },

        updateUser: async (_, { userData }, { currentUser }) => {

            const { _id } = currentUser

            const updatedUser = await User.findByIdAndUpdate(_id, {
                $set: userData
            }, { new: true })

            return updatedUser
        },

        addPaymentMethod: async (_, { paymentMethodData }, { currentUser }) => {

            const { _id } = currentUser

            const updatedUser = await User.findByIdAndUpdate(_id, {
                $addToSet: { paymentMethods: paymentMethodData }
            }, { new: true })

            return updatedUser

        },

        deletePaymentMethod: async (_, { paymentMethodID }, { currentUser }) => {

            const { _id } = currentUser

            const updatedUser = await User.findByIdAndUpdate(_id, {
                $pull: { paymentMethods: { _id: { $eq: paymentMethodID } } }
            }, { new: true })

            return updatedUser
        },

        deleteUser: async (_, { id }, { currentUser }) => {

            if (!currentUser || currentUser.role !== 'ADMIN') return null

            const deletedUser = await User.findByIdAndDelete(id)
            return `User ${deletedUser.name} ${deletedUser.lastName} was deleted!`
        },


        login: async (_, { email, password }) => {

            // EMPTY FIELDS VALIDATION

            if (email === '' || password === '') {
                throw new UserInputError('Provide email and password')
            }

            const foundUser = await User.findOne({ email })

            if (!foundUser) {
                throw new UserInputError('User not found')
            }

            if (bcrypt.compareSync(password, foundUser.password)) {
                const { name, lastName, email, role, _id } = foundUser
                const payload = { name, lastName, email, role, _id }

                const authToken = jwt.sign(
                    payload,
                    'secret',
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                return {
                    value: authToken
                }
            } else {
                throw new UserInputError('Wrong credentials')
            }
        }

    }
}

export default userResolvers