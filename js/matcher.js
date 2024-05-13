// 1. Implementando funcionalidades de responsividad

const tl = new TimelineLite({ paused: true });
// Animación de transición de entrada
tl.fromTo(".carousel-item.active", { opacity: 0 }, { opacity: 1 }, 0.5, { ease: Power4.easeInOut });
// Animación de transición de salida
tl.fromTo(".carousel-item", { opacity: 1 }, { opacity: 0 }, 0.5, { ease: Power4.easeInOut });
// Al cambiar de diapositiva, reproducir la animación
$(".carousel").on("slid.bs.carousel", function (event) {
  tl.restart();
});

const buttons = document.querySelectorAll('.col a');

buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    gsap.to(button, {
      scale: 1.1,
      color: '#f00',
      duration: 0.3,
      ease: "Back.easeOut"
    });
  });

  button.addEventListener('mouseout', () => {
    gsap.to(button, {
      scale: 1,
      color: '#000',
      duration: 0.3,
      ease: "Back.easeIn"
    });
  });
});
// Adaptación del tamaño de las imágenes:
window.addEventListener('resize', () => {
    const images = document.querySelectorAll('.card-img-top');
  
    images.forEach(image => {
      const cardWidth = image.closest('.card').offsetWidth; // Obtener el ancho de la tarjeta
      const aspectRatio = image.naturalWidth / image.naturalHeight; // Obtener la relación de aspecto de la imagen
  
      const newWidth = Math.min(cardWidth, cardWidth * 0.8); // Limitar el ancho máximo de la imagen
      const newHeight = newWidth / aspectRatio; // Calcular la nueva altura en función del ancho y la relación de aspecto
  
      gsap.to(image, {
        width: newWidth,
        height: newHeight,
        duration: 0.5,
        ease: "Power2.easeInOut"
      });
    });
  });
  
// Reorganización del contenido

  const carousel = document.querySelector('.carousel');
  window.addEventListener('resize', () => {
    const breakpoint = 768; // Punto de ruptura para el cambio de diseño
    const columns = carousel.querySelectorAll('.col');

    if (window.innerWidth < breakpoint) {
      // Diseño para dispositivos móviles (una columna)
      columns.forEach(column => {
        carousel.appendChild(column);
      });
      gsap.to(columns, {
        x: 0,
        duration: 0.5,
        ease: "Power2.easeInOut"
      });
    } else {
      // Diseño para escritorio (dos columnas)
      while (columns.length > 0) {
        const column1 = columns.shift();
        const column2 = columns.shift();
        carousel.appendChild(column1);
        carousel.appendChild(column2);
      }
      gsap.to(columns, {
        x: 0,
        duration: 0.5,
        ease: "Power2.easeInOut"
      });
    }
  });
  
  window.addEventListener('resize', () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
    headings.forEach(heading => {
      const fontSize = Math.max(16, Math.min(40, window.innerWidth / 100)); // Calcular el tamaño de fuente en función del ancho de la pantalla
      gsap.to(heading, {
        fontSize: fontSize + 'px',
        duration: 0.5,
        ease: "Power2.easeInOut"
      });
    });
  });
  