$(document).ready(function () {
  $("#formulario").on("submit", function (event) {
    event.preventDefault();
    let errorMessages = $("#mensajesError");
    errorMessages.empty().hide();

    let nombres = $("#nombres");
    let Appat = $("#Appat");
    let email = $("#mail");
    let password = $("#password");
    let birthDate = $("#birthDate");


    let valid = true;

    valid &= validarCampoNoVacio(nombres, "Nombres", errorMessages);
    valid &= validarCampoNoVacio(Appat, "Apellido Paterno", errorMessages);
    valid &= validarEmail(email, errorMessages);
    valid &= validarContraseña(password, errorMessages);
    valid &= validarFechaNacimiento(birthDate, errorMessages);


      
    if (valid) {
      windows.location.href = "";
    } else {
      errorMessages.show();
    }
  });
});

function validarCampoNoVacio(campo, nombreCampo, mensajesError) {
  if (campo.val().trim() === "") {
    mensajesError.append(`<p>El campo ${nombreCampo} es obligatorio.</p>`);
    return false;
  }
  return true;
}

function validarEmail(email, mensajesError) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.val().trim() === "") {
    mensajesError.append("<p>El campo Email es obligatorio.</p>");
    return false;
  } else if (!emailRegex.test(email.val().trim())) {
    mensajesError.append("<p>El campo Email no tiene el formato correcto.</p>");
    return false;
  }
  return true;
}

function validarContraseña(pass, mensajesError) {
  let contraseña = pass.val().trim();
  let errores = [];

  if (contraseña === "") {
    errores.push("El campo Contraseña es obligatorio.");
  }
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

  if (errores.length > 0) {
    for (let error of errores) {
      mensajesError.append(`<p>${error}</p>`);
    }
    return false;
  }
  return true;
}

function validarFechaNacimiento(birthDate, mensajesError) {
  if (birthDate.val().trim() === "") {
    mensajesError.append("<p>La Fecha de nacimiento es obligatoria.</p>");
    return false;
  }

  let birth = new Date(birthDate.val());
  let today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  let m = today.getMonth() - birth.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 18) {
    mensajesError.append("<p>Debes tener al menos 18 años para registrarte.</p>");
    return false;
  } else if (age > 100) {
    mensajesError.append("<p>La edad no puede ser mayor a 100 años.</p>");
    return false;
  }
  return true;
}


