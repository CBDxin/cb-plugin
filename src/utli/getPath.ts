import * as vscode from "vscode";

class getPath {
	public static async getGlobalCssPath() {
		const globalCssPathArr = await vscode.workspace.findFiles(
			vscode.workspace.getConfiguration().get("less-helper-chris.globalCssPath") as string
		);

		if (globalCssPathArr.length === 0) {
			return "";
		}

		const globalCssPath = globalCssPathArr[0].path.startsWith("/")
			? globalCssPathArr[0].path.substr(1)
			: globalCssPathArr[0].path;
		return globalCssPath;
	}

	public static async getLessVariablesPath() {
		const lessVariablesPathArr = await vscode.workspace.findFiles(
			vscode.workspace.getConfiguration().get("less-helper-chris.lessVariablesPath") as string
		);

		if (lessVariablesPathArr.length === 0) {
			return "";
		}

		const lessVariablesPath = lessVariablesPathArr[0].path.startsWith("/")
			? lessVariablesPathArr[0].path.substr(1)
			: lessVariablesPathArr[0].path;
		return lessVariablesPath;
	}
}

export default getPath;
