// import dotenv from 'dotenv';
// dotenv.config();
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, child, get, runTransaction } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
	apiKey: "pAIzaSyBgz2RuCQpAULr4bDStm1tHvuYcyS8uaBQ",
	authDomain: "leonoel-4a359.firebaseapp.com",
	databaseURL: "https://leonoel-4a359-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "leonoel-4a359",
	storageBucket: "leonoel-4a359.appspot.com",
	messagingSenderId: "277507846500",
	appId: "1:277507846500:web:667ba362688e7702394a71",
	measurementId: "G-SJ6G804774"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


/// Manage the number of general feedbacks ///
const numberFeedbackRef = ref(db, 'stats/numberFeedbacks');
const feedbacknumberPromise = get(numberFeedbackRef).then((snapshot) => {
	const numberFeedbacks = snapshot.val() || 0;
	return numberFeedbacks + 1;
});

feedbacknumberPromise.then(feedbacknumber => {
	document.getElementById("submitButtonFeedback").addEventListener('click', function () {
		event.preventDefault();

		const date = new Date();
		const currentDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

		set(ref(db, 'feedbacks/' + document.getElementById('firstName').value+" "+document.getElementById('lastName').value),
			{
				firstname: document.getElementById('firstName').value,
				lastname: document.getElementById('lastName').value,
				feedback: document.getElementById('feedText').value,
				feedbackNumber: feedbacknumber,
			}).then(() => {
				console.log("Données envoyées avec succès !");
				document.getElementById('confirmationPageFeedback').classList.remove('hidden');
				document.getElementById('formPageFeedback').style.display = 'none';

				updateFeedbackCount(feedbacknumber);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('feedback-form');
					if (divToHide) {
						divToHide.classList.remove('show', 'visible');
					}
				}, 1500);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('feedback-form');
					divToHide.style.display = 'none';
				}, 3000);
			}).catch(error => console.error("Erreur lors de l'envoi des données:", error));
	});
});

function updateFeedbackCount(count) {
	runTransaction(numberFeedbackRef, (currentData) => {
		return count;
	}).then(() => {
		console.log("Compteur de feedbacks mis à jour avec succès !");
	}).catch(error => console.error("Erreur lors de la mise à jour du compteur de feedback:", error));
}

/// Manage the number of christmas feedbacks ///
const numberFeedbackChristmasTreeRef = ref(db, 'stats/numberFeedbacks/numberChristmasFeedbacks/numberChristmasTreeFeedbacks');
const feedbackchristmastreenumberPromise = get(numberFeedbackChristmasTreeRef).then((snapshot) => {
	const numberChristmasTreeFeedbacks = snapshot.val() || 0;
	return numberChristmasTreeFeedbacks + 1;
});

feedbackchristmastreenumberPromise.then(feedbackchristmastreenumber => {
	document.getElementById("submitButtonChristmasTree").addEventListener('click', function () {
		event.preventDefault();

		const date = new Date();
		const currentDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
		

		set(ref(db, 'feedbacks/christmas/tree/' + document.getElementById('firstNameChristmasTree').value+" "+document.getElementById('lastNameChristmasTree').value),
			{
				firstname: document.getElementById('firstNameChristmasTree').value,
				lastname: document.getElementById('lastNameChristmasTree').value,
				feedback: document.getElementById('feedTextChristmasTree').value,
				dateEnvoi: currentDate,
				feedbackchristmastreeNumber: feedbackchristmastreenumber,
			}).then(() => {
				
			}).then(() => {
				console.log("Données envoyées avec succès !");
				document.getElementById('confirmationPageFeedbackChristmasTree').classList.remove('hidden');
				document.getElementById('formPageChristmasTreeFeedback').style.display = 'none';

				updateFeedbackChristmasTreeCount(feedbackchristmastreenumber);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('feedback-christmas-tree-form');
					if (divToHide) {
						divToHide.classList.remove('show', 'visible');
					}
				}, 1500);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('feedback-christmas-tree-form');
					divToHide.style.display = 'none';
				}, 3000);
			}).catch(error => console.error("Erreur lors de l'envoi des données:", error));
	});
});

function updateFeedbackChristmasTreeCount(count) {
	runTransaction(numberFeedbackChristmasTreeRef, (currentData) => {
		return count;
	}).then(() => {
		console.log("Compteur de feedbacks CT mis à jour avec succès !");
	}).catch(error => console.error("Erreur lors de la mise à jour du compteur de feedback de sapin noel:", error));
}

//Carousel ChristmasTree
// Référence à la base de données Firebase pour les avis de Noël
const feedbacksChristmasTreeRef = ref(db, 'feedbacks/christmas/tree');

// Récupération des avis de Noël depuis Firebase
get(feedbacksChristmasTreeRef).then((snapshot) => {
  if (snapshot.exists()) {
    const feedbacks = [];
    snapshot.forEach((childSnapshot) => {
      const feedback = childSnapshot.val();
      feedbacks.push(feedback);
    });

    // Une fois que les avis sont récupérés, tu peux les ajouter au carrousel
    addFeedbacksToCarousel(feedbacks);
  } else {
    console.log("Aucun avis de Noël trouvé.");
  }
}).catch((error) => {
  console.error("Erreur lors de la récupération des avis de Noël:", error);
});

// Fonction pour ajouter les avis au carrousel
function addFeedbacksToCarousel(feedbacks) {
  const feedbacksContainer = document.getElementById("products").querySelector('.christmasFeedback-carousel');

  // Loop through each feedback and create a slide for it
  feedbacks.forEach(feedback => {
    const slide = document.createElement('div');
    slide.classList.add('slide');

    const feedbackHTML = `
      <div style="width: 100%; text-align: center;">
        <p>${feedback.firstname} ${feedback.lastname}</p>
        <p>${feedback.feedback}</p>
      </div>
    `;

    slide.innerHTML = feedbackHTML;
    feedbacksContainer.appendChild(slide);
  });

  // Initialisation
  $(document).ready(function(){
	  $('.christmasFeedback-carousel').slick({
		slidesToShow: Math.min(feedbacks.length, 1), // Affiche max 5 slides
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		infinite: true,
		dots: true,
		responsive: [
		  {
			breakpoint: 768,
			settings: {
			  slidesToShow: 1
			}
		  }
		]
	  });
  })
}
