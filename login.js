const toggleRegister = document.getElementById('toggleRegister');
        const toggleLogin = document.getElementById('toggleLogin');
        const registerBox = document.getElementById('registerBox');
        const loginForm = document.getElementById('loginForm');

        toggleRegister.addEventListener('click', () => {
            registerBox.style.display = 'block';
            loginForm.style.display = 'none';
        });

        toggleLogin.addEventListener('click', () => {
            registerBox.style.display = 'none';
            loginForm.style.display = 'block';
        });
        const express = require ('express');
        const mysql = require ('mysql2');

        const app = express ();
        const db = mysql.createConnection ({
host: 'localhost',
user: 'root',
password: '',
database: 'usuarios'
        });

db.connect((err)=>{
    if (err){
        console.error('Error conctando a la base de datos: ',err);
return;
    }
});

app.listen(3000,() => {
    console.log('server corriendo en puerto 3000');

});