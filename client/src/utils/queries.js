const { gql } = require('@apollo/client')

export const GET_ME = gql`
{
    me {
        _id
        username
        email
        bookCount
        addBook{
            bookId
            authors
            decription
            link
            image
            title
        }
    }
}
`;