function loadChatHistory() {
  const history = JSON.parse(localStorage.getItem('chatHistory')) || {};
  return history;
}

function setChatHistory(contact, messages) {
  const history = loadChatHistory();
  history[contact] = messages;
  localStorage.setItem('chatHistory', JSON.stringify(history));
}

let usuarioActivo = null;

$(document).ready(function () {
  $("#chatBtnEnviar").click(enviarMensaje);
  $("#chatInput").keypress(function (event) {
    // Verificar si la tecla presionada fue Enter
    if (event.which == 13) {
      // Prevenir la acción por defecto de la tecla Enter
      event.preventDefault();
      enviarMensaje();
    }
    autoResize.call(this); 
  });
  $('#fileInput').on('change', function () {
    var file = this.files[0];
    if (file) {
      enviarArchivo(file);
    }
  });
  fetch('js/usuario.json')
    .then(response => response.json())
    .then(data => {
      const contenedorContactos = document.querySelector('.list-group');
      const contenedorConversacion = document.querySelector('.chat .overflow-auto');
      const inputMensaje = document.querySelector('#chatInput');
      const botonEnviar = document.querySelector('#fileUploadBtn');
      const cabeceraChat = document.querySelector('.chat-header');
      const inputFiltro = document.querySelector('#filtroContactos');
      const historial = loadChatHistory();


      data.usuarios.forEach(usuario => {
        // Crear un nuevo elemento de contacto para cada usuario
        const elementoContacto = document.createElement('div');
        elementoContacto.classList.add('contacto');
        elementoContacto.setAttribute('data-contacto-id', usuario.id);

        // Crear el contenido del elemento de contacto
        elementoContacto.innerHTML = `
                <a href="#" class="list-group-item list-group-item-action" data-contacto-id="${usuario.id}">
                    <div class="d-flex w-100 justify-content-between">
                        <img src="${usuario.fotoPerfil}" alt="Foto de perfil" class="rounded-circle me-2" style="width: 50px; height: 50px; object-fit: cover;">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${usuario.nombre}</h6>
                            <small>${usuario.mensajes[usuario.mensajes.length - 1]?.contenido || 'No hay mensajes'}</small>
                        </div>
                    </div>
                </a>
            `;
            


        // Añadir el evento de clic al elemento de contacto
        elementoContacto.addEventListener('click', function () {
          // Limpiar la conversación actual
          contenedorConversacion.innerHTML = '';

          // Mostrar la conversación del usuario seleccionado
          usuario.mensajes.forEach(mensaje => {
            const elementoMensaje = document.createElement('p');
            elementoMensaje.textContent = mensaje.contenido;
            contenedorConversacion.appendChild(elementoMensaje);
          });

          historial[usuario.nombre]?.forEach(mensaje => {
            renderMensaje(mensaje.message);
          });

          // Actualizar la cabecera del chat
          cabeceraChat.innerHTML = `
                    <img src="${usuario.fotoPerfil}" alt="Foto de perfil" class="rounded-circle me-2" style="width: 40px; height: 40px; object-fit: cover;">
                    <h6 class="text-dark d-flex" style="margin-left: 20px;" id="contactname">${usuario.nombre}</h6>
                    <button type="button" class="btn btn-danger" id="historyRemover" style="margin-left: auto;">Borrar Chat</button>
                `;

          // Establecer el usuario activo
          document.getElementById('historyRemover').addEventListener('click', function () {
            // Borra los mensajes del usuario activo
            usuarioActivo.mensajes = [];
          
            // Borra los mensajes del historial de chat
            historial[usuarioActivo.nombre] = [];
          
            // Actualiza el historial de chat en el almacenamiento local
            localStorage.setItem('chatHistory', JSON.stringify(historial));
          
            // Limpiar la conversación actual
            contenedorConversacion.innerHTML = '';
          });
          usuarioActivo = usuario;          
        });

        // Añadir el elemento de contacto al contenedor de contactos
        contenedorContactos.appendChild(elementoContacto);
      });

      // Añadir el evento de entrada al input de filtro
      inputFiltro.addEventListener('input', function () {
        const filtro = inputFiltro.value.toLowerCase();
      
        // Filtrar los contactos
        contenedorContactos.querySelectorAll('.contacto').forEach(contacto => {
          const nombre = contacto.querySelector('h6').textContent.toLowerCase();
          contacto.style.display = nombre.includes(filtro) ? '' : 'none';
        });
      });




      // Añadir el evento de clic al botón de enviar
      botonEnviar.addEventListener('click', function () {
        if (usuarioActivo) {
          // Añadir el mensaje al usuario activo
          usuarioActivo.mensajes.push({ contenido: inputMensaje.value });

          // Añadir el mensaje a la conversación
          const elementoMensaje = document.createElement('p');
          elementoMensaje.textContent = inputMensaje.value;
          contenedorConversacion.appendChild(elementoMensaje);

          // Limpiar el input
          inputMensaje.value = '';
        }
      });
    })
    .catch(error => console.error('Error:', error));
});



function enviarArchivo(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var mensajeDiv = $('<div></div>').addClass('mensaje-enviado');
    if (file.type.startsWith('image/')) {
      // Si el archivo es una imagen, añade un elemento img al mensaje
      var img = $('<img>').attr('src', e.target.result).css('max-width', '200px');
      var a = $('<a></a>').attr('href', e.target.result).attr('data-lightbox', 'image-' + file.name).append(img);
      mensajeDiv.append(a);
    } else {
      // Si el archivo no es una imagen, añade un enlace al archivo
      var a = $('<a></a>').attr('href', e.target.result).text(file.name);
      mensajeDiv.append(a);
    }
    $('.overflow-auto').append(mensajeDiv);
    $('.overflow-auto').scrollTop($('.overflow-auto')[0].scrollHeight);
  };
  reader.readAsDataURL(file);
}
  function historyRemove(contact) {
    const history = loadChatHistory();
    delete history[contact];
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }

  function enviarMensaje() {
  var mensaje = $("#chatInput").val();

  if (mensaje.trim() != '') {
    const history = loadChatHistory();
    history[usuarioActivo.nombre] = history[usuarioActivo.nombre] ?? [];

    history[usuarioActivo.nombre].push({
      from: 'you',
      timestamp: new Date().toISOString(),
      message: mensaje
    });

    fetch("/chat/send", {
      method: "POST",
      body: JSON.stringify({
        to: usuarioActivo.nombre,
        message: mensaje
      }),
    });

    setChatHistory(usuarioActivo.nombre, history[usuarioActivo.nombre]);
    renderMensaje(mensaje);
  }
}

function renderMensaje(mensaje) {
  var mensajeDiv = $('<div></div>').addClass('mensaje-enviado');
  mensajeDiv.append($('<span></span>').text(mensaje));
  var contenedor = $('<div></div>').addClass('contenedor-mensaje').append(mensajeDiv);
  contenedor.on('contextmenu', function (e) {
    e.preventDefault();
  });
  $('.overflow-auto').append(contenedor);
  $("#chatInput").val('');

  // Desplazar el chat hasta el final
  $('.overflow-auto').scrollTop($('.overflow-auto')[0].scrollHeight);
}

var textarea = document.getElementById('chatInput');
  textarea.addEventListener('input', autoResize, false);
  
  function autoResize() {
    if (this.value.trim() === '') {
      this.style.height = '20px'; // Reset the height to the initial height
    }
  }



/** 
const history = {
  "max": [
    {
      "from": "you",
      "timstamp": "2021-10-01T10:00:00",
      "message": "Hello"
    }
  ],
  "pablo": [
    {
      "from": "you",
      "timstamp": "2021-10-01T10:00:00",
      "message": "Hello"
    },
    {
      "from": "pablo",
      "timstamp": "2021-10-01T10:00:01",
      "message": "Hi"
    }
  ]
}
*/