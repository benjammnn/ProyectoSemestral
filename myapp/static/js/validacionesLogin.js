import usuarios from './usuario.js';

const button = document.getElementById('btnLogin');

function validarEmail(email){
  let mensajeError = document.getElementById('mensajeError');
  let correoValido = false;
  for (let usuario in usuarios){
    if (usuarios[usuario].correo === email){
      correoValido = true;
      break;
    }
  }
  if(correoValido === true){
    return true;
  } else  if(email === ''){
    mensajeError.innerHTML = 'Ingrese un correo';
  } else{
    mensajeError.innerHTML = 'Correo no registrado';
  }
}


function validarPassword(pass){
  let mensajeError = document.getElementById('mensajeError');
  let passValida = false;
  for (let usuario in usuarios){
    if (usuarios[usuario].contrasena === pass){
      passValida = true;
      break;
    }
  }
  if(passValida === true){
    return true
  } else if (pass === ''){
    mensajeError.innerHTML = 'Ingrese una contraseña';
  } else {
    mensajeError.innerHTML = 'Contraseña incorrecta';
  }
}

function validacionLogin(email, pass){
  let mensajeError = document.getElementById('mensajeError');
  if(validarEmail(email) === true && validarPassword(pass) === true){
    return true;
  } else{
  mensajeError.innerHTML = 'Ingrese un correo o contraseña no válidos';
  return false;}
}
button.addEventListener('click', function(e){
  e.preventDefault();
  let email = document.getElementById('email').value;
  let pass = document.getElementById('pass').value;
  if(validacionLogin(email, pass) === true){
    window.location.href = '../perfilUser';
  }
  }
);
 