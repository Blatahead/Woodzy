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
const statsRef = ref(db, 'stats/numberOrders');
const ordernumberPromise = get(statsRef).then((snapshot) => {
	const numberOrders = snapshot.val() || 0;
	return numberOrders + 1;
});

ordernumberPromise.then(ordernumber => {
	console.log(ordernumber); // Vous pouvez également utiliser ordernumber ici
	document.getElementById("submitButton").addEventListener('click', function () {
		event.preventDefault();

		const date = new Date();
		const currentDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
		const defaultPaidOrder = false;

		set(ref(db, 'users/' + document.getElementById('firstName').value + " " + document.getElementById('lastName').value + " " + document.getElementById('postalCode').value),
			{
				prenom: document.getElementById('firstName').value,
				nom: document.getElementById('lastName').value,
				email: document.getElementById('email').value,
				quantity: document.getElementById('quantity').value,
				postalCode: document.getElementById('postalCode').value,
				dateEnvoi: currentDate,
				orderNumber: ordernumber,
				paidOrder: defaultPaidOrder
			}).then(() => {
				console.log("Données envoyées avec succès !");
				document.getElementById('confirmationPage').classList.remove('hidden');
				document.getElementById('formPage').style.display = 'none';

				updateOrderCount(ordernumber);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('preorder-form');
					if (divToHide) {
						divToHide.classList.remove('show', 'visible');
					}
				}, 1500);
			}).then(() => {
				setTimeout(() => {
					const divToHide = document.getElementById('preorder-form');
					divToHide.style.display = 'none';
				}, 3000);
			}).catch(error => console.error("Erreur lors de l'envoi des données:", error));
	});
});

function updateOrderCount(count) {
	runTransaction(statsRef, (currentData) => {
		return count;
	}).then(() => {
		console.log("Compteur de commande mis à jour avec succès !");
	}).catch(error => console.error("Erreur lors de la mise à jour du compteur de commande:", error));
}