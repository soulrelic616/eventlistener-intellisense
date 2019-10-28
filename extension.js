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

	//var quoteMark = new RegExp(/["\']/g);

	function loopListeners() {
		eventListeners.forEach(function (item, index) {
			//console.log(item);
			CompletionItem = new vscode.CompletionItem(item, vscode.CompletionItemKind.Event);
			CompletionItems.push(CompletionItem);
		});
	}

	loopListeners();

	var quoteMarks = ["'", "\""];

	
	var langType = ['javascript', 'html', 'php'];

	console.log(vscode.window.activeTextEditor.document.languageId);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "eventlistener-intellisense" is now active!');

//Maybe list classes in array here?
		var provider1 = vscode.languages.registerCompletionItemProvider(langType, {

			provideCompletionItems(document, position, token, context) {

				const commitCharacterCompletion = new vscode.CompletionItem(".on(");
				commitCharacterCompletion.commitCharacters = ["'"];
				commitCharacterCompletion.documentation = new vscode.MarkdownString("Press single or double quotes to get `Event listener suggestions`");
				// a completion item that retriggers IntelliSense when being accepted,
				// the `command`-property is set which the editor will execute after 
				// completion has been inserted. Also, the `insertText` is set so that 
				// a space is inserted after `new`
				const commandCompletion = new vscode.CompletionItem('new');
				commandCompletion.kind = vscode.CompletionItemKind.Keyword;
				commandCompletion.insertText = 'new ';
				commandCompletion.command = {
					command: 'editor.action.triggerSuggest',
					title: 'Re-trigger completions...'
				};
				// return all completion items as array
				return [

					commitCharacterCompletion,
					commandCompletion
				];
			}
		});

		//trigger them here?
		var provider2 = vscode.languages.registerCompletionItemProvider(langType, {
			provideCompletionItems(document, position) {
				triggerSuggestion(document, position, quoteMarks[0]);
				return CompletionItems;
			}
		}, quoteMarks[0]);

		//trigger them here?
		var provider3 = vscode.languages.registerCompletionItemProvider(langType, {
			provideCompletionItems(document, position) {
				triggerSuggestion(document, position, quoteMarks[1]);
				return CompletionItems;
			}
		}, quoteMarks[1]);

		function triggerSuggestion(document, position, quoteMark) {
			let linePrefix = document.lineAt(position).text.substr(0, position.character);
			if (!linePrefix.endsWith(".on(" + quoteMark)) {
				return undefined;
			}
		}
		context.subscriptions.push(provider1, provider2, provider3);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}