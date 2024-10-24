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

// CREATE - Ruta para crear un usuario (POST)
app.post('/api/usuarios', async (req, res) => {
    const { nombre, password, email } = req.body;

    // Validar que los datos estén presentes
    if (!nombre || !password || !email) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el usuario en la base de datos
        const query = 'INSERT INTO usuario (nombre, password, email) VALUES (?, ?, ?)';
        db.query(query, [nombre, hashedPassword, email], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    // Manejar error de entrada duplicada
                    return res.status(409).json({ message: 'El correo ya está registrado' });
                }
                // Otros errores
                return res.status(500).json({ message: 'Error al crear el usuario', error: err });
            }

            console.log('Usuario creado:', { id: result.insertId, nombre: nombre, email: email });
            res.status(201).json({ message: 'Usuario creado', userId: result.insertId });
        });
    } catch (error) {
        console.error('Error en la creación del usuario:', error);
        res.status(500).json({ message: 'Error en la creación del usuario' });
    }
});