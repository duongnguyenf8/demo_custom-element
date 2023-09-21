const templateStyle = `@import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/dracula.min.css);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  outline: 0;
}
 *::selection{background-color:#baa4da25}
.code-snippet {
  position: relative; 
  left: 50%;
  transform: translate(-50%);
  display: flex;
  background-color: #f2f2f2;
  height: 80vh;
  width: 80vw;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  margin: 12px 0;
}
.code-snippet .area {
  position: relative;
  height: 100%;
  width: 45%;
  overflow: hidden;
}
.code-snippet button#consoleBtn {
  position: absolute;
  height: 30px;
  width: 60px;
  background-color: #baa4da20;
  color: #f2f2f2;
  top: 4px;
  right: 4px;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
}
.code-snippet button#resetBtn {
  position: absolute;
  height: 30px;
  width: 60px;
  background-color: #baa4da20;
  color: #f2f2f2;
  top: 4px;
  right: 68px;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
}
.code-snippet iframe#webview {
  height: 100%;
  width: 55%;
}
.code-snippet div#console {
  position: fixed;
  height: 0%;
  width: 55%;
  border-radius: 12px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s ease-in-out;
}
.code-snippet div#console.show {
  height: 40%;
  padding: 1rem;
  overflow: auto auto;
}
.code-snippet h1 {
  width: 100%;
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 16px;
  padding: 8px;
  padding-left: 20px;
  background-color: #191a2e;
  color: #f2f2f2;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  cursor: pointer;
}
.code-snippet .CodeMirror {
  width: 100%;
  height: calc(100% - 36px);
  background-color: #191a2e !important;
  font-size: 16px;
  border-radius: 12px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 0;
}
.code-snippet .cm-s-dracula .CodeMirror-gutters {
  background-color: #2d2c43 !important;
  border-radius: 8px;
}
.code-snippet .cm-s-dracula .CodeMirror-linenumber {
  color: #baa4da;
}
.code-snippet .CodeMirror-vscrollbar,.code-snippet .CodeMirror-hscrollbar {
  display: none !important;
}
`;
const templateHTML = `<style>${templateStyle}</style>
<div class="code-snippet">
  <div class="area">
    <h1
      title="Hi, mình là Dương Nguyễn, mình làm cái code snippet này đó hihi ^^">
      Code Snippet
    </h1>
    <textarea id="code"></textarea>
    <button title="Reset code" id="resetBtn">Reset</button>
    <button title="Open console" id="consoleBtn">Console</button>
  </div>
  <iframe id="webview"></iframe>
  <div id="console"></div>
</div>
`;
