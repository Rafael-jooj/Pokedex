const namePokemon = document.querySelector('.pokemon_name');
const idPokemon = document.querySelector('.pokemon_id');
const gifPokemon = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let contador = 1;

const getPokemon = async (pokemon)=>{

    const Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(Response.status === 200){
        const data = await Response.json();
        return(data);
    }
}

const renderPokemon = async (pokemon)=>{

    namePokemon.innerHTML = 'Loading...';
    idPokemon.innerHTML = '0';

    const data = await getPokemon(pokemon);

    if(data){
        namePokemon.innerHTML = data.name;
        idPokemon.innerHTML = data.id;
        gifPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        contador = data.id;
    }else{
        namePokemon.innerHTML = 'Not Found';
        idPokemon.innerHTML = '000';
        gifPokemon.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVmMzIxYjQ5LTVmYTctNDA3Yi1hYWEwLWNjYTY5OTJkM2Q3Y1wvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.cBMxrJbp5Q5ghUGAev4ovPgb-Q2evrJs-XqbSrdUeB4";
        input.value = '';
    }

}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

prev.addEventListener('click', ()=>{
    if(contador > 1){
        contador -= 1;
        renderPokemon(contador);
    }
})

next.addEventListener('click', ()=>{
    contador += 1;
    renderPokemon(contador);
})

renderPokemon(contador);