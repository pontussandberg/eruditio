import React from 'react';

// const login = () => fetch('/auth/google')
//     .then(res => res.json())
//     .then(console.log)
//     .catch(console.error)

const stuff = () => fetch('http://localhost:5000/lol')
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);

const GoogleOAuth = () => (
    <>
        <a href="http://localhost:5000/auth/google">Google Login</a>
        <button onClick={stuff}>Click me!</button>
    </>
);

export default GoogleOAuth;
