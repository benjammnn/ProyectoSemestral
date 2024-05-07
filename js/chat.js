$(document).ready(function () {
    $("#chatBtnEnviar").click(enviarMensaje);
    $("#chatInput").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            enviarMensaje();
        }
    });

    $('#fileInput').on('change', function() {
      var file = this.files[0];
      if (file) {
        enviarArchivo(file);
      }
    });
  
    // ...
    function enviarArchivo(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var mensajeDiv = $('<div></div>').addClass('mensaje-enviado');
        mensajeDiv.append($('<span></span>').text(e.target.result));
        var eliminarBtn = $('<a></a>').addClass('eliminar-btn').html('<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line>       <line x1="6" y1="6" x2="18" y2="18"></line></svg>').click(function() {
          contenedor.remove();
        });
        var contenedor = $('<div></div>').addClass('contenedor-mensaje').append(mensajeDiv).append(eliminarBtn);
        $('.overflow-auto').append(contenedor);
      };
      reader.readAsDataURL(file);
    }
    
    function enviarMensaje() {
      var mensaje = $("#chatInput").val();
      if (mensaje.trim() != '') {
        var mensajeDiv = $('<div></div>').addClass('mensaje-enviado');
        mensajeDiv.append($('<span></span>').text(mensaje));
        var eliminarBtn = $('<a></a>').addClass('eliminar-btn').html('<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="4" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line>       <line x1="6" y1="6" x2="18" y2="18"></line></svg>').click(function() {
          contenedor.remove();
        });
        var contenedor = $('<div></div>').addClass('contenedor-mensaje').append(mensajeDiv).append(eliminarBtn);
        $('.overflow-auto').append(contenedor);
        $("#chatInput").val('');
      }
    }

    var textarea = document.getElementById('chatInput');
    textarea.addEventListener('input', autoResize, false);
    
    function autoResize() {
        if (this.value === '') {
            this.style.height = '20px'; // Reset the height to the initial height
        } else if (this.scrollHeight > this.clientHeight) {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }
    }
});

