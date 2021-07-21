export let apiinfo = {
  firstPartCharacters: "https://gateway.marvel.com/v1/public/characters?ts=188&apikey=6b0f6c9638b7d3ff95aaabc5fd7de77f&hash=dd6fc5f4a4328c39f2efb4ad248e3bc8",
  firstPartComics: "https://gateway.marvel.com/v1/public/comics?ts=188&apikey=6b0f6c9638b7d3ff95aaabc5fd7de77f&hash=dd6fc5f4a4328c39f2efb4ad248e3bc8",
  createParams: function(params){
    let addition = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return "&" + addition;
  }
}