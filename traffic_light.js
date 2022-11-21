const circles = document.getElementsByClassName('circle');
const color = ['red', 'yellow', 'green'];
// const lightState = {
//   activeColor: '',
// };
let currentState;
// 1 solution
const redState = {
  activeColor: 'red',
  activeNode: circles[0],
  timeout: 4000,
};

const yellowState = {
  activeColor: 'yellow',
  activeNode: circles[1],
  timeout: 1000,
};

const greenState = {
  activeColor: 'green',
  activeNode: circles[2],
  timeout: 4000,
};

redState.next = yellowState;
yellowState.next = greenState;
greenState.next = redState;

function handleState(state) {
  currentState = state;
  [...circles].forEach(c => {
    c.classList.remove(...color);
  });
  state.activeNode.classList.add(state.activeColor);
  setTimeout(() => {
    handleState(state.next);
  }, state.timeout);
}
handleState(redState);

// 2 Solution
// function run() {
//   circles[2].classList.remove(color[2]);
//   circles[0].classList.add(color[0]);
//   lightState.activeColor = color[0];
//   lightState.TimeoutYellow = setTimeout(() => {
//     circles[0].classList.remove(color[0]);
//     circles[1].classList.add(color[1]);
//     lightState.activeColor = color[1];
//   }, 5000);
//   lightState.TimeoutGreen = setTimeout(() => {
//     circles[1].classList.remove(color[1]);
//     circles[2].classList.add(color[2]);
//     lightState.activeColor = color[2];
//   }, 10000);
//   lightState.TimeoutRed = setTimeout(run, 15000);
// }

// run();

// Go button
// 1 solution
// const button = document.getElementsByClassName('btn')[0];
// button.addEventListener('click', go);

// function go() {
//   const isRed = document.getElementsByClassName('red').length;
//   const isYellow = document.getElementsByClassName('yellow').length;
//   const isGreen = document.getElementsByClassName('green').length;
//   if (isRed || isYellow) {
//     console.log('dead');
//   } else if (isGreen) {
//     console.log('succes');
//   }
// }

// 2 solution
const container = document.querySelector('.container');
const message = document.createElement('p');

const buttonGo = document.getElementsByClassName('btn')[0];
buttonGo.addEventListener('click', goFast);

function goFast() {
  if (currentState.activeColor === 'green') {
    message.classList.add('message-green');
    message.innerText = 'You can go now!';
    currentState.next = currentState;
    container.append(message);
  } else if (currentState.activeColor === 'red') {
    message.classList.add('message-red');
    message.innerText = "STOP! You can't go on red light!";
    currentState.next = currentState;
    container.append(message);
  } else if (currentState.activeColor === 'yellow') {
    message.classList.add('message-yellow');
    message.innerText = 'Wait please a little bit!';
    currentState.next = currentState;
    container.append(message);
  }
}

// Stop button
const buttonStop = document.getElementsByClassName('btn')[1];
buttonStop.addEventListener('click', stop);

// function stop() {
//   clearTimeout(lightState.TimeoutGreen);
//   clearTimeout(lightState.TimeoutYellow);
//   clearTimeout(lightState.TimeoutRed);
// }

function stop() {
  currentState.next = currentState;
}

const buttonPlay = document.getElementsByClassName('btn')[2];
buttonPlay.addEventListener('click', play);

function play() {
  // if (currentState.activeColor === 'red') {
  //   currentState.next = yellowState;
  // }
  // if (currentState.activeColor === 'yellow') {
  //   currentState.next = greenState;
  // }
  // if (currentState.activeColor === 'green') {
  //   currentState.next = redState;
  // }
  redState.next = yellowState;
  yellowState.next = greenState;
  greenState.next = redState;
  message.innerText = '';
  if (currentState.activeColor === 'yellow') {
    message.classList.remove('message-yellow');
  }
  if (currentState.activeColor === 'red') {
    message.classList.remove('message-red');
  }
  if (currentState.activeColor === 'green') {
    message.classList.remove('message-green');
  }
}

const buttonInvert = document.getElementsByClassName('btn')[3];
buttonInvert.addEventListener('click', invert);

function invert() {
  redState.next = redState.next === yellowState ? greenState : yellowState;
  yellowState.next = yellowState.next === greenState ? redState : greenState;
  greenState.next = greenState.next === redState ? yellowState : redState;
}
