
let peopleData = [
	{
		name: "Emil Lindgren",
		age: 30,
		birthdate: "1993-10-14"
	},
	{
		name: "Hanna lasorius",
		age: 22,
		birthdate: "2002-09-02"
	},
	{
		name: "Karl Hantsson",
		age: 45,
		birthdate: "1979-05-22"
	},
	{
		name: "Mören tasselbo",
		age: 52,
		birthdate: "1966-01-15"
	},
	{
		name: "Johanna blomberg",
		age: 33,
		birthdate: "1991-08-16"
	},
	{
		name: "Molly blomberg",
		age: 32,
		birthdate: "1992-08-17"
	}
];

const FunboxUtils = {

	populateData() {
		const filteredData = this.sortByUpcomingBirthdays();

		if (filteredData === null || filteredData === undefined) {
			console.error("filteredData is null or undefined");
			return;
		}
		const parentElement = document?.querySelector(".birthday-people");
		if (parentElement === null || parentElement === undefined) {
		console.error("parentElement is null or undefined");
			return;
		}
		for (let i = 0; i < filteredData.length; i++) {
			const birthdayClass = this.setBirthdayClass(filteredData[i].birthdate);
			const birthDate = new Date(filteredData[i].birthdate);

			if (birthDate === null || birthDate === undefined) {
				console.error(`filteredData[${i}].birthdate is not a valid date`);
				continue;
			}

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

	},
	sortByUpcomingBirthdays() {
        return peopleData.sort((a, b) => {
          const currentDate = moment().year();
          const today = moment().format("YYYY-MM-DD");
          const birthdayA = moment(`${currentDate}/${moment(a.birthdate).format("MM/DD")}`);
          const birthdayB = moment(`${currentDate}/${moment(b.birthdate).format("MM/DD")}`);
          if (birthdayA.format("YYYY-MM-DD") < today) {
            birthdayA.add(1, "y");
          }
          if (birthdayB.format("YYYY-MM-DD") < today) {
            birthdayB.add(1, "y");
          }
          const dateA = moment(birthdayA.format("YYYY-MM-DD"));
          const dateB = moment(birthdayB.format("YYYY-MM-DD"));
          return dateB - dateA;
        });
      },
	clearData(){
		const parentElement = document?.querySelector(".birthday-people");
		parentElement.innerHTML = "";
	},
	setBirthdayClass(data) {
		const today = moment().format("MM-DD");
		return today === moment(data).format("MM-DD") ? "birthday" : "";
	},
	disableMenuItem(menuItem) {
		const cooldownDuration = 5000;
		document.querySelector(`.${menuItem}`).classList.add("menu-disabled");
		setTimeout(() => {
			document?.querySelector(`.${menuItem}`).classList.remove("menu-disabled");
		}, cooldownDuration);
	},
}
if (typeof module !== "undefined") {
	module.exports = FunboxUtils;
}
