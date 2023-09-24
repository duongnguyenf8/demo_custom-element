# Code Snippet custom element

## About this

### Phần 1: Import và Khởi tạo `log`

```javascript
import log from './jsvjp/index.mjs';
```

Đây là một lệnh import một module từ một tệp tin khác. Module này được đặt trong một thư mục có tên là `jsvjp` và được gán cho biến `log`.

### Phần 2: Tiêu đề và Mô tả

```javascript
/**
 * @fileoverview Code snippet component
 * @description A custom HTML element for displaying and editing code snippets.
 * @author Dương Nguyễn
 */
```

Phần này chứa các chú thích dành cho file này. `@fileoverview` cung cấp một tóm tắt về nội dung của file. `@description` mô tả một cách ngắn gọn về custom element. `@author` cho biết tác giả của code.

### Phần 3: Tạo template cho nội dung code snippet

```javascript
const codeSnippetContent = document.createElement('template');
codeSnippetContent.innerHTML = templateHTML;
```

Tạo một template element (`<template>`) và gán nội dung của nó từ templateHTML.js.

### Phần 4: Class `CodeSnippet` và Shadow DOM

```javascript
function CodeSnippet() {
  const shadowRoot = Reflect.construct(HTMLElement, [], this.constructor);
  shadowRoot.attachShadow({ mode: 'open' });
  // ...
}
```

Đây là khai báo của một class có tên `CodeSnippet` được mở rộng từ `HTMLElement`. Trong hàm constructor, một shadow DOM được tạo ra và gắn vào element.

### Phần 5: Hàm `loadScript` và Load các script

```javascript
const loadScript = (src, type = 'text/javascript') => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    // ...
  });
};

loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js'
)
  .then
  // ...
  ();
```

Hàm `loadScript` được định nghĩa để tải các tệp script từ một URL cụ thể và trả về một promise.

### Phần 6: Khởi tạo CodeMirror và Các phần tử khác

```javascript
loadScript(
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js'
).then(() =>
  Promise.all([
    // ...
  ]).then(() => {
    // ...
  })
);
```

Sau khi các script cần thiết được tải, CodeMirror được khởi tạo và một số phần tử DOM khác được lấy ra.

### Phần 7: Gắn sự kiện và cập nhật iframe

```javascript
shadowRoot.CodeMirror.on(
  'keyup',
  shadowRoot.debounce(shadowRoot.updateIframe, 300).bind(shadowRoot)
);

CodeSnippet.prototype.updateIframe = function () {
  const code = this.CodeMirror.getValue();
  // ...
};
```

Sự kiện `keyup` được gắn kết vào CodeMirror để theo dõi sự thay đổi trong code. Khi có thay đổi, hàm `updateIframe` được gọi để cập nhật nội dung của iframe.

### Phần 8: Các hàm phụ trợ

```javascript
CodeSnippet.prototype.debounce = function (func, wait) {
  // ...
};

CodeSnippet.prototype.createStyle = (content) => {
  // ...
};
```

Đây là các hàm phụ trợ cho việc xử lý sự kiện và tạo các phần tử DOM.

### Phần 9: Các phương thức của `CodeSnippet`

```javascript
CodeSnippet.prototype.updateConsole = function (value) {
  // ...
};

CodeSnippet.prototype.log = function (...args) {
  // ...
};

CodeSnippet.prototype.reset = function () {
  // ...
};

CodeSnippet.prototype.updateContent = async function (value) {
  // ...
};

CodeSnippet.prototype.handleContent = async function (event) {
  // ...
};
```

Các phương thức này thực hiện các tác vụ cụ thể như cập nhật console, ghi log, reset, và cập nhật nội dung.

### Phần 10: Định nghĩa custom element

```javascript
customElements.define('code-snippet', CodeSnippet);
```

Cuối cùng, custom element `code-snippet` được định nghĩa.

## Usage

### Without element

```html
<code-snippet></code-snippet>
```

Với thẻ `code-snippet` không có content ở trong, nó sẽ được sử dụng như một text-editor HTML-CSS-JS thường và tự viết các content ở trong khoảng bên trái

### With element

```html
<code-snippet>
  <h1>Code Snippet</h1>
  <script>
    const h1 = document.querySelector('h1');
    h1.onclick = function () {
      console.log(h1.innerText);
    };
  </script>
</code-snippet>
```

Với thẻ `code-snippet` khi có content ở trong, nó sẽ được sử dụng như một code-editor HTML-CSS-JS và có sẵn các content ở trong khoảng bên trái

### Using this

Khoảng bên trái của element được sử dụng như một tab code, có thể viết được HTML, viết style trong thẻ `<style>` và viết script trong thẻ `<script>`

#### Reset button

Được sử dụng để reset content của tab code về giá trị **mặc định**

- Nếu có element, nó sẽ được reset về giá trị ban đầu của element đó

- Nếu không có element, nó sẽ được xóa toàn bộ content

Các tab console, tab view cũng sẽ được làm mới lại.

**Phím tắt: Ctrl + r**

#### Console button

Được sử dụng để bật tab `console.log` của riêng element `<code-snippet>` đó, có thể `console.log` ra các phép tính, object, array, function,... Thậm trí là cả Object HTMLElement.

**Phím tắt: Ctrl + `**

#### Other hot keyboard

Tương tự như một **'VS Code'** đơn giản, có thể sử dụng một số phím tắt như sau:

- **Ctrl + /** -> Comment đoạn/dòng code

- **Ctrl + F** || **Ctrl + G** -> Tìm kiếm keyword trong element `<code-snippet>` đang được focus

- **Shift + Alt + F** -> Format lại code như extension Prettier trong **'VS Code'**

- **Ctrl + S** -> Lưu lại file HTML kèm với Style, Script trong tab code được focus hoặc trong tab view được focus

- **Ctrl + Alt + Click** -> Multiple cursors giống trong VS code
