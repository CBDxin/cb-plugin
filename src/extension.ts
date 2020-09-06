import * as vscode from 'vscode';
const path = require('path');
const fs = require('fs');

import lessCompletion from './lessCompletion';
import classNameCompletion from './classNameCompletion';


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "cb-plugin" is now active!');

	lessCompletion(context);
	classNameCompletion(context);

	let disposable = vscode.commands.registerCommand('cb-plugin.helloWorld', (uri) => {
		vscode.window.showInformationMessage('Hello World from cb-plugin!');
		vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
	});


	context.subscriptions.push(disposable);
}

export function deactivate() {}
