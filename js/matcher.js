// Instancia de GreenSock
const tl = new TimelineLite({ paused: true });

// Animación de transición de entrada
tl.fromTo(".carousel-item.active", { opacity: 0 }, { opacity: 1 }, 0.5, { ease: Power4.easeInOut });

// Animación de transición de salida
tl.fromTo(".carousel-item", { opacity: 1 }, { opacity: 0 }, 0.5, { ease: Power4.easeInOut });

// Al cambiar de diapositiva, reproducir la animación
$(".carousel").on("slid.bs.carousel", function (event) {
  tl.restart();
});
