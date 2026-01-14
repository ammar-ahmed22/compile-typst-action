<div align="center" >

  🛠️ :page_facing_up:

</div>

<h1 align="center">
  compile-typst
</h1>

<p align="center">
  A GitHub Action for compiling Typst files to PDF's using the latest Typst release.
</p>

## ✨ Features
- **Compile Typst Code**: Automatically compiles .typ files into PDFs.
- **Customizable Paths**: Specify source and output paths for flexibility.
- **Font Support**: Optional custom font configuration for Typst rendering.

## 📥 Inputs
| Name            | Type       | Description                                                                                              | Required? |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------- | :-------: |
| `source_paths`  | `String[]` | Space separated list of paths to the `.typ` files                                                        | ✅        |
| `output_paths`  | `String[]` | Space separated list of output paths (must be `.pdf`) (defaults to the same name as the `source_paths`)  |           |
| `fonts_paths`   | `String`   | Path to the fonts directory used by the Typst compiler                                                   |           |

> 💡 When providing `output_paths`, the number of `output_paths` should match exactly the number of `source_paths`. Each source file will be compiled to the output file in the given order.

## 🤸 Usage

To use this acton, create a workflow file (e.g. `.github/workflows/typst-compile.yml`) in your GitHub repository. 

Here's a basic example: 

```yaml
name: Compile Typst Documents
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Compile Typst Files
      uses: ammar-ahmed22/compile-typst-action@v2
      with:
        source_paths: 'path/to/source/file1.typ path/to/source/file2.typ'
        output_paths: 'path/to/output/file1.pdf path/to/output/file2.pdf'
        fonts_path: 'path/to/fonts'
```

Here's a more complex example which does the following:
- Compiles the Typst files into PDF's
- Uploads artifacts of the PDF's
- If the action is run on a tag, creates a release with the PDF files

```yaml
name: Compile, Upload and Release Typst Documents
on:
  workflow_dispatch:
  push:
    tags:
    - '**'
permissions:
  contents: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Repository
      uses: actions/checkout@v4
    - name: Compile Typst Files
      uses: ammar-ahmed22/compile-typst-action@v2
      with:
        source_paths: 'path/to/source/file1.typ path/to/source/file2.typ'
        output_paths: 'path/to/output/file1.pdf path/to/output/file2.pdf'
        fonts_path: 'path/to/fonts'
    - name: Upload Artifacts
      uses: actions/upload-artifact@v3
      with:
        name: PDF
        path: '**/*.pdf'
    - name: Release on tag
      uses: softprops/action-gh-release@v1
      if: github.ref_type = 'tag'
      with:
        name: "${{ github.ref_name }}"
        files: |
          path/to/output/file1.pdf
          path/to/output/file2.pdf
```

I have created an example project where this action is used to compile and commit the generated/updated PDFs to the repo:

[compile-typst-example](https://github.com/ammar-ahmed22/compile-typst-example)

## 🙌 Contributing
Contributions to the Typst Compiler GitHub Action are welcome! It is far from perfect, I threw  this together quickly to solve a personal problem. Please feel free to open a PR or issue with any changes!

For more information on Typst, visit [Typst Documentation](https://typst.app/docs/).

Ammar Ahmed (ammar-ahmed22) 2024
