'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.runExclusive', () => {
        vscode.window.activeTextEditor.edit(builder => {
            let editor = vscode.window.activeTextEditor;
            let selection = editor.selection;
            let text = editor.document.getText(selection);
            let returnText = text.replace('it(', 'it.only(');
            // replace the selected text with it.only
            builder.replace(vscode.window.activeTextEditor.selection, returnText);
            // save the current test file
            const afterSave = vscode.window.activeTextEditor.document.save();
            afterSave.then((res) => {
                const currentFile = vscode.workspace.openTextDocument();
                currentFile.then((file) => {
                    vscode.window.createTerminal().sendText('mocha test/integration/' + file.fileName);
                });
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
    // called when the extension is deactivated
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map