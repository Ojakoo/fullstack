import React from 'react'

const LogoutForm = ({ handleLogout, user}) => {
    return (
        <form onSubmit={handleLogout}>
            <div>
                <p>{user.name} logged in <button type="submit">logout</button></p>
            </div>
        </form>
    )
}

export default LogoutForm