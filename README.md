# JSON Tree Viewer

Render JSON as an interactive collapsible tree with color-coded node types, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/developer-tools/json-tree-viewer

## How It Works

`buildTree(value, key, parent)` recursively constructs DOM nodes: `null` renders with class `jtree-null`, booleans with `jtree-boolean`, numbers with `jtree-number`, strings with `jtree-string` (truncated to 200 characters). Arrays and objects get a toggle `<span>` with `+`/`-` text prepended to the line; their child nodes are appended to a `jtree-children` div. Clicking the toggle calls `classList.toggle('collapsed')` on the children container. Array nodes display `Array[N]` and object nodes display `Object{N}` type labels. The viewer is triggered by the View button after `JSON.parse`.

## Features

- Color-coded node types: null, boolean, number, string
- `Array[N]` and `Object{N}` labels with item counts
- Click-to-collapse/expand at any nesting level
- String values truncated to 200 characters
- Error display for invalid JSON

## Browser APIs Used

- (No external APIs — pure DOM manipulation)

## Code Structure

| File | Description |
|------|-------------|
| `json-tree-viewer.js` | Recursive `buildTree` (null/boolean/number/string/array/object cases), `classList.toggle('collapsed')` expand/collapse, 200-char string truncation |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#jtreeInput` | JSON input textarea |
| `#jtreeView` | View button |
| `#jtreeClear` | Clear input and viewer |
| `#jtreeViewer` | Tree output container |
| `#jtreeStatus` | Error status display |

## License

MIT
