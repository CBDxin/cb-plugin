import * as vscode from "vscode";
import * as path from "path";
import tipCodeLens from "./tipCodeLens";
import findVariables from "../utli/findLessVariables";
import getPath from "../utli/getPath";

// function getRootPath(document:vscode.TextDocument) {
//     const activeWorkspace = vscode.workspace.getWorkspaceFolder(document.uri);

//     if (activeWorkspace) {
//       return activeWorkspace;
//     }

//     return vscode.workspace;
// }

function matchLessVariable(lessVariables: any, targetValue: string) {
	for (const key in lessVariables) {
		if (lessVariables[key].toLocaleLowerCase() === targetValue.toLocaleLowerCase()) {
			return key;
		}
	}
}

export class CodelensProvider implements vscode.CodeLensProvider {
	private codeLenses: vscode.CodeLens[] = [];
	private regex: RegExp;
	private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
	public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

	constructor() {
		this.regex = /.:[\s]*([^:\s;]+)/g;

		vscode.workspace.onDidChangeConfiguration(_ => {
			this._onDidChangeCodeLenses.fire();
		});
	}

	public provideCodeLenses = async (
		document: vscode.TextDocument,
		token: vscode.CancellationToken
	) => {
		if (vscode.workspace.getConfiguration("codelens-sample").get("enableCodeLens", true)) {
			this.codeLenses = [];
			const regex = new RegExp(this.regex);
			const text = document.getText();
			const lessVariablesPath = await getPath.getLessVariablesPath();
			let matches, matchedAlias;

			if (lessVariablesPath === "") {
				return;
			}

			const lessVariables = Object.assign({}, findVariables(lessVariablesPath));
			while ((matches = regex.exec(text)) !== null) {
				matchedAlias = matchLessVariable(lessVariables, matches[1]);
				if (matchedAlias) {
					const line = document.lineAt(document.positionAt(matches.index).line);
					const indexOf = line.text.indexOf(matches[1]);
					const position = new vscode.Position(line.lineNumber, indexOf);
					const range = document.getWordRangeAtPosition(position, new RegExp(/([^:\s;]+)/g));
					if (range) {
						this.codeLenses.push(
							new tipCodeLens(document.fileName, range, matchedAlias, matches[1])
						);
					}
				}
			}
			return this.codeLenses;
		}
		return [];
	};

	public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
		return null;
	}
}
