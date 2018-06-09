document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('#btnSave').addEventListener('click', function(e) {
		e.preventDefault();

		// var name = document.querySelector('input[name=name]').value;
		var surname = document.querySelector('input[name=surname]').value;

		// localStorage.setItem('name', name);
		localStorage.setItem('surname', surname);
	});

	document.querySelector('#btnRead').addEventListener('click', function(e) {
		e.preventDefault();
		var name = '';
		var surname = '';
		if (localStorage.getItem('name') != null) {
			name = localStorage.getItem('name');
		}
		if (localStorage.getItem('surname') != null) {
			name = localStorage.getItem('surname');
		}
		if (localStorage.getItem('name') != null || localStorage.getItem('surname') != null) {
			alert(name + ' ' + surname);
		} else {
			alert('Nie zapisałeś danych w localStorage')
		}
	});

	document.querySelector('#btnDelete').addEventListener('click', function(e) {
		localStorage.removeItem('name');
		localStorage.removeItem('surname');
	});
});




let start = () => {
	document.getElementById("start").style.visibility = "visible";
	document.getElementById("end").style.visibility = "hidden";
}
let game = () => {
	document.getElementById("game").style.visibility = "visible";
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("end").style.visibility = "hidden";
}
let end = () => {
	document.getElementById("game").style.visibility = "hidden";
	document.getElementById("end").style.visibility = "visible";
	
}

const dogs = ['chase', 'chase', 'everest', 'everest', 'marshall', 'marshall', 'rocky', 'rocky', 'rubble', 'rubble', 'ryder', 'ryder', 'skye', 'skye', 'tracker', 'tracker', 'zuma', 'zuma'];

let cards = document.querySelectorAll('#game>div');
cards = [...cards];
const startTime = new Date().getTime();

let activeCard = '';
const activeCards = [];
const gamePairs = cards.length/2;
let gameResult = 0;

const clickCard = function() {
  activeCard = this;
  
  if(activeCard == activeCards[0]) return;
  activeCard.classList.remove('logo');
  
  if(activeCards.length === 0){
	  activeCards[0] = activeCard;
	  return
  } else {
	  cards.forEach(card => {
		  card.removeEventListener('click', clickCard)})
	activeCards[1] = activeCard;
	setTimeout(function (){
		if (activeCards[0].className === activeCards[1].className) {
			activeCards.forEach(card => card.classList.add('off'));
			gameResult++;
			cards = cards.filter(card => !card.classList.contains('off'));
			if(gameResult == gamePairs){
				const endTime = new Date().getTime();
				const gameTime = (endTime - startTime)/1000;
				localStorage.setItem("gametime", gameTime);
				end();
				document.getElementById("result").innerHTML = localStorage.getItem("gametime");
				document.getElementById("user").innerHTML = localStorage.getItem("surname");
			}
		} else {activeCards.forEach( card => card.classList.add('logo'))
		}
		activeCard = '';
		activeCards.length = 0;
		cards.forEach( card => card.addEventListener('click', clickCard));
	}, 1000);
  }
};

const init = function() {
	cards.forEach( card => {
		const position = Math.floor(Math.random()*dogs.length);
		card.classList.add(dogs[position]);
		dogs.splice(position,1);
 });
	setTimeout( function() {
		cards.forEach( card => {
			card.classList.add('logo');
			card.addEventListener('click', clickCard);
   })
 }, 1000)
}

init();

