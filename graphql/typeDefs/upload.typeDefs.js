import { gql } from "apollo-server"
import uploader from './../../config/cloudinary.config.js'

const uploadTypeDefs = gql`

    # Definitions

    type Upload {
        cloudinary_urls: [String]
    }


    # Querys
    

    # Inputs

    
    # Mutations

    type Mutation {
        uploadImage
    }

`

export default uploadTypeDefs