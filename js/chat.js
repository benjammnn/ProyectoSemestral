$(document).ready(function () {
  $("#chatBtnEnviar").click(enviarMensaje);
  $("#chatInput").keypress(function (event) {
    // Verificar si la tecla presionada fue Enter
    if (event.which == 13) {
      // Prevenir la acción por defecto de la tecla Enter
      event.preventDefault();
      enviarMensaje();
    }
  });
  $('#fileInput').on('change', function () {
    var file = this.files[0];
    if (file) {
      enviarArchivo(file);
    }
  });
});
function enviarArchivo(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
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

function enviarMensaje() {
  var mensaje = $("#chatInput").val();
  if (mensaje.trim() != '') {
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
}

var textarea = document.getElementById('chatInput');
textarea.addEventListener('input', autoResize, false);

function autoResize() {
  if (this.value === '') {
    this.style.height = '20px'; // Reset the height to the initial height
  }
}