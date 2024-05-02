$(document).ready(function () {
    $("#chatBtnEnviar").click(enviarMensaje);
    $("#chatInput").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            enviarMensaje();
        }
    });
});

function enviarMensaje() {
    var inputEnviar = $("#chatInput").val();
    console.log(inputEnviar);
    var mensajeDiv = $('<div></div>').text(inputEnviar).addClass('mensaje-enviado');
    $('.overflow-auto').append(mensajeDiv);
    $("#chatInput").val("");
    $("#chatInput").css('height', 'auto'); // Reset the height
}
var textarea = document.getElementById('chatInput');
    textarea.addEventListener('input', autoResize, false);
    
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }