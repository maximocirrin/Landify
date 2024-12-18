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
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav ul li a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});


// btn effect
document.querySelectorAll('.btn-pricing').forEach(function(button) {
    button.addEventListener('click', function() {
        this.classList.add('btn-pricing-active');

        setTimeout(() => {
            this.classList.remove('btn-pricing-active');
        }, 1000);
    });
});


