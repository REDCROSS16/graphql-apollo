## BACKEND
npm init -y
npm i express graphql express-graphql cors nodemon

query {
    getAllUsers {
        id, username, age
    }
}

mutation {
    createUser (input:{
        username: "Nastya"
        age:35
    }) {
        id, username, age
    }
}

query {
    getAllUsers {
        id, username, age
    }
}

mutation {
    createUser (input: {
        username: "'Boooks'",
        age: 100,
        posts:[
            {id: 1, title:"Interesting post", context:" Sooome big text"}
        ]
        }) {
            id, username
    }
}

query {
    getAllUsers {
        id, username, posts {
            id, title, content
        }
    }
}


## FRONTEND
npx create-react-app my-app
npm install @apollo/client graphql