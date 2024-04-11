import React from 'react';

function AddProduct () {

    function Add() {
        const header = document.getElementById('header').value
        const price = document.getElementById('price').value
        const images = document.getElementById('images').value
        
        if (header.length === 0 || price.length === 0 || images.length === 0) {
            document.getElementById('regError').innerText = "Вы ввели данные неправильно!"
            return 
          }
        const data = {
            header: header,
            price: price,
            images:images
        }

        console.log(data)

        const api = 'http://localhost:9001/AddProduct'

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
            <h1>Добавление товара</h1>
            <input id='header' type='text' placeholder='Наименование товара'/>
            <input id='price' type='text' placeholder='Цена'/>
            <input id='images' type='text' placeholder='Путь к изображению'/>
            <p id='regError'></p>
            <button onClick={Add}>Сохранить</button>
            <p className='message'>{}</p>
        </>
    );
}

export default AddProduct;
