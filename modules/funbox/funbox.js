/* global FunboxUtils
	global Funboxfetcher */
Module.register("funbox", {
	defaults:{
		interval: 60 * 24 * 1000
	},
	getTemplateData() {
		return this.config;
	},
	getScripts(){
		return ["funboxutils.js", "funboxfetcher.js", "moment.js"];
	},
	getStyles() {
		return ["funbox.css"];
	},
	getTemplate() {
		return "funbox.njk";
	},
	start(){
		Log.info(`Starting module: ${this.name}`);
		this.updateModule()

	},
	notificationReceived (notification) {
		if (notification === "MODULE_DOM_CREATED") {
			this.initiateCustomScript();
		}
	},

	initiateCustomScript() {
		const menuItems = document?.querySelectorAll("menu li");
		let previous = document?.querySelector(".birthday-box");
		let previousListItem = menuItems[0];
		FunboxUtils.populateData();
		menuItems.forEach((item) => {
			item.addEventListener("click", () => {
				const target = item.getAttribute("data-target");
				if (target === "cat-box") {
					Funboxfetcher.fetchCats();
					FunboxUtils.disableMenuItem("cat-menu-item");
				}

				if (target === "meme-box") {
					Funboxfetcher.fetchMemes();
					FunboxUtils.disableMenuItem("meme-menu-item");
				}

				const boxTarget = document?.querySelector(`.${target}`);

				if (previous && previous !== boxTarget) previous.classList.remove("active");
				if (previousListItem && previousListItem !== target) previousListItem.classList.remove("active");

				item.classList.add("active");
				document?.querySelector(`.${target}`).classList.add("active");

				previous = boxTarget;
				previousListItem = item;
			});
		});
	},

	updateModule() {
		setInterval(() => {
			FunboxUtils.clearData();
			FunboxUtils.populateData();

		}, this.config.interval);
	}
});
