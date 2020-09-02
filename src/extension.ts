import * as vscode from 'vscode';
const path = require('path');
const fs = require('fs');


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "cb-plugin" is now active!');

	let disposable = vscode.commands.registerCommand('cb-plugin.helloWorld', (uri) => {
		vscode.window.showInformationMessage('Hello World from cb-plugin!');
		vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
	});


	context.subscriptions.push(disposable);
}

export function deactivate() {}
