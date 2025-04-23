document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  });

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.sidebar a');


    window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });

    // Añadir o quitar clase "scrolled" al header para cambios de fondo y altura
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /*function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } */


  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    const icon = document.getElementById('theme-icon');
    icon.className = isDark ? 'hgi hgi-stroke hgi-moon-02' : 'hgi hgi-stroke hgi-sun-01';
  }

  // Cargar tema guardado
  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
    const icon = document.getElementById('theme-icon');
    icon.className = savedTheme === 'dark' ? 'hgi hgi-stroke hgi-moon-02' : 'hgi hgi-stroke hgi-sun-01';
  });

   // menu hamburguer
  function toggleMenu() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('open');
  }