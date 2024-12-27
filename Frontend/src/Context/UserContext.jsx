import React from 'react'
import { createContext } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const url = 'http://localhost:8000/api/v2'
    const token = localStorage.getItem('accessToken')


    return (
        <UserContext.Provider value={{ url, token }}>
            {children}
        </UserContext.Provider>
    )
}