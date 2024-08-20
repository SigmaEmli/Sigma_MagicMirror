const errorMessage = "Something happened when fetching content."
const getCatUrl= "https://api.thecatapi.com/v1/images/search";
const getMemeUrl = "https://meme-api.com/gimme";
const Funboxfetcher = {

	fetchCats() {
		this.fetchHelper(getCatUrl, "cat");
	  },

	 fetchMemes() {
		this.fetchHelper(getMemeUrl, "meme");
	  },

	  fetchHelper(url, typeOfBox){
		const parentElement = document?.querySelector(`.${typeOfBox}-box`);
		fetch(url)
		  .then((response) => {
			if (!response.ok){
				this.onFetchError(`${typeOfBox}-box`)
				throw Error(response.statusText);
			}

			return response.json();
		  })
		  .then((data) => {
			  if(data.length === 0)
				this.onFetchError(`${typeOfBox}-box`);
			  parentElement.innerHTML = "";
			const imageHtml = typeOfBox === "cat" ? `<img class="${typeOfBox}-img" src="${data[0].url}" />` : `<img class="${typeOfBox}-img" src="${data.url}" />`
			parentElement.insertAdjacentHTML("beforeend", imageHtml);
		  });
	  },

	  onFetchError (contentBox){
		const parentElement = document?.querySelector(`.${contentBox}`);
		const noDataError = `<p class="fetch-error">${ errorMessage }</p>`;
		parentElement.insertAdjacentHTML("beforeend", noDataError);
	  }

}
module.exports = Funboxfetcher
