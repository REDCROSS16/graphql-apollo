import React, {useEffect, useState} from 'react';
import './App.css'
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_USER} from "./query/user";
import {CREATE_USER} from "./mutations/user";

const App = () => {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS, {pollInterval: 500})
    const {data:oneUser, loading: loadingOneUser} = useQuery(GET_USER, {
        variables: {
            id: 1
        }
    })
    const [newUser] = useMutation(CREATE_USER)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)

    console.log(oneUser)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const addUser = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {
                    username: String(username), // Убедитесь, что это строка
                    age: Number(age) // Убедитесь, что это число
                }
            }
        })
            .then(({ data }) => {
                console.log(data);
                setUsername('');
                setAge(0);
            })
            .catch((error) => {
                console.error("Error adding user:", error);
            });
    };

    const getAll = e => {
        e.preventDefault()
        refetch()
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <form>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text"/>
                <input value={age} onChange={e => setAge(e.target.value)} type="number"/>
                <div className="btns">
                    <button onClick={(e) => addUser(e)}>Создать</button>
                    <button onClick={e => getAll(e)}>Получить</button>
                </div>
            </form>
            <div>
                {users.map(user =>
                    <div className="user">{user.id}. {user.username} {user.age}</div>
                )}
            </div>
        </div>
    );
};

export default App;
