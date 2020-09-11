import * as vscode from 'vscode';
const path = require('path');
const fs = require('fs');

import lessCompletion from './lessCompletion';
import classNameCompletion from './classNameCompletion';
import cssAliasCompletion from './cssAliasCompletion';
import { CodelensProvider } from './lessCodeLens/lessCodelensProvider';


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "cb-plugin" is now active!');

	lessCompletion(context);
	classNameCompletion(context);
    cssAliasCompletion(context);
    
    vscode.languages.registerCodeLensProvider("less", new CodelensProvider());

	let disposable = vscode.commands.registerCommand('cb-plugin.codelensAction', (alias, value, fileName, range) => {
		const editor = vscode.window.activeTextEditor;
		editor?.edit(editBuilder=>{
			editBuilder.replace(range, alias);
		})
  });

	context.subscriptions.push(disposable);
}

export function deactivate() {}
