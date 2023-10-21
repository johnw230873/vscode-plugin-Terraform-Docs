const vscode = require('vscode');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');

function activate(context) {
  let disposable = vscode.commands.registerCommand('tfdocs.generateDocs', function (uri) {
    const filePath = uri.fsPath;
    const dirPath = path.dirname(filePath);
    const readmePath = path.join(dirPath, 'README.md');


    if (fs.existsSync(readmePath)) {
      vscode.window.showWarningMessage('README.md already exists. Do you want to overwrite it?', 'Yes', 'No')
        .then(selection => {
          if (selection === 'Yes') {
            generateDocs(dirPath, readmePath);
          }
        });
    } else {
      generateDocs(dirPath, readmePath);
    }
  });

  context.subscriptions.push(disposable);
}

function generateDocs(dirPath, readmePath) {
  const terraformDocCommand = `terraform-docs markdown ${dirPath}  --output-template "<!-- BEGIN_TF_DOCS -->\\n{{ .Content }}\\n<!-- END_TF_DOCS -->"  --output-file ${readmePath}`
  cp.exec(terraformDocCommand , (err, stdout, stderr) => {
    if (err) {
      vscode.window.showErrorMessage(`Error generating docs: ${stderr}`);
    } else {
      vscode.window.showInformationMessage('Docs generated successfully');
      console.log(stdout);
    }
  });
}


// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
