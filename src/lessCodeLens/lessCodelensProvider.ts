import * as vscode from 'vscode';
import tipCodeLens from './tipCodeLens';
import findVariables from '../findLessVariables';

function getRootPath(document:vscode.TextDocument) {
    const activeWorkspace = vscode.workspace.getWorkspaceFolder(document.uri);
  
    if (activeWorkspace) {
      return activeWorkspace;
    }
  
    return vscode.workspace;
}

function matchLessVariable(lessVariables: any, targetValue: string){
    for (const key in lessVariables) {
        if(lessVariables[key] === targetValue){
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

        vscode.workspace.onDidChangeConfiguration((_) => {
            this._onDidChangeCodeLenses.fire();
        });
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {

        if (vscode.workspace.getConfiguration("codelens-sample").get("enableCodeLens", true)) {
            this.codeLenses = [];
            const regex = new RegExp(this.regex);
            const text = document.getText();
            let matches, matchedAlias;
            const lessVariables = Object.assign({}, findVariables(document.fileName));
            while ((matches = regex.exec(text)) !== null && (matchedAlias = matchLessVariable(lessVariables, matches[1]))) {
                const line = document.lineAt(document.positionAt(matches.index).line);
                const indexOf = line.text.indexOf(matches[1]);
                const position = new vscode.Position(line.lineNumber, indexOf);
                const range = document.getWordRangeAtPosition(position, new RegExp(/([^:\s;]+)/g));
                if (range) {
                    this.codeLenses.push(new tipCodeLens(getRootPath(document), document.fileName, range, matchedAlias, matches[1]));
                }
            }
            return this.codeLenses;
        }
        return [];
    }

    public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken) {
        return null;
    }
}