
// Animación de aparición de elementos al hacer scroll
const elements = document.querySelectorAll('.feature-item, .plan');
window.addEventListener('scroll', () => {
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
            element.classList.add('in-view');
        }
    });
});


// Smooth scroll for navigation links
document.querySelectorAll('header nav ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('.btn-hero').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Aquí obtenemos el 'href' desde el enlace <a> y no desde el botón.
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Detectar la sección activa y aplicar la clase activa
const sections   = document.querySelectorAll('section');
const navLinks   = document.querySelectorAll('header nav ul li a');
const headerHeight = document.querySelector('header').offsetHeight;

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    // cuando el top de la sección llega justo debajo del header
    if (rect.top <= headerHeight && rect.bottom > headerHeight) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
});



// btn effect
document.querySelectorAll('.btn-products').forEach(function(button) {
    button.addEventListener('click', function() {
        this.classList.add('btn-products-active');

        setTimeout(() => {
            this.classList.remove('btn-products-active');
        }, 1000);
    });
});



// Modal pago

// Crear el contenedor del modal
const modalContainer = document.createElement('div');
modalContainer.id = 'modalContainer';
modalContainer.innerHTML = `
  <div id="modalContent">
    <span id="closeModal">X</span>
    <h2>Confirmar Compra</h2>
    <p id="planName">Plan Seleccionado</p>
    <p id="planPrice">Precio: $</p>
    <label class="container-checkbox">
      <input type="checkbox" id="extraOption" class="custom-checkbox"> 
      <div class="checkmark"></div>Cambios Mensuales (+$10)
    </label>
    <p id="totalPrice">Total: $</p>
    <button id="payButton">Pagar</button>
  </div>
`;

document.body.appendChild(modalContainer);

function openModal(planName, planPrice) {
  document.getElementById('planName').textContent = `Plan: ${planName}`;
  document.getElementById('planPrice').textContent = `Precio: $${planPrice}`;
  document.getElementById('totalPrice').textContent = `Total: $${planPrice}`;
  document.getElementById('extraOption').checked = false;
  modalContainer.style.display = 'flex';
}

function closeModal() {
  modalContainer.style.display = 'none';
}

const actionButtons = document.querySelectorAll('.btn-products');

actionButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const planElement = e.target.closest('.plan');
    const planName = planElement.querySelector('h3').textContent;
    const planPrice = parseInt(planElement.querySelector('p').textContent.replace('$', '').replace('/mes', ''));
    openModal(planName, planPrice);
  });
});

document.getElementById('closeModal').addEventListener('click', closeModal);
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) closeModal();
});

document.getElementById('extraOption').addEventListener('change', (e) => {
  const basePrice = parseFloat(document.getElementById('planPrice').textContent.split('$')[1]);
  const extraCharge = e.target.checked ? 10 : 0;
  document.getElementById('totalPrice').textContent = `Total: $${basePrice + extraCharge}`;
});



document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.4 }); // Se activa cuando al menos el 50% del elemento es visible
  
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });
  });




  // efecto in-view social card

  document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.parent-sc');
  if (!container) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.classList.add('hover-active-sc');
      } else {
        container.classList.remove('hover-active-sc');
      }
    });
  }, {
    threshold: 0.5 // entra al menos 50% en viewport
  });

  observer.observe(container);
});





 // 1. Animacion texto fade in
    const words = document.querySelectorAll(".at-word");
    words.forEach((w, i) => {
      w.style.setProperty("--at-delay", `${i * 0.1 + 0.2}s`);
    });

    // 2. Intersection Observer para disparar la animación cuando entra en viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("at-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const heading = document.getElementById("atHeading");
    observer.observe(heading);








    document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.feature-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle(
          'feature-item-active',
          entry.isIntersecting
        );
      });
    }, {
      threshold: 0.5
    });

    items.forEach(item => observer.observe(item));
  });




  // 1) Función para envolver cada palabra en un <span class="at-word">
  function wrapWords(heading) {
    const words = heading.textContent.trim().split(/\s+/);
    heading.textContent = '';        // limpiamos
    words.forEach((w, i) => {
      const span = document.createElement('span');
      span.className = 'at-word';
      span.textContent = w + ' ';
      span.style.setProperty('--at-delay', `${i * 0.1 + 0.2}s`);
      heading.appendChild(span);
    });
  }

  // 2) Preparamos el Intersection Observer
  const observerTitle = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('at-in-view');
        observerTitle.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // 3) Aplicamos a TODOS los at-heading de la página
  document.querySelectorAll('.at-heading').forEach(heading => {
    wrapWords(heading);         // envolvemos palabras
    observerTitle.observe(heading);  // y lo observamos
  });