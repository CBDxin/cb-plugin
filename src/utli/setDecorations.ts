import * as vscode from 'vscode';

export default function setDecorations(){
  const decoration = {
    before: {
        contentText: 'line test', 
        color: 'red',
    }
  }
  const fontColorDecorator = vscode.window.createTextEditorDecorationType(decoration);
  const range = { range: new vscode.Range(10, 0, 10, 0) }; // the line number is 10
  let ranges = [];
  ranges.push(range);
  vscode.window.activeTextEditor?.setDecorations(fontColorDecorator, ranges);
}
