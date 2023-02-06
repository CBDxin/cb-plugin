import * as vscode from "vscode";
const getColor = require('get-css-colors')
import getPath from "../utli/getPath";
import utils from "../utils";


const provideHover = async (
  document: vscode.TextDocument,
  position: vscode.Position
) => {
  const word = document.getText(document.getWordRangeAtPosition(position));
  const lessVariablesPath = await getPath.getLessVariablesPath();

  if (!word.startsWith("@") || lessVariablesPath === "") {
    return;
  }

   // 文件路径
   const allFile = utils.getLocations(document) || [];

   // 汇总所有变量
   const allVars = utils.getVarsByFiles(allFile);
 
   const allDepVars = utils.getDepVars(allVars);

   
  if (allDepVars[word].length) {
    const lastColor = getColor(
      allDepVars[word][allDepVars[word].length - 1].value
    );
    return new vscode.Hover(`${word}:${lastColor}`);
  }
};

export default function lessCompletion(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(["less", "vue"], { provideHover })
  );
}
