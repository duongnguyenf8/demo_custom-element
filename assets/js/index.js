/**
 * @fileoverview Code snippet component
 * @description A custom HTML element for displaying and editing code snippets.
 * @author Dương Nguyễn
 */
// Import module 'log' từ đường dẫn './jsvjp/index.mjs'
import log from './jsvjp/index.mjs';

// Tạo một template cho nội dung code snippet
const codeSnippetContent = document.createElement('template');
codeSnippetContent.innerHTML = templateHTML;

/**
 * CodeSnippet class representing the custom element.
 * @class
 * @extends {HTMLElement}
 */
function CodeSnippet() {
  /**
   * Tạo một shadow DOM và gán vào element này
   * @type {ShadowRoot}
   */
  const shadowRoot = Reflect.construct(HTMLElement, [], this.constructor);
  shadowRoot.attachShadow({ mode: 'open' });

  // Thêm nội dung của template vào shadow DOM
  shadowRoot.shadowRoot.appendChild(codeSnippetContent.content.cloneNode(true));

  /**
   * Loads an external script.
   * @function
   * @param {string} src - The source URL of the script.
   * @param {string} type - The type of the script (default: 'text/javascript').
   * @returns {Promise} A Promise that resolves when the script is loaded.
   */
  const loadScript = (src, type = 'text/javascript') => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.type = type;
      script.onload = resolve;
      shadowRoot.shadowRoot.appendChild(script);
    });
  };

  // Load các script cần thiết và sau đó thực hiện các thao tác cần thiết
  loadScript(
    'https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.js'
  ).then(() =>
    Promise.all([
      // Các mode cho CodeMirror
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
      // Các addon cho CodeMirror
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
      /// Prettier để định dạng code
      loadScript('https://unpkg.com/prettier@3.0.3/standalone.js'),
      loadScript('https://unpkg.com/prettier@3.0.3/plugins/html.js'),
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
      });

      /// Lấy ra các phần tử cần thiết
      // (nhiều phần tử ở đây đã bị gán giá trị trong câu lệnh trên)

      shadowRoot.textarea = shadowRoot.shadowRoot.querySelector('.CodeMirror');
      shadowRoot.iframeWebview =
        shadowRoot.shadowRoot.querySelector('iframe#webview');
      shadowRoot.divConsole =
        shadowRoot.shadowRoot.querySelector('div#console');
      shadowRoot.resetButton =
        shadowRoot.shadowRoot.querySelector('button#resetBtn');
      shadowRoot.consoleButton =
        shadowRoot.shadowRoot.querySelector('button#consoleBtn');
      shadowRoot.innerContent = shadowRoot.innerHTML.trim();

      // Thêm CSS tùy chỉnh
      const styleTag = this.createStyle(
        `
          @import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@500&display=swap");
          #console {
            background:#191a2e;
            color:#baa4da;
          }
          #console pre{
            width:100%;
            height:auto;
            padding:10px 0;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            flex-wrap:wrap
          }
          #console code{width:100%}
          #console .error{color:#f55}
          #console .warn{color:#fad500}
          #console .success{color: #20E3B2;}
          #console .link{color:#58a6ff;text-decoration:none}
          #console * {
            font-family:"Source Code Pro",monospace;
          }
          #console::-webkit-scrollbar {
            width: 0
          }
          #console hr {
            border-bottom: 1px solid #baa4da40;
            margin-bottom: 20px;
          }
          `
      );
      shadowRoot.divConsole.parentElement.insertBefore(
        styleTag,
        shadowRoot.divConsole
      );

      // Nếu có nội dung ban đầu, cập nhật iframe và xóa nội dung trong shadow DOM
      if (shadowRoot.innerContent) {
        shadowRoot.iframeWebview.srcdoc = shadowRoot.innerContent;
        shadowRoot.updateContent(shadowRoot.innerContent);
        // remove all child of shadowRoot
        while (shadowRoot.firstChild) {
          shadowRoot.removeChild(shadowRoot.firstChild);
        }
      } else {
        // Nếu không có nội dung ban đầu, cập nhật iframe và xóa nội dung trong shadow DOM
        shadowRoot.iframeWebview.srcdoc = ' ';
        shadowRoot.updateContent(' ');
      }

      // Gắn các sự kiện cần thiết
      shadowRoot.CodeMirror.on(
        'keyup',
        shadowRoot.debounce(shadowRoot.updateIframe, 300).bind(shadowRoot)
      );
      shadowRoot.resetButton.addEventListener(
        'click',
        shadowRoot.reset.bind(shadowRoot)
      );
      shadowRoot.consoleButton.addEventListener(
        'click',
        shadowRoot.toggleConsole.bind(shadowRoot)
      );
      shadowRoot.addEventListener(
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
  newIframe.srcdoc = this.iframeWebview.srcdoc;
  newIframe.id = this.iframeWebview.id;
  this.iframeWebview.parentNode.replaceChild(newIframe, this.iframeWebview);
  const iframeDoc = newIframe.contentDocument;
  iframeDoc.open();
  iframeDoc.write(code);
  iframeDoc.close();
  this.iframeWebview = newIframe;
  this.updateConsole(code);
};

/**
 * Creates a style element with the given content.
 * @param {string} content - The CSS content for the style element.
 * @returns {HTMLStyleElement} The created style element.
 */
CodeSnippet.prototype.createStyle = (content) => {
  const style = document.createElement('style');
  style.innerHTML = content.trim();
  return style;
};

/**
 * Reading content of console
 */
CodeSnippet.prototype.lineConsole = 1;
CodeSnippet.prototype.updateConsole = function (value) {
  const trimmed = value.trim();
  const consoleDiv = this.divConsole;
  consoleDiv.textContent = '';
  this.lineConsole = 1;
  if (trimmed === '') {
    return;
  }
  const consoleCode = trimmed.replace(/\r\n /g, '\n');
  const _this = this;
  console.log = function (...args) {
    _this.log('', ...args);
  };
  console.error = function (...args) {
    _this.log('error', ...args);
  };
  console.warn = function (...args) {
    _this.log('warn', ...args);
  };
  console.info = function (...args) {
    _this.log('link', ...args);
  };
  const scriptCodes = consoleCode.match(/<script>(.*?)<\/script>/gs);
  if (scriptCodes) {
    scriptCodes.forEach((scriptCode) => {
      // allow DOM from value after run script.
      const DOMinCode = scriptCode
        .replace(/<\/?script>/g, '')
        .replace('const', 'var')
        .replace('let', 'var')
        .replace('document', 'this.iframeWebview.contentDocument');
      eval(DOMinCode);
      if (DOMinCode.includes('console.')) {
        this.divConsole.classList.add('show');
      }
    });
  }
  console.log = window.console.log; // Khôi phục lại console.log mặc định
  console.error = window.console.error; // Khôi phục lại console.error mặc định
  console.warn = window.console.warn; // Khôi phục lại console.warn mặc định
  console.info = window.console.info; // Khôi phục lại console.info mặc định
};
CodeSnippet.prototype.log = function (type = '', ...args) {
  const consoleDiv = this.divConsole;
  const logContent = log(...args);
  consoleDiv.innerHTML += `
  <a class="link" href="https://fullstack.edu.vn" target="_blank">${this
    .lineConsole++}: 
    <span class="success">${this.constructor.name} </span>
    <span class="warn">say: </span>
  </a>
  <div class=${type}>${logContent}</div><hr/>`;
};

/**
 * Resets the content of the code snippet to its initial state.
 */
CodeSnippet.prototype.reset = function () {
  const srcDoc = this.iframeWebview.srcdoc;
  this.updateContent(srcDoc);
  this.updateConsole(srcDoc);
  this.CodeMirror.focus();
};

/**
 * Updates the content of the CodeMirror editor and the iframe.
 * @param {string} value - The new content of the code snippet.
 */
CodeSnippet.prototype.updateContent = async function (value) {
  if (!value) value = this.CodeMirror.getValue();
  const formattedCode = await prettier.format(value, {
    parser: 'html',
    plugins: prettierPlugins,
  });
  this.CodeMirror.setValue(formattedCode);
  this.updateIframe();
};

CodeSnippet.prototype.toggleConsole = function () {
  this.divConsole.classList.toggle('show');
};

/**
 * This function formats the code in the CodeMirror editor using Prettier.
 */

CodeSnippet.prototype.formatCode = async function () {
  const code = this.CodeMirror.getValue();
  const formattedCode = await prettier.format(code, {
    parser: 'html',
    plugins: prettierPlugins,
  });
  this.updateContent(formattedCode);
};

/**
 * Handles keydown events for the content.
 * @param {Event} event - The keydown event.
 */
CodeSnippet.prototype.handleContent = async function (event) {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === 's') {
      event.preventDefault();
      this.formatCode();
      const code = this.CodeMirror.getValue();
      const fileName = code.replaceAll(' ', '').slice(0, 5) || 'untitled';
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
      event.preventDefault();
      this.reset();
    }
    if (event.key === '/') {
      event.preventDefault();
      this.CodeMirror.toggleComment({
        indent: true,
      });
    }
    if (event.key === 'Dead' || event.key === '`') {
      event.preventDefault();
      this.toggleConsole();
    }
  }
  if (event.altKey && event.shiftKey) {
    if (event.key === 'F') {
      // format code with prettier lib
      event.preventDefault();
      this.formatCode();
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
