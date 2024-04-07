import { gql } from '@apollo/client';  // Import the gql tagged template function   

// Define the query and mutation functionality provided by Apollo Server
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors description
                title
                image 
                link
            }
        }
    }

`;