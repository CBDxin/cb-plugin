import * as vscode from 'vscode';
import findCssAlias from '../utli/findCssAlias';
import getPath from '../utli/getPath';

const classMatchReg = /className=[\s]*["|']([\w- ]*$)/;

const provideCompletionItems = async(document: vscode.TextDocument, position: vscode.Position) => {
  const start: vscode.Position = new vscode.Position(position.line, 0);
  const range: vscode.Range = new vscode.Range(start, position);
  const text: string = document.getText(range);
  const globalCssPath = await getPath.getGlobalCssPath();

	const rawClasses = text.match(classMatchReg);
	if (!rawClasses || rawClasses.length === 1 || globalCssPath === '') {
		return [];
  }

  const aliases = findCssAlias(globalCssPath);

  return Object.keys(aliases).map((alias) => {
    const aliasValue = aliases[alias].value;
    const aliasDesc = aliases[alias].desc;

    const completionItem = new vscode.CompletionItem(aliasValue, vscode.CompletionItemKind.Variable);

    completionItem.detail = aliasDesc;
    completionItem.filterText = `${aliasValue}: ${alias};`;

    return completionItem;
  });
}

export default function cssAliasCompletion(context: vscode.ExtensionContext): void {
  // Css Alias auto Complete
  console.log('Css Alias auto Complete');
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider('typescriptreact', { provideCompletionItems }, '"', "'", ' ')
  );
}