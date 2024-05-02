$(document).ready(function () {
    $("#chatBtnEnviar").click(enviarMensaje);
    $("#chatInput").keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            enviarMensaje();
        }
    });

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

function enviarMensaje() {
    var inputEnviar = $("#chatInput").val();
    console.log(inputEnviar);
    var mensajeDiv = $('<div></div>').text(inputEnviar).addClass('mensaje-enviado');
    $('.overflow-auto').append(mensajeDiv);
    $("#chatInput").val("");
    $("#chatInput").css('height', '20px'); // Reset the height
}