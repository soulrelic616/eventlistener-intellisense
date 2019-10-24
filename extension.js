// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let eventListeners = [
		"Event",
		"abort",
		"afterprint",
		"animationend",
		"animationiteration",
		"animationstart",
		"beforeprint",
		"beforeunload",
		"blur",
		"canplay",
		"canplaythrough",
		"change",
		"click",
		"contextmenu",
		"copy",
		"cut",
		"dblclick",
		"drag",
		"dragend",
		"dragenter",
		"dragleave",
		"dragover",
		"dragstart",
		"drop",
		"durationchange",
		"ended",
		"error",
		"focus",
		"focusin",
		"focusout",
		"fullscreenchange",
		"fullscreenerror",
		"hashchange",
		"input",
		"invalid",
		"keydown",
		"keypress",
		"keyup",
		"load",
		"loadeddata",
		"loadedmetadata",
		"loadstart",
		"message",
		"mousedown",
		"mouseenter",
		"mouseleave",
		"mousemove",
		"mouseover",
		"mouseout",
		"mouseup",
		"mousewheel",
		"offline",
		"online",
		"open",
		"pagehide",
		"pageshow",
		"paste",
		"pause",
		"play",
		"playing",
		"popstate",
		"progress",
		"ratechange",
		"resize",
		"reset",
		"scroll",
		"search",
		"seeked",
		"seeking",
		"select",
		"show",
		"stalled",
		"storage",
		"submit",
		"suspend",
		"timeupdate",
		"toggle",
		"touchcancel",
		"touchend",
		"touchmove",
		"touchstart",
		"transitionend",
		"unload",
		"volumechange",
		"waiting",
		"wheel",
	];

	var CompletionItems = [];
	var CompletionItem;

	function loopListeners(){
		eventListeners.forEach(function(item, index){
			console.log(item);
			CompletionItem = new vscode.CompletionItem(item, vscode.CompletionItemKind.Class);
			CompletionItems.push(CompletionItem);

			console.log(CompletionItems)
		});
	}

	loopListeners();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "eventlistener-intellisense" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	//Maybe list classes in array here?
	let provider1 = vscode.languages.registerCompletionItemProvider('javascript', {

        provideCompletionItems(document, position, token, context) {
            
            const commitCharacterCompletion = new vscode.CompletionItem("on(");
            commitCharacterCompletion.commitCharacters = ["'"];
            commitCharacterCompletion.documentation = new vscode.MarkdownString("Press `'` to get `lol`");
            // a completion item that retriggers IntelliSense when being accepted,
            // the `command`-property is set which the editor will execute after 
            // completion has been inserted. Also, the `insertText` is set so that 
            // a space is inserted after `new`
            const commandCompletion = new vscode.CompletionItem('new');
            commandCompletion.kind = vscode.CompletionItemKind.Keyword;
            commandCompletion.insertText = 'new ';
            commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };
            // return all completion items as array
            return [
               
                commitCharacterCompletion,
                commandCompletion
            ];
        }
	});

	//trigger them here?
    const provider2 = vscode.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems(document, position) {
            // get all text until the `position` and check if it reads `console.`
            // and if so then complete if `log`, `warn`, and `error`
            let linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith("on('")) {
                return undefined;
            }
            return CompletionItems;
        }
    }, "'"); // triggered whenever a '.' is being typed

	context.subscriptions.push(provider1, provider2, disposable); 
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}