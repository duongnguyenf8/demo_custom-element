/**
 * @fileoverview Code snippet component
 * @description A custom HTML element for displaying and editing code snippets.
 * @author Dương Nguyễn
 */

// Tạo một template cho nội dung code snippet
const codeSnippetContent = document.createElement('template');
codeSnippetContent.innerHTML = templateHTML;

/**
 * CodeSnippet class representing the custom element.
 * @class
 * @extends {HTMLElement}
 */
function CodeSnippet() {
  // Tạo một shadow DOM và gán vào element này
  const shadowRoot = Reflect.construct(HTMLElement, [], this.constructor);
  shadowRoot.attachShadow({ mode: 'open' });

  // Thêm nội dung của template vào shadow DOM
  shadowRoot.shadowRoot.appendChild(codeSnippetContent.content.cloneNode(true));

  /**
   * Loads an external script.
   * @function
   * @param {string} src - The source URL of the script.
   * @returns {Promise} A Promise that resolves when the script is loaded.
   */
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      shadowRoot.shadowRoot.appendChild(script);
    });
  };

  // Load các script cần thiết và sau đó thực hiện các thao tác cần thiết
  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js'
  ).then(() =>
    Promise.all([
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/htmlmixed/htmlmixed.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/xml/xml.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/javascript/javascript.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/mode/css/css.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/selection/active-line.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/matchbrackets.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/closebrackets.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/edit/closetag.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/comment/comment.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/search/search.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/search/jump-to-line.min.js'
      ),
      loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/addon/search/searchcursor.min.js'
      ),
    ]).then(() => {
      // Lấy ra textarea và khởi tạo CodeMirror
      shadowRoot.textarea =
        shadowRoot.shadowRoot.querySelector('textarea#code');
      shadowRoot.CodeMirror = CodeMirror.fromTextArea(shadowRoot.textarea, {
        mode: 'htmlmixed',
        theme: 'dracula',
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        // add search
        extraKeys: {
          'Ctrl-/': 'toggleComment',
        },
      });

      // Lấy ra các phần tử cần thiết
      shadowRoot.textarea = shadowRoot.shadowRoot.querySelector('.CodeMirror');
      shadowRoot.iframe = shadowRoot.shadowRoot.querySelector('iframe');
      shadowRoot.resetButton = shadowRoot.shadowRoot.querySelector('button');
      shadowRoot.innerContent = shadowRoot.innerHTML.trim();
      // Nếu có nội dung ban đầu, cập nhật iframe và xóa nội dung trong shadow DOM
      if (shadowRoot.innerContent) {
        shadowRoot.iframe.srcdoc = shadowRoot.innerContent;
        shadowRoot.updateContent(shadowRoot.innerContent);
        shadowRoot.innerHTML = '';
      } else {
        // Nếu không có nội dung ban đầu, cập nhật iframe và xóa nội dung trong shadow DOM
        shadowRoot.iframe.srcdoc = ' ';
        shadowRoot.updateContent(' ');
      }

      // Gắn các sự kiện cần thiết
      shadowRoot.CodeMirror.on('keyup', function () {
        shadowRoot.debounce(shadowRoot.updateIframe, 200).bind(shadowRoot)();
      });
      shadowRoot.resetButton.addEventListener(
        'click',
        shadowRoot.reset.bind(shadowRoot)
      );
      shadowRoot.shadowRoot.addEventListener(
        'keydown',
        shadowRoot.handleContent.bind(shadowRoot)
      );
    })
  );

  return shadowRoot;
}

/**
 * Prototype of the CodeSnippet class.
 * @type {HTMLElement}
 */
CodeSnippet.prototype = Object.create(HTMLElement.prototype, {
  constructor: { value: CodeSnippet },
});

/**
 * Debounce a function
 * @param {function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 */
CodeSnippet.prototype.debounce = function (func, wait) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Updates the content of the iframe with the content of the CodeMirror editor.
 */
CodeSnippet.prototype.updateIframe = function () {
  const code = this.CodeMirror.getValue();
  const newIframe = document.createElement('iframe');
  newIframe.srcdoc = this.iframe.srcdoc;
  this.iframe.parentNode.replaceChild(newIframe, this.iframe);
  const iframeDoc = newIframe.contentDocument;
  iframeDoc.open();
  iframeDoc.write(code);
  iframeDoc.close();
  this.iframe = newIframe;
};

/**
 * Resets the content of the code snippet to its initial state.
 */
CodeSnippet.prototype.reset = function () {
  const srcDoc = this.iframe.srcdoc;
  this.updateContent(srcDoc);
  this.CodeMirror.focus();
};

/**
 * Updates the content of the CodeMirror editor and the iframe.
 * @param {string} value - The new content of the code snippet.
 */
CodeSnippet.prototype.updateContent = function (value) {
  if (!value) value = this.CodeMirror.getValue();
  value = value.replaceAll('      ', ''); // Loại bỏ các khoảng trắng thụt đầu dòng
  this.CodeMirror.setValue(value);
  this.updateIframe();
};

/**
 * Saves the content of the textarea when the user presses Ctrl + S.
 * @param {Event} event - The keydown event.
 */
CodeSnippet.prototype.handleContent = function (event) {
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault();
    if (event.key === 's') {
      const code = this.CodeMirror.getValue();
      const fileName = code.replaceAll(' ', '').slice(0, 5);
      const fileContent = code;
      navigator.clipboard.writeText(fileContent);
      const blob = new Blob([fileContent], {
        type: 'text/html',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName + '.html';
      a.click();
      window.URL.revokeObjectURL(url);
    }
    if (event.key === 'r') {
      this.reset();
    }
  }
};

/**
 * Disables the default behavior of saving HTML file when pressing Ctrl + S.
 * @param {Event} event - The keydown event.
 */
window.addEventListener('keydown', function (event) {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 's') {
      event.preventDefault();
    }
  }
});

// Định nghĩa custom element 'code-snippet'
customElements.define('code-snippet', CodeSnippet);
