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
  //Read the config of the plugin
  const config = vscode.workspace.getConfiguration('tfdocs');
  const terraformDocsPath = config.get('terraformDocsPath');
  const otherflags = config.get('OtherFlags');

  //const terraformDocCommand = `terraform-docs markdown ${dirPath}  --output-template "<!-- BEGIN_TF_DOCS -->\\n{{ .Content }}\\n<!-- END_TF_DOCS -->"  --output-file ${readmePath}`
  var terraformDocCommand =  terraformDocsPath ? path.join(terraformDocsPath, 'terraform-docs') + ` markdown ${dirPath} --output-file README.md ` : `terraform-docs markdown ${dirPath} --output-file README.md `;
  terraformDocCommand = (config.get('hideDataSources')) ? terraformDocCommand : terraformDocCommand + `--hide data-sources `;
  terraformDocCommand = (config.get('hideFooter')) ? terraformDocCommand +  `--hide footer ` : terraformDocCommand;
  terraformDocCommand = (config.get('hideHeader')) ?  terraformDocCommand + `--hide header ` : terraformDocCommand;
  terraformDocCommand = (config.get('hideInputs')) ?  terraformDocCommand + `--hide inputs ` : terraformDocCommand;
  terraformDocCommand = (config.get('hideModules')) ?  terraformDocCommand + `--hide modules ` : terraformDocCommand;
  terraformDocCommand = (config.get('hideOutputs')) ?  terraformDocCommand + `--hide outputs ` : terraformDocCommand;
  terraformDocCommand = (config.get('hideProviders')) ?  terraformDocCommand + `--hide providers ` : terraformDocCommand;
  terraformDocCommand = (config.get('hideRequirements')) ?  terraformDocCommand + `--hide requirements ` : terraformDocCommand;
  terraformDocCommand = (config.get('hideResources')) ?  terraformDocCommand + `--hide resources ` : terraformDocCommand;
  terraformDocCommand = otherflags ? `${terraformDocCommand} ${otherflags} ` : `${terraformDocCommand} `;


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
