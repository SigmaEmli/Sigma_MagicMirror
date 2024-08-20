
const manyItems = document.querySelectorAll("menu li");
let previous = document.querySelector(".birthday-box");
let previousListItem = manyItems[0];
poppulateData();
manyItems.forEach((item) => {
  item.addEventListener("click", () => {
	const target = item.getAttribute("data-target");
	if (target === "cat-box") {
	  fetchCats();
	  disableMenuItem("cat-menu-item");
	}
	if (target === "meme-box") {
	  fetchMemes();
	  disableMenuItem("meme-menu-item");
	}

	const boxTarget = document.querySelector(`.${target}`);

	if (previous && previous !== boxTarget) previous.classList.remove("active");
	if (previousListItem && previousListItem !== target) previousListItem.classList.remove("active");

	item.classList.add("active");
	document?.querySelector(`.${target}`).classList.add("active");

	previous = boxTarget;
	previousListItem = item;
  });
});

function poppulateData() {
  const filteredData = filterData();
  const parentElement = document.querySelector(".birthday-people");

  for (let i = 0; i < filteredData.length; i++) {
	const birthdayClass = setBirthdayClass(filteredData[i].birthdate);
	const birthDate = new Date(filteredData[i].birthdate);
	const format = Intl.DateTimeFormat("sv-SE", {
	  day: "2-digit",
	  month: "2-digit"
	});
	const formatDate = format.format(birthDate);
	const peopleElement = `
	  <li class="birthday-person ${birthdayClass}">
	   <div class="person-info border">
		 <p>${filteredData[i].name}</p>
		<p>${formatDate}</p>
		</div>
	  </li>
	  `;
	parentElement.insertAdjacentHTML("afterbegin", peopleElement);
  }
}
function filterData() {
  const currentDate = moment().year();
  const today = moment().format("YYYY-MM-DD");
  const filteredData = data?.filter((item) => {
	const birthday = moment(`${currentDate}/${moment(item.birthdate).format("MM/DD")}`).format("YYYY-MM-DD");
	return birthday >= today;
  });
  return filteredData;
}
function setBirthdayClass(data) {
  const today = moment().format("MM-DD");
  return today === moment(data).format("MM-DD") ? "birthday" : "";
}

function fetchCats() {
  fetch("https://api.thecatapi.com/v1/images/search")
	.then((response) => response.json())
	.then((data) => {
	  document.querySelector(".cat-box").innerHTML = `<img class="cat-img" src="${data[0].url}" />`;
	});
}

function fetchMemes() {
  fetch("https://meme-api.com/gimme")
	.then((response) => response.json())
	.then((data) => {
	  document.querySelector(".meme-box").innerHTML = `<img class="meme-img" src="${data.url}" />`;
	});
}

function disableMenuItem(menuItem) {
  let lastClickTime = 0;
  const cooldownDuration = 5000;
  document.querySelector(`.${menuItem}`).classList.add("menu-disabled");
  setTimeout(() => {
	document.querySelector(`.${menuItem}`).classList.remove("menu-disabled");
  }, cooldownDuration);
}
