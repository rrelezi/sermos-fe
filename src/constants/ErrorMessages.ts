interface IMessage {
  required: string;
  minLength: string;
  min: string;
  max: string;
  maxLength: string;
  pattern: string;
}

const Messages: IMessage = {
  required: "is required",
  minLength: "should be least {{minLength}} characters",
  min: "should be greater than or equal to {{data-min}}",
  max: "should be less than or equal to {{data-max}}",
  maxLength: "must not be longer than {{maxLength}} characters",
  pattern: "should be a valid {{name}}",
};

const extractPiece = (str: string) => {
	const matches = /{{([^}]*)}}/.exec(str);
	if (!matches) {
		return [null, null];
	}
	return [matches[0], matches[1]];
};

const renderErrorMessage = (type: string, props: any, defaultErrorMessage = '', formMessage: string) => {

	const key : (keyof IMessage) = type as any;
	let string = Messages[key];
	if (['pattern', 'validate', 'required'].indexOf(type) > -1 && formMessage) {
		string = formMessage;
	}
	if (!string) {
		string = defaultErrorMessage;
	}
	let [value, prop] = extractPiece(Messages[key]);
	while (value && prop) {
		const varValue = props[prop] ? props[prop] : '';
		if (!varValue) {
			console.error(`No var value set for ${value}`);
		}
		string = string.replace(value, props[prop] ? props[prop] : '');
		[value, prop] = extractPiece(string);
	}
	return string;
};

export default renderErrorMessage;
