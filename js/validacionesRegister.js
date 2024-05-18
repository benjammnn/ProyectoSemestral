$(document).ready(function () {
      $("#formulario").on("submit", function (event) {
        event.preventDefault();
        let errorMessages = $("#mensajesError");
        errorMessages.empty().hide();

        let nombres = $("#nombres");
        let apellidos = $("#apellidos");
        let rut = $("#rut");
        let carrera = $("#carrera");
        let email = $("#mail");
        let password = $("#password");
        let day = $("#day");
        let month = $("#birthMonth");
        let year = $("#year");
        let gender = $("input[name='gender']:checked");

        let valid = true;

        valid &= validarCampoNoVacio(nombres, "Nombres", errorMessages);
        valid &= validarCampoNoVacio(apellidos, "Apellidos", errorMessages);
        valid &= validarRut(rut, errorMessages);
        valid &= validarCampoNoVacio(carrera, "Carrera", errorMessages);
        valid &= validarEmail(email, errorMessages);
        valid &= validarContraseña(password, errorMessages);
        valid &= validarFechaNacimiento(day, month, year, errorMessages);
        valid &= validarGenero(gender, errorMessages);

        if (valid) {
          window.location.href = "login.html";
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

    function validarRut(rut, mensajesError) {
      let rutRegex = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}$/;
      if (!rutRegex.test(rut.val().trim())) {
        mensajesError.append("<p>El campo RUT no tiene el formato correcto.</p>");
        return false;
      }
      return true;
    }

    function validarEmail(email, mensajesError) {
      let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.val().trim())) {
        mensajesError.append("<p>El campo Email no tiene el formato correcto.</p>");
        return false;
      }
      return true;
    }

    function validarContraseña(pass, mensajesError) {
      let contraseña = pass.val().trim();
      let errores = [];

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
      } else {
        return true;
      }
    }

    function validarFechaNacimiento(day, month, year, mensajesError) {
      if (!day.val() || !month.val() || !year.val()) {
        mensajesError.append("<p>La Fecha de nacimiento es obligatoria.</p>");
        return false;
      }
      return true;
    }

    function validarGenero(gender, mensajesError) {
      if (!gender.length) {
        mensajesError.append("<p>El campo Sexo es obligatorio.</p>");
        return false;
      }
      return true;
    }