const setupGrid = () => {
    const grid = document.getElementById('grid');
    [...Array(16)].forEach((element, i) => {
        const cardSpot = document.createElement('div');
        cardSpot.id = `spot${i}`;
        cardSpot.className = 'cardSpot'
        grid.appendChild(cardSpot);

    });
}

const autorun = () => {
    setupGrid();
}

(function(){
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", autorun, false);
} else if (document.attachEvent) {
  document.attachEvent("onreadystatechange", autorun);
} else {
  window.onload = autorun;
}
})();