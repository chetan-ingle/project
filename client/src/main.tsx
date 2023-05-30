import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import UserContext from '../Context/UserContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <UserContext>
        <App />
    </UserContext>
)
