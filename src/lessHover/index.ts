import * as vscode from "vscode";
const getColor = require('get-css-colors')
import utils from "../utils";


const provideHover = async (
  document: vscode.TextDocument,
  position: vscode.Position
) => {
  let  word = document.getText(document.getWordRangeAtPosition(position));

  // if (!word.startsWith("@") ) {
  //  return;
  // }
   // 文件路径
   const allFile = utils.getLocations(document) || [];

   // 汇总所有变量
   const allVars = utils.getVarsByFiles(allFile);
 
   const allDepVars = utils.getDepVars(allVars);
  // TODO: VUE 文件需要兼容
   let  varitem= allDepVars[word]||allDepVars['@'+word];
  if (varitem) {
    const lastColor = varitem[varitem.length - 1].value;

    if(!word.startsWith("@")){
      word= '@'+word;
    }
    return new vscode.Hover(`${word}:${lastColor}`);
  }
};

export default function lessCompletion(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(["less", "vue"], { provideHover })
  );
}
