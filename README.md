# Terraform-Docs VSCode Extension

This is a Visual Studio Code extension uses the application `terraform-docs`, it allows for easy creation of docuementation by allowing the developer to right click on any Terraform file in the module folder and select `Create Terraform Documentation`

## Features

- Generate a `README.md` file in the same directory as any `.tf` or `.tfvars` file by right-clicking on the file in the Explorer panel and selecting "Generate Terraform Docs".
- Customize the content of your Terraform documentation with various configuration options, such as hiding certain sections or specifying other Terraform-Docs flags.
- If a `README.md` file already exists, you will be asked for confirmation before it is overwritten.

## Requirements

This extension requires the `terraform-docs` https://github.com/terraform-docs/terraform-docs/releases/latest  command-line tool to be installed and available in your `PATH`. You can download it from here.

## Usage

To use this extension:

1. Right-click on any `.tf` or `.tfvars` file in the Explorer panel.
2. Select "Generate Terraform Docs".
3. If a `README.md` file already exists in the same directory, you will be asked for confirmation before it is overwritten.

![demo](demo.gif)

## Configuration

You can customize how this extension generates Terraform documentation by modifying the following settings:

- `tfdocs.terraformDocsPath`: Enter the path of the terraform-docs executable if it can't be found automatically.
- `tfdocs.terraformTemplateOptions`: The string for the "output-template" property.
- `tfdocs.hideDataSources`: Do not include DataSources information in the Readme.
- `tfdocs.hideFooter`: Do not include Footer information in the Readme.
- `tfdocs.hideHeader`: Do not include Header information in the Readme.
- `tfdocs.hideInputs`: Do not include Inputs information in the Readme.
- `tfdocs.hideModules`: Do not include Modules information in the Readme.
- `tfdocs.hideOutputs`: Do not include Outputs information in the Readme.
- `tfdocs.hideProviders`: Do not include Providers information in the Readme.
- `tfdocs.hideRequirements`: Do not include Requirements information in the Readme.
- `tfdocs.hideResources`: Do not include Resources information in the Readme.
- `tfdocs.OtherFlags`: Place other Terraform-Docs flags you wish to run.

## Contributing

If you have suggestions for how this extension could be improved, or want to report a bug, open an issue on our GitHub repository. We'd love to hear from you!

## License

This extension is use at own risk.
