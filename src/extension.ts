import * as vscode from "vscode";

import lessCompletion from "./lessVariablesCompletion";
import classNameCompletion from "./classCompletion";
import cssAliasCompletion from "./classAliasCompletion";
import lessHover from "./lessHover";
import setLocations from "./setLocation";
import { CodelensProvider } from "./lessCodeLens/lessCodelensProvider";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "css-helper-plugin" is now active!'
  );
  setLocations(context);// 设置路径的webview
  lessCompletion(context);
  classNameCompletion(context);
  cssAliasCompletion(context);
  lessHover(context);

  vscode.languages.registerCodeLensProvider(
    ["less", "vue"],
    new CodelensProvider()
  );

  let disposable = vscode.commands.registerCommand(
    "css-helper-plugin.codelensAction",
    (alias, value, fileName, range) => {
      const editor = vscode.window.activeTextEditor;
      editor?.edit((editBuilder) => {
        editBuilder.replace(range, alias);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
