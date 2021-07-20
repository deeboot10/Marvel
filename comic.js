const comicId =  window.location.search.substring(1).slice(3);
const comicDescription = document.querySelector(".comic-description");
let com;


axios.get('https://gateway.marvel.com:443/v1/public/comics/'+ comicId+'?apikey=6b0f6c9638b7d3ff95aaabc5fd7de77f&ts=188&hash=dd6fc5f4a4328c39f2efb4ad248e3bc8')
.then(function (response) {
  com = response.data.data.results;
  loadChar(com);
  document.querySelector(".lds-dual-ring").classList.add("hidden");
})
.catch(function (error) {
  // handle error
  console.log(error);
});

function loadChar(com){
  com = com[0];
  let html = `
    <div class="comic-description-text">
      <h1>Name: ${com.title}</h1>
      <p>Id: ${com.id}</p>
    </div>
    <div class="comic-description-img">
      <img src="${com.thumbnail.path + "." + com.thumbnail.extension}">
    </div>`;
  comicDescription.innerHTML = html;
}