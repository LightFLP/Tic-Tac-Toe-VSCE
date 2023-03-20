import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(
    vscode.commands.registerCommand('tic-tac-toe.Start', () => {
		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
		'tic-tac-toe.Tic-Tac-Toe', // Identifies the type of the webview. Used internally
		'Tic Tac Toe', // Title of the panel displayed to the user
		vscode.ViewColumn.One, // Editor column to show the new webview panel in.
		{ } 
		);

		// Setup initial content for the webview
		panel.webview.options = {
			enableScripts: true,
		};

		panel.webview.html = getHtmlForWebview(panel.webview, context);

    })
  );

}

// This method is called when your extension is deactivated
export function deactivate() {}

/**
	 * Get the static html used for the editor webviews.
	 */
export function getHtmlForWebview(webview: vscode.Webview, context: vscode.ExtensionContext): string {
	// // Local path to script and css for the webview
	const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(
		context.extensionUri, 'out', 'viewer', 'viewer.js'));

	// const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(
	// 	this.context.extensionUri, 'media', 'reset.css'));

	// const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(
	// 	this.context.extensionUri, 'media', 'vscode.css'));

	const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(
		context.extensionUri, 'media', 'style.css'));

	// Use a nonce to whitelist which scripts can be run
	const nonce = getNonce();

	return /* html */`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">

		<!--
		Use a content security policy to only allow loading images from https or from our extension directory,
		and only allow scripts that have a specific nonce.
		-->
		<!--<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
		-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<link href="${styleUri}" rel="stylesheet" />

		<title>TicTacToe</title>
	</head>
	<body>
		<div id='root'/>
		<script nonce="${nonce}" src="${scriptUri}"></script>
	</body>
	</html>`;
}

export function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
