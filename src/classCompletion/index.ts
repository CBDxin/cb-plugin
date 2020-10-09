import * as vscode from 'vscode';
import findCssClassNames from '../utli/findCssClassNames';
import getPath from '../utli/getPath';
import * as path from 'path'; 

const classMatchReg = /className=[\s]*["|']([\w- ]*)/;
const importMatchReg = /import[\s]*["|']([^:\s;]+)(\.less)["|']/g;

const provideCompletionItems = async(document: vscode.TextDocument, position: vscode.Position) => {
  const start: vscode.Position = new vscode.Position(position.line, 0);
  const range: vscode.Range = new vscode.Range(start, position);
  const text: string = document.getText(range);
  const content: string = document.getText();
  const globalCssPath = await getPath.getGlobalCssPath();
  let classNames:string[] = [], importMatches;

  const rawClasses = text.match(classMatchReg);
	if (!rawClasses || rawClasses.length === 1 || globalCssPath === '') {
		return [];
	}

  while ((importMatches = importMatchReg.exec(content)) !== null ) {
    let importPath = importMatches[1] + importMatches[2];
    let importClassNames = await findCssClassNames(path.resolve(path.dirname(document.fileName), importPath));
    classNames = [...classNames, ...importClassNames];
  }

  let globalClassNames = globalCssPath ? await findCssClassNames(globalCssPath) : [];
  classNames = [...classNames, ...globalClassNames];

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