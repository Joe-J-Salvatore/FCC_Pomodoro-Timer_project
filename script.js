let countdown;
const displayTimer = document.querySelector('.display_time');
const buttons = document.querySelectorAll('[data-time]');

// set interval function
function timer(seconds) {
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
	console.log(mins);
	timer(mins * 60);
	this.reset();
});

// if todo is checked: strike through task; else unstrike
function isChecked() {
	const ckBx = document.querySelector('#checkmark');
	const item = document.getElementsByTagName('li');
	for (let i = 0; i < item.length; i++) {
		//console.log(item[i]);
		if (ckBx.checked) {
			item[i].style.textDecoration = 'line-through';
		} else {
			item[i].style.textDecoration = 'none';
		}
	}
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
	todoList.appendChild(li).insertAdjacentHTML('afterbegin', '<input type="checkbox" id="checkmark" onclick="isChecked()"><span class="checkmark"></span>&nbsp;');
	
	this.reset();
});
