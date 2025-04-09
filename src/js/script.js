
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
    const bonneReponse = 3; 
    if (numeroReponse === bonneReponse) {
        points += 1; 
    }
    localStorage.setItem('points', points);
    window.location.href = "resultats.html"; 
}

function afficherScoreFinal() {
    let points = parseInt(localStorage.getItem('points'));
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

/* ------------------------------ Brute Force ------------------------------- */
document.getElementById('bruteforce-button').addEventListener('click', function() {
    bruteForceQuiz();
});

function bruteForceQuiz() {
    const questions = [
        {
            url: 'quest_1.html',
            answers: [1, 2, 3, 4], // Les réponses possibles pour la question 1
            correctAnswer: 3, // La réponse correcte pour la question 1
        },
        {
            url: 'quest_2.html',
            answers: [1, 2, 3, 4], // Les réponses possibles pour la question 2
            correctAnswer: 2, // La réponse correcte pour la question 2
        },
        {
            url: 'quest_3.html',
            answers: [1, 2, 3, 4], // Les réponses possibles pour la question 3
            correctAnswer: 3, // La réponse correcte pour la question 3
        }
    ];

    let currentQuestionIndex = 0;

    function nextQuestion() {
        if (currentQuestionIndex < questions.length) {
            let question = questions[currentQuestionIndex];
            bruteForceQuestion(question);
        } else {
            alert('Brute force terminé. Votre score est ' + points);
            window.location.href = "resultats.html";
        }
    }

    function bruteForceQuestion(question) {
        for (let answer of question.answers) {
            fetch(`/submit-answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionUrl: question.url,
                    answer: answer,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.correct) {
                    points += 1;
                    localStorage.setItem('points', points);
                    currentQuestionIndex++; // Passer à la question suivante
                    nextQuestion(); // Passer à la question suivante
                } else {
                    currentQuestionIndex++; // Passer à la question suivante même si la réponse est incorrecte
                    nextQuestion();
                }
            })
            .catch(error => {
                console.error('Erreur lors de la tentative de brute force:', error);
                currentQuestionIndex++; // Passer à la question suivante en cas d'erreur
                nextQuestion();
            });
        }
    }

    nextQuestion();
}

