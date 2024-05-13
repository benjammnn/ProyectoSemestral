
/*
const express = require('express')
const app = express()
const port = 3000

app.get("/usuarios", (req, res) => {
  res.json({
    "usuarios": [
        {
            "id": 1,
            "nombre": "Maximiliano",
            "fotoPerfil": "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
            "mensajes": [
                {
                    "idMensaje": 1,
                    "contenido": "",
                    "fecha": "2022-01-01T00:00:00Z"
                },
                {
                    "idMensaje": 2,
                    "contenido": "",
                    "fecha": "2022-01-02T00:00:00Z"
                }
            ]
        },
        {
            "id": 2,
            "nombre": "Benjamín",
            "fotoPerfil": "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
            "mensajes": []
        },
        {
            "id": 3,
            "nombre": "Elias",
            "fotoPerfil": "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
            "mensajes": []
        }
]
});
}); 

/** /     
app.post("/mensajes", (req, res) => {
  const msg = req.body;
  res.json({
    "mensaje": "Mensaje enviado"
  });
}
*/