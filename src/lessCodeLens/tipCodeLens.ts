import { CodeLens, Range } from "vscode";

export default class TipCodeLens extends CodeLens {
	constructor(fileName: string, range: Range, alias: string, value: string) {
		super(range, {
			arguments: [alias, value, fileName, range],
			command: "css-helper-plugin.codelensAction",
			title: `${value} = ${alias}, replace`,
		});
	}
}
