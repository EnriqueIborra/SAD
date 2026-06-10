document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });

      const sidebar = document.querySelector('.sidebar');
      const hamburger = document.querySelector('.hamburger');
      // Solo cerramos el menú en dispositivos móviles
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');  // Cerrar la barra lateral
        hamburger.classList.remove('open'); // Cambiar el ícono de hamburguesa
        document.getElementById('menu-icon').textContent = '☰'; // Restablecer el ícono
      }      
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
/*   function toggleMenu() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('open');
  }  */

  function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const icon = document.getElementById('menu-icon');
    const isOpen = sidebar.classList.toggle('open');
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('open'); // Añadir clase 'open' al botón para que gire
    icon.textContent = isOpen ? '✖' : '☰';

    }

let bancDePreguntes = [];
let preguntesBarrejades = [];
let indexPreguntaActual = 0;
let puntuacio = 0;

function barrejar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function actualitzarProgres() {
    const percentatge =
        (indexPreguntaActual / preguntesBarrejades.length) * 100;
    document.getElementById('progress-bar').style.width =
        percentatge + "%";
}

function actualitzarPercentatge() {
    const percentatge = Math.round(
        (puntuacio / preguntesBarrejades.length) * 100
    );
    document.getElementById('percentatge-text').innerText =""
       // `Encerts: 🎯 ${percentatge}%`;
}


function carregarPreguntes(RA) {
    fetch('preguntes/preguntesSAD_' + RA + '.json')
        .then(res => res.json())
        .then(data => {
            bancDePreguntes = data;
            preguntesBarrejades = [...bancDePreguntes];
            barrejar(preguntesBarrejades);
            puntuacio = 0;
            indexPreguntaActual = 0;
            mostrarPregunta();
        })
        .catch(err => {
            console.error(err);
            document.getElementById('pregunta-text').innerText =
                "Error carregant les preguntes 😢";
        });
        //document.getElementById('percentatge-text').innerText = "0%";

}

function mostrarPregunta() {

    // Si ja no queden preguntes
    if (indexPreguntaActual >= preguntesBarrejades.length) {
        document.getElementById('pregunta-text').innerText =
            "🎉 Has acabat totes les preguntes!";
        document.getElementById('options-container').innerHTML = "";
        document.getElementById('feedback').innerHTML =
        `Has encertat <strong>${puntuacio}</strong> de 
        <strong>${preguntesBarrejades.length}</strong> preguntes.`;
        document.getElementById('btn-seguent').disabled = true;
        document.getElementById('progress-bar').style.width = "100%";
        actualitzarProgres();
        return;
    }

    const pregunta = preguntesBarrejades[indexPreguntaActual];

    document.getElementById('pregunta-text').innerText = pregunta.titol;

    const container = document.getElementById('options-container');
    container.innerHTML = "";

    pregunta.opcions.forEach(opcio => {
        const btn = document.createElement('button');
        btn.innerText = opcio.text;
        btn.onclick = () => comprovaResposta(opcio.correcte, btn, opcio.feedback);
        container.appendChild(btn);
    });

    document.getElementById('feedback').textContent = "";
    document.getElementById('pista').textContent = "";
    document.getElementById('btn-seguent').disabled = true;
    actualitzarProgres();

}

function mostrarPista(){
      document.getElementById('pista').textContent = preguntesBarrejades[indexPreguntaActual].pista;
    }



function comprovaResposta(esCorrecte, element,feedback1) {
    const feedback = document.getElementById('feedback');

    document
        .querySelectorAll('#options-container button')
        .forEach(btn => btn.disabled = true);

    if (esCorrecte) {
        feedback.textContent = "✅ Correcte! Molt bé." + feedback1;
        element.style.background = "#d4edda";
        puntuacio++;
    } else {
        feedback.textContent = "❌ Incorrecte." + feedback1;
        element.style.background = "#f8d7da";
    }
    //actualitzarPercentatge();
    document.getElementById('btn-seguent').disabled = false;
}

function seguentPregunta() {
    indexPreguntaActual++;
    mostrarPregunta();
}


// Executar en carregar la pàgina
//window.onload = carregarPreguntes;
// Es crida des de cada html de cada RA / UD



