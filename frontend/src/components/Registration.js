import React from 'react';

function Registration () {

    function Reg() {
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const email = document.getElementById('email').value
        
        if (email.length === 0 || login.length === 0 || password.length === 0) {
            document.getElementById('regError').innerText = "Вы ввели данные неправильно!"
            return 
          }
        const data = {
            login: login,
            password: password,
            email:email
        }

        console.log(data)

        const api = 'http://localhost:9001/registration'

        fetch(api, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then((result) => {
            document.getElementById('regError').innerText = result.message
            console.log(result)           
                })

    }

    return (
        <>
            <h1>Регистрация</h1>
            <input id='login' type='text' placeholder='Логин'/>
            <input id='password' type='password' placeholder='Пароль'/>
            <input id='email' type='email' placeholder='Почта'/>
            <p id='regError'></p>
            <button onClick={Reg}>Сохранить</button>
            <p className='message'>{}</p>
        </>
    );
}

export default Registration;
