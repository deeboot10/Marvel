const characterId =  window.location.search.substring(1).slice(3);
const characterDescription = document.querySelector(".character-description");
let char;

axios.get('https://gateway.marvel.com:443/v1/public/characters/'+ characterId+'?apikey=6b0f6c9638b7d3ff95aaabc5fd7de77f&ts=188&hash=dd6fc5f4a4328c39f2efb4ad248e3bc8')
.then(function (response) {
  char = response.data.data.results;
  loadChar(char);
  document.querySelector(".lds-dual-ring").classList.add("hidden");
})
.catch(function (error) {
  // handle error
  console.log(error);
});

function loadChar(char){
  char = char[0];
  let html = `
    <div class="character-description-text">
      <h1>Name: ${char.name}</h1>
      <p>Id: ${char.id}</p>
    </div>
    <div class="character-description-img">
      <img src="${char.thumbnail.path + "." + char.thumbnail.extension}">
    </div>`;
  characterDescription.innerHTML = html;
}
document.getElementById(".loader-continer").classList.add("hidden");