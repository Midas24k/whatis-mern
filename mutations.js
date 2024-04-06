// Import the gql tagged template function from the Apollo Client library
import { gql } from '@apollo/client';


// Define the LOGIN_USER mutation
// This mutation takes an email and password as arguments and returns a token and user data
export const LOGIN_USER = gql`

    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
                token
                user {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
            }
        }
    }
`;

// Define the ADD_USER mutation
// This mutation takes a username, email, and password as arguments and returns a token and user data
export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                    link
                    
                }
            }
        }
    }
`;

// Define the SAVE_BOOK mutation
// This mutation takes a BookInput as an argument and returns the updated user data
export const SAVE_BOOK = gql`
    mutation SaveBook($input: BookInput!) {
        saveBook(input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

// Define the REMOVE_BOOK mutation
// This mutation takes a bookId as an argument and returns the updated user data
export const REMOVE_BOOK = gql`
    mutation RemoveBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;