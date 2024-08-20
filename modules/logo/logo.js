Module.register("logo", {
	defaults:{
		text: "sigmalogo.svg"
	},
	getTemplate() {
		return "logo.njk";
	},
	getTemplateData() {
		return this.config;
	},
	getStyles() {
		return ["logo.css"];
	}
});
