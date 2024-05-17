$(document).ready(function () {
    let user = $("#user");
    let mensajesError = $("#mensajesError");
  
    $("#btncod").click(function (event) {
      event.preventDefault();
      validarFormulario(user, mensajesError);
    });
  
    user.keyup(function () {
      validarEmail(user, mensajesError);
    });
  });
  
  function validarFormulario(user, mensajesError) {
    mensajesError.empty(); 
    let validEmail = validarEmail(user, mensajesError);
  
    if (!validEmail) {
      mensajesError.append("<p>El correo electrónico no es válido.</p>");
    }
  
    if (validEmail) {
      $("#formulario").submit();
      window.location.replace("login.html");
    }
  }
  
  function validarEmail(user, mensajesError) {
    let email = user.val().trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    mensajesError.empty();
    if (!emailRegex.test(email)) {
      return false;
    } else {
      return true;
    }
  }
  