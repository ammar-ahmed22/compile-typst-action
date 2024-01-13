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

## 📥 Inputs
| Name            | Type     | Description                                                                                              | Required? |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------- | --------- |
| `source_paths`  | String[] | Space separated list of paths to the `.typ` files                                                        | ✅        |
| `output_paths`  | String[] | Space separated list of output paths (must be `.pdf`) (defaults to the same name as the `source_paths`)  |           |
| `fonts_paths`   | String   | Path to the fonts directory used by the Typst compiler                                                   |           |
## 🤸 Usage

To use this acton, create a workflow file (e.g. `.github/workflows/typst-compile.yml`) in your GitHub repository. 

Here's a basic example: 

```yaml

```

Here's a more complex example which does the following:
- Compiles the Typst files into PDF's
- Uploads artifacts of the PDF's
- If the action is run on a tag, creates a release with the PDF files

```yaml

```

## 🙌 Contributing
Contributions to the Typst Compiler GitHub Action are welcome! It is far from perfect, I threw  this together quickly to solve a personal problem. Please feel free to open a PR or issue with any changes!

For more information on Typst, visit [Typst Documentation](https://typst.app/docs/).

Amamr Ahmed (ammar-ahmed22) 2024