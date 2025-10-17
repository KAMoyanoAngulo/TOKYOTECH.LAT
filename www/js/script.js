// Fecha objetivo (ejemplo: 24 horas desde ahora)
let countdownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

let x = setInterval(function() {
  let now = new Date().getTime();
  let distance = countdownDate - now;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = `
    <div><span>${days}</span><br>Días</div>
    <div><span>${hours}</span><br>Horas</div>
    <div><span>${minutes}</span><br>Mins</div>
    <div><span>${seconds}</span><br>Segs</div>
  `;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "¡EXPIRED!";
  }
}, 1000);
