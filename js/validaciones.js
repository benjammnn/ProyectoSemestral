$(document).ready(function () {
    let user = $("#user");
    let pass = $("#pass");
    let mensajesError = $("#mensajesError");
  
    $("#btnValidar").click(function (event) {
      event.preventDefault();
      validarFormulario(user, pass, mensajesError);
    });
  
    user.keyup(function () {
      validarEmail(user, mensajesError);
    });
  
    pass.keyup(function () {
      validarContraseña(pass, mensajesError);
    });
  });
  
  function validarFormulario(user, pass, mensajesError) {
    mensajesError.empty(); 
    let validEmail = validarEmail(user, mensajesError);
    let validPass = validarContraseña(pass, mensajesError);
  
    if (!validEmail) {
      mensajesError.append("<p>El correo electrónico no es válido.</p>");
    }
  
    if (validEmail && validPass) {
      $("#formulario").submit();
      window.location.replace("matcher.html");
    }
  }
  
  function validarEmail(user, mensajesError) {
    let email = user.val().trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    mensajesError.empty();
    if (!emailRegex.test(email)) {
      mensajesError.append("<p>El correo electrónico no es válido.</p>");
      return false;
    } else {
      return true;
    }
  }
  
  function validarContraseña(pass, mensajesError) {
    let contraseña = pass.val().trim();
    mensajesError.empty(); // Vaciar mensajes de error
  
    let errores = []; // Almacenar los errores encontrados
  
    if (contraseña.length < 8) {
      errores.push("La contraseña debe tener al menos 8 caracteres.");
    }
  
    if (!/\d/.test(contraseña)) {
      errores.push("La contraseña debe contener al menos un número.");
    }
  
    if (!/[^a-zA-Z0-9]/.test(contraseña)) {
      errores.push("La contraseña debe contener al menos un carácter especial.");
    }
  
    if (!/[a-z]/.test(contraseña)) {
      errores.push("La contraseña debe contener al menos una letra minúscula.");
    }
  
    if (!/[A-Z]/.test(contraseña)) {
      errores.push("La contraseña debe contener al menos una letra mayúscula.");
    }
  
    // Mostrar todos los mensajes de error almacenados en el array
    if (errores.length > 0) {
      for (let error of errores) {
        mensajesError.append("<p>" + error + "</p>");
      }
      mensajesError.show(); // Mostrar mensajes de error
      return false;
    } else {
      return true;
    }
  }
  
  
  