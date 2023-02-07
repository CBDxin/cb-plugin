import * as vscode from "vscode";
const rgba = require('color-rgba');
import tipCodeLens from "./tipCodeLens";


import utils from "../utils";

// function getRootPath(document:vscode.TextDocument) {
//     const activeWorkspace = vscode.workspace.getWorkspaceFolder(document.uri);

//     if (activeWorkspace) {
//       return activeWorkspace;
//     }

//     return vscode.workspace;
// }

function matchLessVariable(lessVariables: any, targetValue: string) {

  // 可能匹配出多个变量
	let list = [];
	for (const key in lessVariables) {
		const lastImte= lessVariables[key].slice(-1)[0];

			
	let a= rgba(lastImte.value).toString();
	let b= rgba(targetValue).toString();
   // 可能是颜色 兼容 可以转化的颜色
	if (lastImte.value.toLocaleLowerCase() === targetValue.toLocaleLowerCase()||(!!a&&!!b&&a===b)) {
		list.push(key);
	}
	}

	return list;
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
			let matches, matchedAlias;

			  // 文件路径
			const allFile = utils.getLocations(document) || [];

			// 汇总所有变量
			const allVars = utils.getVarsByFiles(allFile);

			const allDepVars = utils.getDepVars(allVars);

			if(!Object.keys(allDepVars).length){
				return;
			}
			while ((matches = regex.exec(text)) !== null) {
				matchedAlias = matchLessVariable(allDepVars, matches[1]);
				if (matchedAlias.length) {
					const line = document.lineAt(document.positionAt(matches.index).line);
					const indexOf = line.text.indexOf(matches[1]);
					const position = new vscode.Position(line.lineNumber, indexOf);
					const range = document.getWordRangeAtPosition(position, new RegExp(/([^:\s;]+)/g));
					if (range) {
						let index= matchedAlias.length;
						while(index--){
							this.codeLenses.push(
								new tipCodeLens(document.fileName, range, matchedAlias[index], matches[1])
								
							);

						}
						
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
