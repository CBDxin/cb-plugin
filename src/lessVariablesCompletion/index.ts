import * as vscode from "vscode";
const getColor = require('get-css-colors')
import findVariables from "../utli/findLessVariables";
import utils from "../utils";

const provideCompletionItems = async (
  document: vscode.TextDocument,
  position: vscode.Position
) => {
  // 光标位置不是@不处理

  if (document.lineAt(position).text[position.character - 1] !== '@') {
    return;
  }

  // 文件路径
  const allFile = utils.getLocations(document) || [];

  // 汇总所有变量
  const allVars = utils.getVarsByFiles(allFile);

  const allDepVars = utils.getDepVars(allVars);

  const total = [];
  for (let key in allDepVars) {
    const documentation = allDepVars[key].reduce((pre, value, index) => {
      return (
        pre +
        `${value.key} : ${value.value} ;${
          index < allDepVars[key].length - 1 ? '\n' : ''
        }`
      );
    }, '');

    const lastColor = getColor(
      allDepVars[key][allDepVars[key].length - 1].value
    );

    if (lastColor && lastColor.length) {
      total.push({
        detail: lastColor[lastColor.length - 1],
        label: key,
        kind: vscode.CompletionItemKind.Color,
        documentation
      });
    } else {
      total.push({
        label: key,
        kind: vscode.CompletionItemKind.Variable,
        documentation
      });
    }
  }
  return total.length
    ? total
    : [
        {
          label: '@less-vars',
          kind: vscode.CompletionItemKind.Text,
          documentation:
            '未找到变量,可在setting.json中设置lessVars.locations为less文件绝对路径'
        }
      ];
};

export default function lessCompletion(context: vscode.ExtensionContext) {
  console.log("Styles auto Complete");
  // Styles auto Complete
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      ["less", "vue"],
      { provideCompletionItems },
      "@"
    )
  );
}
