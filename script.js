let countdown;
const displayTimer = document.querySelector('.display_time');
const buttons = document.querySelectorAll('[data-time]');

// set interval function
function timer(seconds) {
	let isPaused = false;
	let offset = 0;
	// clear existing timers
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeRemaining(seconds);
  
	countdown = setInterval(() => {
		const secondsRemain = Math.round((then - Date.now()) / 1000);
		if (secondsRemain < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeRemaining(secondsRemain);
	}, 1000);
	// pause button
	let pauseTimer = document.getElementById('pause-text');
	pauseTimer.addEventListener('click', function(e) {
		e.preventDefault();
		isPaused = !isPaused;
		let paused = displayTimer.textContent;
		const regex = /[0-9]{2}/g;
		let hours;
		let minutes;
		let seconds;
		let secResume = 0;

		let array = paused.match(regex, '$1, $2, $3');
		hours = parseInt(array[0]) * 3600;
		minutes = parseInt(array[1]) * 60;
		seconds = parseInt(array[2]);
		secResume = hours + minutes + seconds;

		//console.log(hours, minutes, seconds);
		//console.log(secResume);
		
		if (isPaused) {
			clearInterval(countdown);
		} else {
			timer(secResume);
		}
	});
}

// display timer function
function displayTimeRemaining(seconds) {
	let display;
	let hours;
	let minutes = Math.floor(seconds / 60);
	let secondsRemaining = seconds % 60;
	if (minutes > 59 || minutes < 10) {
		hours = Math.floor(minutes / 60);
		hours = (hours >= 10) ? hours : '0' + hours;
		minutes = minutes - (hours * 60);
		minutes = (minutes >= 10) ? minutes : '0' + minutes;

	}
	
	secondsRemaining = Math.floor(secondsRemaining);
	secondsRemaining = (secondsRemaining >= 10) ? secondsRemaining : '0' + secondsRemaining;
	
	if (hours !== undefined) {
		display = `${hours}:${minutes}:${secondsRemaining}`;
	} else {
		display = `00:${minutes}:${secondsRemaining}`;
	}
	
	// display timer on tab
	document.title = display;
	// display on index.html
	displayTimer.textContent = display;
}

// Get time from 'quick buttons'
function startTimer() {
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// Add custom time (from input to display) and start timer
document.custom_time.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});

// if todo is checked: strike through task; else unstrike
function isChecked() {
	const checkBox = document.querySelectorAll('input[type="checkbox"]');
	const item = document.querySelectorAll('li');
	let count = 0;
	for (let i = 0; i < item.length; i++) {
		if (checkBox[i].checked) {
			item[i].style.textDecoration = 'line-through';
			count += 1;
		} else {
			item[i].style.textDecoration = 'none';
		}
	}
	if (count === 4) {
		let ul = document.querySelector('ul');
		ul.innerHTML = 'Nice work!'+'\n'+'Enjoy your extended break.';
	}
	console.log(count);
}

// Add todo items (from input to list) with checkbox
document.todo_entry.addEventListener('submit', function(e) {
	e.preventDefault();
	const todo = this.todo.value;
	// console.log(todo);
	const todoList = document.getElementById('todo_list');
	todoList.style.listStyle = 'none';
	let li = document.createElement('li');
	li.appendChild(document.createTextNode(todo));
	todoList.appendChild(li).insertAdjacentHTML('afterbegin', '<input type="checkbox" onclick="isChecked()">&nbsp;');
	
	this.reset();
});
