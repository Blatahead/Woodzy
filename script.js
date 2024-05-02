var heightDivHistoryTitle = document.getElementById("history-title").offsetHeight;

var newHeightDivHistoryText = 100 - heightDivHistoryTitle + 'vh';

document.getElementById("history-text").style.height = newHeightDivHistoryText;

//bloquer la touche Entrer
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

// Gérer l'apparition de la team
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry)
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		} else {
			entry.target.classList.remove('show');
		}
	});
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

var burgerState = false
function BurgerTranslate() {
	if (burgerState == false) {
		document.getElementById("navbar-nav").style.right = "0%"
		burgerState = true
	} else {
		document.getElementById("navbar-nav").style.right = "-100%"
		burgerState = false
	}
}

function CloseNavBar() {
	document.getElementById("navbar-nav").style.right = "-100%"
	burgerState = false
}


// popup pour la vue 3D
document.addEventListener('DOMContentLoaded', function () {
	var imgProducts = document.querySelectorAll('.img_product');
	imgProducts.forEach(function (imgProduct) {
		imgProduct.addEventListener('click', function () {
			document.getElementById('popup').style.display = 'block';
		});
	});
});

function closePopup() {
	document.getElementById('popup').style.display = 'none';
}

// formulaire
document.addEventListener('DOMContentLoaded', function () {
	const preorderButton = document.getElementById("preorder-button");
	const preorderForm = document.getElementById('preorder-form');

	preorderButton.addEventListener('click', function () {
		preorderForm.style.display = 'block';

		setTimeout(() => {
			preorderForm.classList.add('visible');
		}, 10);
	});
});

function closeForm() {
	setTimeout(() => {
		const divToHide = document.getElementById('preorder-form');
		if (divToHide) {
			divToHide.classList.remove('show', 'visible');
		}
	}, 10);
	setTimeout(() => {
		const divToHide = document.getElementById('preorder-form');
		divToHide.style.display = 'none';
	}, 1000);
}


function startForm() {
	document.getElementById('welcomePage').classList.add('hidden');
	document.getElementById('formPage').classList.remove('hidden');
	document.getElementById('welcomePage').style.display = 'none';
	document.getElementById('firstName').focus();
}

function nextQuestion() {
	const currentQuestion = document.querySelector('.question.visible');
	const nextQuestion = currentQuestion.nextElementSibling;

	// Vérifier si la question actuelle est la dernière question
	const isLastQuestion = currentQuestion.id === 'lastQuestion';


	// Vérifier si tous le champ obligatoir est rempli
	const requiredInputs = currentQuestion.querySelectorAll('input[required], select[required]');
	let allFieldsFilled = true;
	requiredInputs.forEach(input => {
		if (!input.value.trim()) {
			allFieldsFilled = false;
			input.classList.add('error');
		} else {
			input.classList.remove('error');
		}
	});

	if (!allFieldsFilled) {
		// Afficher un message d'erreur
		return;
	}

	if (nextQuestion && !isLastQuestion) {
		currentQuestion.classList.remove('visible', 'slide-in');
		currentQuestion.classList.add('slide-out');
		setTimeout(() => {
			currentQuestion.classList.add('hidden');
			nextQuestion.classList.remove('hidden', 'slide-out');
			nextQuestion.classList.add('visible', 'slide-in');
			nextQuestion.querySelector('input, select').focus();
		}, 500);
	} else if (nextQuestion && isLastQuestion) {
		currentQuestion.classList.remove('visible', 'slide-in');
		currentQuestion.classList.add('slide-out');
		setTimeout(() => {
			currentQuestion.classList.add('hidden');
			nextQuestion.classList.remove('hidden', 'slide-out');
			nextQuestion.classList.add('visible', 'slide-in');
			nextQuestion.querySelector('input, select').focus();
			document.getElementById('continueButton').classList.add('hidden');
			document.getElementById('submitButton').classList.remove('hidden');
		}, 500);

	}
}

function previousQuestion() {
	const currentQuestion = document.querySelector('.question.visible');
	const previousQuestion = currentQuestion.previousElementSibling;

	// Vérifier si la question actuelle est la dernière question
	const isLastQuestion = currentQuestion.id === 'lastQuestion';

	// Vérifier si la question actuelle est la première question
	const isFirstQuestion = currentQuestion.id === 'firstQuestion';


	if (previousQuestion && !isFirstQuestion) {
		currentQuestion.classList.remove('visible', 'slide-in');
		currentQuestion.classList.add('slide-out');
		setTimeout(() => {
			currentQuestion.classList.add('hidden');
			previousQuestion.classList.remove('hidden', 'slide-out');
			previousQuestion.classList.add('visible', 'slide-in');
			previousQuestion.querySelector('input, select').focus();
			if (!isLastQuestion) {
				document.getElementById('submitButton').classList.add('hidden');
				document.getElementById('continueButton').classList.remove('hidden');
			}
		}, 500); // Attendre la fin de la transition
	}
}

// Récupérer l'élément SVG
var svgElement = document.getElementById("svg_1");

// Fonction pour gérer le défilement de la page
window.addEventListener("scroll", function() {
    // Calculer la distance parcourue vers le bas de la page
    var scrollDistance = window.scrollY;

    // Calculer l'opacité en fonction de la distance parcourue
    // Vous pouvez ajuster ces valeurs selon vos préférences
    var opacity = 1 - (scrollDistance / 150);

    // Limiter l'opacité entre 0 et 1
    opacity = Math.min(1, Math.max(0, opacity));

    // Appliquer l'opacité à l'élément SVG
    svgElement.style.opacity = opacity.toString();
});


