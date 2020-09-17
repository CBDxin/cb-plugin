import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export default function getProjectPath(document:any) {
  if (!document) {
      document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;
  }
  if (!document) {
      return '';
  }
  const currentFile = (document.uri ? document.uri : document).fsPath;
  let projectPath = null;

  //@ts-ignore
  let workspaceFolders = vscode.workspace.workspaceFolders.map(item => item.uri.path);
  // 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
  // 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
  if (workspaceFolders.length == 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
      const rootPath = workspaceFolders[0];
      var files = fs.readdirSync(rootPath);
      workspaceFolders = files.filter(name => !/^\./g.test(name)).map(name => path.resolve(rootPath, name));
      // vscode.workspace.rootPath会不准确，且已过时
      // return vscode.workspace.rootPath + '/' + this._getProjectName(vscode, document);
  }
  workspaceFolders.forEach(folder => {
      if (currentFile.indexOf(folder) === 0) {
          projectPath = folder;
      }
  })
  if (!projectPath) {
      return '';
  }
  return projectPath;
}