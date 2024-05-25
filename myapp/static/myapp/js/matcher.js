const tl = new TimelineLite({ paused: true });

tl.fromTo(".carousel-item.active", { opacity: 0 }, { opacity: 1 }, 0.5, { ease: Power4.easeInOut });

tl.fromTo(".carousel-item", { opacity: 1 }, { opacity: 0 }, 0.5, { ease: Power4.easeInOut });

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

window.addEventListener('resize', () => {
    const images = document.querySelectorAll('.card-img-top');
  
    images.forEach(image => {
      const cardWidth = image.closest('.card').offsetWidth;
      const aspectRatio = image.naturalWidth / image.naturalHeight;
  
      const newWidth = Math.min(cardWidth, cardWidth * 0.8);
      const newHeight = newWidth / aspectRatio;
  
      gsap.to(image, {
        width: newWidth,
        height: newHeight,
        duration: 0.5,
        ease: "Power2.easeInOut"
      });
    });
  });
  

  const carousel = document.querySelector('.carousel');
  window.addEventListener('resize', () => {
    const breakpoint = 768;
    const columns = carousel.querySelectorAll('.col');

    if (window.innerWidth < breakpoint) {
      columns.forEach(column => {
        carousel.appendChild(column);
      });
      gsap.to(columns, {
        x: 0,
        duration: 0.5,
        ease: "Power2.easeInOut"
      });
    } else {
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
      const fontSize = Math.max(16, Math.min(40, window.innerWidth / 100));
      gsap.to(heading, {
        fontSize: fontSize + 'px',
        duration: 0.5,
        ease: "Power2.easeInOut"
      });
    });
  });
  