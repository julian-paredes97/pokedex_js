const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";



fetchpoke();

async function fetchpoke(){
    for (let i = 1; i <= 386; i++) {
        await fetch(URL + i)
            .then((response) => response.json())
            .then((data) => mostrarPokemon(data))
    } 
};


function mostrarPokemon(poke) {

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");   /*crea la card*/
    div.classList.add("pokemon");  /*pokemon-block*/

    div.innerHTML = `                                 
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    //listaPokemon.append(div);  //este era el unico que funcionaba melo - pokemon container

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");
    cardBack.textContent="STATS:";
  
    cardBack.appendChild(progressBars(poke.stats));

    //console.log("stats:",poke.stats);
  
    cardContainer.appendChild(div);   //card es mi div
    cardContainer.appendChild(cardBack);
    listaPokemon.appendChild(flipCard);


}


function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    for (let i = 0; i < 3; i++) {    /*numero de stats que se quieren mostrar, max=6*/
      const stat = stats[i];
  
      const statPercent = stat.base_stat / 2 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.textContent = stat.stat.name;
  
      const progress = document.createElement("div");
      progress.classList.add("w3-light-grey");
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("w3-container");

      if(i===0){
        progressBar.classList.add("w3-green");
      }

      if(i===1){
        progressBar.classList.add("w3-red");
      }

      if(i===2){
        progressBar.classList.add("w3-blue");
      }

      progressBar.classList.add("w3-center");
      /*progressBar.setAttribute("width", stat.base_stat); */
      /*progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 200);*/
      progressBar.style.width = statPercent;
  
      progressBar.textContent = stat.base_stat;
  
      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);
  
      statsContainer.appendChild(statContainer);
    }
  
    return statsContainer;
}






botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";


    async function tiposPokemon(){
        for (let i = 1; i <= 386; i++) {
            await fetch(URL + i)
                .then((response) => response.json())
                .then(data => {
    
                    if(botonId === "ver-todos") {
                        mostrarPokemon(data);
                    } else {
                        const tipos = data.types.map(type => type.type.name);
                        if (tipos.some(tipo => tipo.includes(botonId))) {
                            mostrarPokemon(data);
                        }
                    }
                })
        }
    };

    tiposPokemon();

    
}))