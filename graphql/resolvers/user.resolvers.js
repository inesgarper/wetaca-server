import User from './../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const saltRounds = 10


const userResolvers = {

    Query: {
        hello: () => 'Hello',
        getCurrentUser: (_, args, context) => context.currentUser
    },

    Mutation: {
        createUser: (_, args) => {

            // checkear que no exista

            const { password } = args.user

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const user = new User({ ...args.user, password: hashedPassword })
            return user.save()
        },

        login: async (_, args) => {

            const { email, password } = args

            const foundUser = await User.findOne({ email })

            if (bcrypt.compareSync(password, foundUser.password)) {
                const { name, lastName, email, _id } = foundUser
                const payload = { name, lastName, email, _id }

                console.log('el pauload', payload)

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                return {
                    value: authToken
                }
            }
        }

    }
}

export default userResolvers