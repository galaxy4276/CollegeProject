const clock = document.getElementById("clock");

function drawClock() {
  const getDate = new Date();

  let hours = getDate.getHours();
  let minutes = getDate.getMinutes();
  let seconds = getDate.getSeconds();

  let divHours, divMins, divSecs;

  if (hours < 10 ) divHours = `0${hours}`; else divHours = hours;
  if ( minutes < 10 ) divMins = `0${minutes}`; else divMins = minutes;
  if ( seconds < 10 ) divSecs = `0${seconds}`; else divSecs = seconds;

  clock.innerHTML = `${divHours}:${divMins}:${divSecs}`;
}

function clock_init () {
  setInterval(drawClock, 1000);
}

clock_init(); 