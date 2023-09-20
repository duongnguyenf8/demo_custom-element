const templateStyle = `@import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/codemirror.min.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/codemirror/6.65.7/theme/dracula.min.css);
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  outline: 0;
}
.code-snippet {
  position: relative; 
  left: 50%;
  transform: translate(-50%,0);
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
.code-snippet button {
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
.code-snippet iframe {
  height: 100%;
  width: 55%;
  border-radius: 12px;
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
    height: calc(100% - 38px);
  background-color: #191a2e !important;
  font-size: 16px;
  border-radius: 12px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.code-snippet .cm-s-dracula .CodeMirror-gutters {
  background-color: #baa4da20 !important;
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
    <textarea id="code"></textarea><button title="Reset code">Reset</button>
  </div>
  <iframe></iframe>
</div>
`;
