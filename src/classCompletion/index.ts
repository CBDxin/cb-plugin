import * as vscode from 'vscode';
import findCssClassNames from '../utli/findCssClassNames';
import getPath from '../utli/getPath';

const classMatchReg = /className=["|']([\w- ]*$)/;

const provideCompletionItems = async(document: vscode.TextDocument, position: vscode.Position) => {
  const start: vscode.Position = new vscode.Position(position.line, 0);
  const range: vscode.Range = new vscode.Range(start, position);
  const text: string = document.getText(range);
  const globalCssPath = await getPath.getGlobalCssPath();

  const rawClasses = text.match(classMatchReg);
	if (!rawClasses || rawClasses.length === 1 || globalCssPath === '') {
		return [];
	}

  const classNames = await findCssClassNames(globalCssPath);

  return classNames.map((className) => {
    const completionItem = new vscode.CompletionItem(className, vscode.CompletionItemKind.Variable);
    completionItem.detail = className;
    return completionItem;
  });
}

export default function classNameCompletion(context: vscode.ExtensionContext): void {
  // ClassName auto Complete
  console.log('ClassName auto Complete');
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('typescriptreact', { provideCompletionItems }, '"', "'", ' ')
  );
}