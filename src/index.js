import $ from 'jquery';
import { books } from './data/books';


const app = document.getElementById('app');
const header = document.createElement('header');
app.appendChild(header);

const h1 = document.createElement('h1');
h1.innerText = 'Bibliothèque en ligne';
header.appendChild(h1);
header.style.textAlign="center";
header.style.border="3px solid grey";
header.style.background="lightyellow";
header.style.margin="0px 250px 0px 250px";

const h2 = document.createElement('h2');
h2.innerText = 'Les books possibles a louer';
header.appendChild(h2);
h2.style.color="blue";

const navigation = document.createElement('h2');
const bd = books.filter((book) => book.categorie === 'bd');
const randomDB = bd[Math.floor(Math.random() * bd.length)];
navigation.innerHTML = randomDB;
header.appendChild(navigation);

/*
function bookRandom () {
	const bd = books.filter((book) => book.categorie === 'bd');
	const elH = document.createElement('h3');
	elH.innerText="Notre recommendation BD:"
	const titleBook = bd[Math.floor(Math.random() * bd.length)];
	elH.appendChild(titleBook);
	document.body.appendChild(elH);
}

bookRandom();
*/

const sectionMain = document.createElement('section');
const divBook = document.createElement('div');
sectionMain.appendChild(divBook);
app.appendChild(sectionMain);
sectionMain.style.margin="50px 250px 100px 250px";
sectionMain.style.padding="25px 25px 25px 25px";

let count = 0;
for (const book of books) {
	const divM = document.createElement('div');
	divM.classList.add('booksList');
	divBook.appendChild(divM);
    const figure = document.createElement('figure');
	figure.classList.add('bookImg');
	const img = document.createElement('img');
	img.src = book.image;
	figure.appendChild(img);
    divM.appendChild(figure);
	img.style.width="200px";
	img.style.border="3px solid black";
	divM.style.border="3px solid green";
	divM.style.background="lightyellow";
	divM.style.margin="25px";
	divM.style.textAlign="center";
	const divDes = document.createElement('div');
	divDes.classList.add('bookDes');

//************titre 

    const h4 = document.createElement('h4');
    h4.innerText = "Book Titre : " + book.titre;
	divDes.appendChild(h4);
	h4.style.fontSize="1.6rem";
	h4.style.border="1px solid black";
	h4.style.margin="0px 250px 0px 250px";
	h4.style.background ="green";
	h4.style.fontFamily ="Arial";
	h4.style.color ="white";
	
//************resume 

    const h5 = document.createElement('h5');
	h5.innerText = "Resume : " +book.resume;
	divDes.appendChild(h5);
	h5.style.fontSize="1.3rem";
	h5.style.fontFamily ="TimesNewRoman";

//************auteur 

	const h3 = document.createElement('h3');
	h3.innerText = "Auteur : " + book.auteur;
	divDes.appendChild(h3);
	h3.style.fontSize="1.6rem";
	h3.style.fontFamily ="TimesNewRoman";
	h3.style.color="green";

/// creation ajouter

	const btnR = document.createElement('button');
	btnR.innerHTML = 'RESERVER UN LIVRE MAINTENAT (MAX 3 LIVRES AU TOTAL)';
	btnR.setAttribute('type', 'submit');
	btnR.id = `buttonA${book.titre}`;
	btnR.style.broder="3px solid black";
	btnR.style.background="yellow";
	btnR.style.fontSize="1.2rem";
	btnR.style.color="red";
	btnR.style.padding="25px";
	btnR.addEventListener('click', function () {
	const parent = btnR.parentNode;
	const name = parent.getElementsByTagName('h4')[0].innerHTML;
	const list = document.getElementById('reservation_list');
	const newListItem = document.createElement('li');

	/// Annuler la commande

	const btnS = document.createElement('button');
	btnS.innerHTML = 'Annuler la commande';
	btnS.setAttribute('type', 'submit');
	btnS.id = `supprimer${name}`;
	btnS.style.broder="3px solid black";
	btnS.style.background="yellow";
	btnS.style.fontSize="1.2rem";
	btnS.style.color="red";
	newListItem.innerHTML = `${name}`;
	newListItem.appendChild(btnS);
		btnS.addEventListener('click', function (e) {
			e.preventDefault;	
			list.removeChild(newListItem);
			count -= $(newListItem).length;
		});
		list.appendChild(newListItem);
		count += $(newListItem).length;
		list.style.color="blue";
		list.style.fontFamily="Arial";
		list.style.fontSize="1.4rem";
		list.style.background="lightyellow";
		list.style.paddingRight="200px";
		});

	divDes.appendChild(btnR);
	divM.appendChild(divDes);
}

const footer = document.createElement('footer');
footer.style.margin="50px 250px 100px 250px";
footer.style.textAlign="center";
footer.style.border= "3px solid white";
footer.style.background= "lightyellow";

const reservation = document.createElement('p');
reservation.innerHTML = 'VOTRE LIVRES LESQUELS VOUS AVEZ COMMANDÉ AU TOTAL : ';
footer.appendChild(reservation);
reservation.style.color="red";
reservation.style.fontSize="1.5rem";
reservation.style.fontWeight="bold";

const reservation_list = document.createElement('ul');
reservation_list.id = 'reservation_list';
footer.appendChild(reservation_list);

const btnFinal = document.createElement('button');
btnFinal.id = 'btnFinal';
btnFinal.type = 'submit';
btnFinal.innerHTML = 'RESERVATION FINALE';
footer.appendChild(btnFinal);
btnFinal.style.color="blue";
btnFinal.style.backgroundcolor="grey";
btnFinal.style.border= "3px solid white";
btnFinal.style.fontSize="1.5rem";
app.appendChild(footer);

$(btnFinal).on('click',function(e){
	e.preventDefault();
	localStorage.setItem('nrLivres', count);
	$(app).empty();
	const nrLivres = localStorage.getItem('nrLivres');
	console.log(nrLivres);
	$(app).text(`Vous avez commande ${nrLivres} livres aut total.  `).css({ 'font-size' : '2rem', 'fontfamily': 'Arial', 'color' : 'green ', 'text-align' : "center" });
	localStorage.clear();
});
