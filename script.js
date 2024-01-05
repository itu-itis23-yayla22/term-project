document.addEventListener("DOMContentLoaded", function() {
  const cards = [
    { letter: 'p', image: 'images/çizim.svg' },
    { letter: 'i', image: 'images/ı.svg' },
    { letter: 'n', image: 'images/n.svg' },
    { letter: 'a', image: 'images/a.svg' },
    { letter: 'r', image: 'images/r.svg' }
  ];

  let score = 0;
  let shuffledCards = [];
  const gameContainer = document.getElementById('cards');
  const scoreElement = document.getElementById('scoreValue');
  const startGameBtn = document.getElementById('startGame');

  startGameBtn.addEventListener('click', function() {
    renderInitialCards();
    resetGame();
    startGameBtn.style.display = 'none';
    scoreElement.textContent = '0';
    setTimeout(() => {
      shuffledCards = shuffleArray([...cards]);
      renderCards();
      setTimeout(hideCards, 2000);
    }, 2000);
  });

  renderInitialCards();
  startGameBtn.style.display = 'block'; // Sayfa yüklendiğinde Start butonunu göster

  function renderInitialCards() {
    gameContainer.innerHTML = '';
    cards.forEach((card) => {
      const cardElement = createCardElement(card);
      gameContainer.appendChild(cardElement);
    });
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function renderCards() {
    gameContainer.innerHTML = '';
    shuffledCards.forEach((card) => {
      const cardElement = createCardElement(card);
      cardElement.onclick = checkOrder.bind(cardElement)
      gameContainer.appendChild(cardElement);
    });
  }

  function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.letter = card.letter;
    const imgElement = document.createElement('img');
    imgElement.src = card.image;
    imgElement.alt = card.letter;
    cardElement.appendChild(imgElement);
    return cardElement;
  }

  function hideCards() {
    gameContainer.childNodes.forEach((cardElement) => {
      const imgElement = cardElement.firstChild;
      imgElement.alt = '';
      imgElement.src = 'images/blank.svg'
    });
  }

  function checkOrder() {
    debugger;
    if (this.dataset.letter === cards[score].letter) {
      this.firstChild.alt = this.dataset.letter;
      this.firstChild.src = cards[score].image;
      score++;
      scoreElement.textContent = score * 20;
      if (score === cards.length) {
        setTimeout(() => alert('Game finished successfully!'), 1500)
        resetGame();
      }
    } else {
      alert('Wrong arrangement. Try again!');
      resetGame();
    }
  }

  function resetGame() {
    score = 0;
    startGameBtn.style.display = 'block'; // Oyuncu hata yaptığında veya oyun bittiğinde Start butonunu göster
  }
});