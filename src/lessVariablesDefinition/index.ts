import * as vscode from "vscode";
import findVariables from "../utli/findLessVariables";
import getPath from '../utli/getPath';

const provideHover = async(document: vscode.TextDocument, position: vscode.Position) => {
	const word = document.getText(document.getWordRangeAtPosition(position));
	const lessVariablesPath = await getPath.getLessVariablesPath();

	if (!word.startsWith("@") || lessVariablesPath === '') {
		return;
	}

	const variables = Object.assign({}, findVariables(lessVariablesPath));

	if (Object.keys(variables).indexOf(word) !== -1) {
		return new vscode.Hover(`${word}:${variables[word]}`);
	}
}

export default function lessCompletion(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerHoverProvider("less", { provideHover }));
}
