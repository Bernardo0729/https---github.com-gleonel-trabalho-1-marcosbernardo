// Defina a duração inicial em milissegundos (1 minuto)
let duration = 10 * 500; // 60 segundos * 1000 milissegundos/segundo

// Função para formatar o tempo em minutos e segundos
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}


let replacedImagesClicked = 0; 
let userLost = false;

// Função para atualizar o timer e exibir na página HTML
function updateTimer() {
  // Exiba o tempo restante em minutos e segundos
  document.getElementById('timer').textContent = `Tempo restante: ${formatTime(duration)}`;

  // Verifique se o timer chegou a 0 e, em seguida, reinicie-o
  /*if (duration <= 0) {
    // Reseta a duração para 1 minuto (60 segundos)
    duration = 60 * 1000;
    document.getElementById('timer').textContent = "Timer resetado para 1:00";
  }*/

  // Reduza a duração em 1 segundo
  if (duration <= 0) {
    substituiImagens();
    removeImagens();
    addImagesToGrid();
    enableClickableImages();
    clearInterval(interval);
    replacedImagesClicked = 0;
    userLost = true;

  } else {
    // Reduza a duração em 1 segundo
    duration -= 1000;
  }
}

// Inicialize o timer e atualize a cada segundo (1000 milissegundos)
const interval = [
  setInterval(updateTimer, 1000)
];



const imageUrls = [
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/094.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/037.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/036.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/034.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/033.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/032.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/031.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/029.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/028.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/024.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/012.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png"
];

// Função para adicionar imagens ao grid
function addImagesToGrid() {
  const gridContainer = document.getElementById("imageGrid");

  // Itera sobre a lista de URLs e cria elementos de imagem
  imageUrls.forEach((url) => {
    const imgElement = document.createElement("img");
    imgElement.src = url;

    // Adiciona a imagem ao contêiner do grid
    gridContainer.appendChild(imgElement);
  });
}

function removeImagens() {
  const gridContainer = document.getElementById("imageGrid");
  gridContainer.innerHTML = '';
}

function substituiImagens() {
  imageUrls.splice(6, 3, "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/020.png", "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/018.png", "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png");

}

function enableClickableImages() {
  const gridContainer = document.getElementById("imageGrid");

  gridContainer.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG') {
      const imageUrl = clickedElement.src;

      if (imageUrls.includes(imageUrl)) {
        clickedElement.remove();

        // Verifique se a imagem clicada pertence às imagens substituídas
        if (substitutedImageUrls.includes(imageUrl)) {
          replacedImagesClicked++;

          // Verifique se todas as imagens substituídas foram clicadas
          checkAllReplacedImagesClicked();
        }
      } else {
        // Se a imagem clicada não estiver entre as substituídas, o usuário perdeu
        userLost = true;
        document.body.innerHTML = '';
        const loseMessage = document.createElement('h1');
        loseMessage.textContent = "Desculpe, você perdeu!";
        document.body.appendChild(loseMessage);
      }
    }
  });
}

function checkAllReplacedImagesClicked() {
  const totalReplacedImages = substitutedImageUrls.length;

  // Se todas as imagens substituídas foram clicadas, exiba a mensagem de vitória
  if (replacedImagesClicked === totalReplacedImages) {
    document.body.innerHTML = '';
    const winMessage = document.createElement('h1');
    winMessage.textContent = "Parabéns, você ganhou!";
    document.body.appendChild(winMessage);
  }
}


// Chama a função para adicionar imagens ao carregar a página
  addImagesToGrid();