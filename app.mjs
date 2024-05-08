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
	console.log(feedbacknumber); 
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
const numberFeedbackChristmasRef = ref(db, 'stats/numberFeedbacks/numberChristmasFeedbacks/');
const feedbackchristmasnumberPromise = get(numberFeedbackChristmasRef).then((snapshot) => {
	const numberChristmasFeedbacks = snapshot.val() || 0;
	return numberChristmasFeedbacks + 1;
});

feedbackchristmasnumberPromise.then(feedbackchristmasnumber => {
	console.log(feedbackchristmasnumber); 
	document.getElementById("submitButtonChristmas").addEventListener('click', function () {
		event.preventDefault();

		const date = new Date();
		const currentDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
		

		set(ref(db, 'feedbacks/christmas/' + document.getElementById('firstNameChristmas').value+" "+document.getElementById('lastNameChristmas').value),
			{
				firstname: document.getElementById('firstNameChristmas').value,
				lastname: document.getElementById('lastNameChristmas').value,
				feedback: document.getElementById('feedTextChristmas').value,
				dateEnvoi: currentDate,
				feedbackchristmasNumber: feedbackchristmasnumber,
			}).then(() => {
				
			}).then(() => {
				console.log("Données envoyées avec succès !");
				document.getElementById('confirmationPageFeedbackChristmas').classList.remove('hidden');
				document.getElementById('formPageChristmasFeedback').style.display = 'none';

				updateFeedbackChristmasCount(feedbackchristmasnumber);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('feedback-christmas-form');
					if (divToHide) {
						divToHide.classList.remove('show', 'visible');
					}
				}, 1500);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('feedback-christmas-form');
					divToHide.style.display = 'none';
				}, 3000);
			}).catch(error => console.error("Erreur lors de l'envoi des données:", error));
	});
});

function updateFeedbackChristmasCount(count) {
	runTransaction(numberFeedbackChristmasRef, (currentData) => {
		return count;
	}).then(() => {
		console.log("Compteur de feedbacks mis à jour avec succès !");
	}).catch(error => console.error("Erreur lors de la mise à jour du compteur de feedback de noel:", error));
}