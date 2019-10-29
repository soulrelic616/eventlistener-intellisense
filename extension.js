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
		"wheel"
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

	// This line of code will only be executed once when your extension is activated
	console.log('Extension "eventlistener-intellisense" is now active!');

	//MAIN FN
	function triggerSuggestion(document, position, quoteMark) {
		let linePrefix = document.lineAt(position).text.substr(0, position.character);
		if (!linePrefix.endsWith(".on(" + quoteMark)) {
			return undefined;
		}
	}

		//trigger them here?
		var snlQuote = vscode.languages.registerCompletionItemProvider(langType, {
			provideCompletionItems(document, position) {
				triggerSuggestion(document, position, quoteMarks[0]);
				return CompletionItems;
			}
		}, quoteMarks[0]);

		//trigger them here?
		var dblQuote = vscode.languages.registerCompletionItemProvider(langType, {
			provideCompletionItems(document, position) {
				triggerSuggestion(document, position, quoteMarks[1]);
				return CompletionItems;
			}
		}, quoteMarks[1]);

		context.subscriptions.push(snlQuote, dblQuote);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}