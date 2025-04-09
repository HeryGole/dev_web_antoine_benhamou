
// --------------------------------- entête -----------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            navLinks.forEach(link => link.classList.remove("active"));
            event.currentTarget.classList.add("active");
        });
    });
});

// ------------------------------ calculatrice ---------------------------------
const buttons = document.querySelectorAll("button")
const result = document.getElementById('resultat')
const display = document.getElementById('display');

function buttonClicked(e) {
    let buttonId = e.target.id
    const valeur1 = document.getElementById('valeur1').value
    const valeur2 = document.getElementById('valeur2').value
    if (buttonId == "+") {
        result.innerHTML = parseInt(valeur1) + parseInt(valeur2)
    }
    if (buttonId == "-") {
        result.innerHTML = parseInt(valeur1) - parseInt(valeur2)
    }
    if (buttonId == "*") {
        result.innerHTML = parseInt(valeur1) * parseInt(valeur2)
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", buttonClicked)
})

function clearDisplay() {
    display.value = '';
}

function appendToDisplay(value) {
    display.value += value;
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        alert('Entrée invalide');
        clearDisplay();
    }
}

// ----------------------------- questionnaire --------------------------------
let points = parseInt(localStorage.getItem('points')) || 0;



function verifierReponseEtRediriger1(numeroReponse) {
    const bonneReponse = 3; 
    if (numeroReponse === bonneReponse) {
        points += 1; 
    }
    localStorage.setItem('points', points);
    window.location.href = "quest_2.html"; 
}

function verifierReponseEtRediriger2(numeroReponse) {
    const bonneReponse = 2;

    if (numeroReponse === bonneReponse) {
        points += 1;
    }
    localStorage.setItem('points', points);
    window.location.href = "quest_3.html"; 
}

function verifierReponseEtRediriger3(numeroReponse) {
    const bonneReponse = 2; 
    if (numeroReponse === bonneReponse) {
        points += 1; 
    }
    localStorage.setItem('points', points);
    window.location.href = "resultats.html"; 
}

function afficherScoreFinal() {
    let points = parseInt(localStorage.getItem('points')) || 0;
    const scoreElement = document.getElementById('score-final');
    if (scoreElement) {
        scoreElement.textContent = "Votre score est : " + points;
    } else {
        console.error("L'élément avec l'ID 'score-final' est introuvable.");
    }
}


 function recommencer() {
    localStorage.setItem('points', 0);
    window.location.href = "quest_1.html";
 }
 
  
/* ------------------------------ Slideshow Koala ------------------------------- */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
} 