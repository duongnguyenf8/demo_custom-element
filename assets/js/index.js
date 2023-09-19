/**
 * @fileoverview Code snippet component
 * @author Dương Nguyễn
 */
const codeSnippetContent = document.createElement('template');

codeSnippetContent.innerHTML = templateHTML;

/**
 * Code snippet component
 */
function CodeSnippet() {
  const shadowRoot = Reflect.construct(HTMLElement, [], this.constructor);
  shadowRoot.attachShadow({ mode: 'open' });
  shadowRoot.shadowRoot.appendChild(codeSnippetContent.content.cloneNode(true));
  shadowRoot.textarea = shadowRoot.shadowRoot.querySelector('textarea');
  shadowRoot.iframe = shadowRoot.shadowRoot.querySelector('iframe');
  shadowRoot.resetButton = shadowRoot.shadowRoot.querySelector('button');
  shadowRoot.innerContent = shadowRoot.innerHTML.trim();
  if (shadowRoot.innerContent) {
    shadowRoot.updateContent(shadowRoot.innerContent);
    shadowRoot.iframe.srcdoc = shadowRoot.innerContent;
    shadowRoot.innerHTML = '';
  }
  shadowRoot.textarea.addEventListener(
    'input',
    shadowRoot.debounce(shadowRoot.updateIframe, 300).bind(shadowRoot)
  );
  shadowRoot.resetButton.addEventListener(
    'click',
    shadowRoot.reset.bind(shadowRoot)
  );
  shadowRoot.shadowRoot.addEventListener(
    'keydown',
    shadowRoot.saveContent.bind(shadowRoot)
  );
  shadowRoot.textarea.focus();
  shadowRoot.resetButton.click();
  return shadowRoot;
}
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
 * Update the content of the iframe with the content of the textarea
 */
CodeSnippet.prototype.updateIframe = function () {
  const code = this.textarea.value;
  const newIframe = document.createElement('iframe');
  newIframe.srcdoc = this.iframe.srcdoc;
  this.iframe.parentNode.replaceChild(newIframe, this.iframe);
  const iframeDoc = newIframe.contentDocument;
  iframeDoc.open();
  iframeDoc.write(code);
  this.updateContent(code);
  iframeDoc.close();
  this.iframe = newIframe;
};
/**
 * Reset the content of the code snippet to its initial state
 */
CodeSnippet.prototype.reset = function () {
  const srcDoc = this.iframe.srcdoc;
  this.updateContent(srcDoc);
  this.updateIframe();
};
/**
 * Update the content of the code snippet
 * @param {string} value - The new content of the code snippet
 */
CodeSnippet.prototype.updateContent = function (value) {
  const textarea = this.textarea;
  value = value.replaceAll('      ', '');
  textarea.textContent = value;
  textarea.value = value;
};

/**
 * Save the content of the textarea when the user presses enter
 */
CodeSnippet.prototype.saveContent = function (event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
    const fileName = this.textarea.value.slice(0, 5);
    const fileContent = this.textarea.value;
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
};

/**
 * Disabled event save HTML file in window when press Ctrl S
 */
window.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault();
  }
});
customElements.define('code-snippet', CodeSnippet);
