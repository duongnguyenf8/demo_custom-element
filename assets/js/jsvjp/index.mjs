import { colorsList, wordsList } from './theme.mjs';
/**
 * @returns {string} - A random color from the colors list
 */
export function randomColor() {
  return colorsList[Math.floor(Math.random() * colorsList.length)];
}
/**
 * @param {...*} dataArgs - Any data to log
 */
export function log(...dataArgs) {
  if (!dataArgs.length) {
    const h1 = document.createElement('h1');
    h1.className = 'error';
    h1.textContent = 'data cannot be undefined';
    return;
  } else {
    for (const data of Array.from(dataArgs)) {
      const preTag = document.createElement('pre'),
        codeTag = document.createElement('code');
      let dataJson = '';
      try {
        if (Array.isArray(data) || 'object' == typeof data) {
          if (
            data.constructor.name === 'Object' ||
            data.constructor.name === 'Array'
          ) {
            dataJson = JSON.stringify(data, null, 2);
          } else {
            const objData = {};
            for (const key in data) {
              if (data[key] && key !== 'style') {
                switch (data[key].constructor.name) {
                  case 'Object':
                  case 'Array':
                    objData[key] = JSON.stringify(data[key], null, 2);
                    break;
                  case 'Number':
                  case 'String':
                  case 'Boolean':
                    if (!key.includes(key.toUpperCase()))
                      objData[key] = data[key];
                    break;
                  default:
                    objData[key] = data[key].toString();
                    break;
                }
              }
            }
            dataJson = `${data.constructor.name}: ${JSON.stringify(
              objData,
              null,
              2
            )}`;
          }
        } else {
          dataJson = String(data);
        }
      } catch (err) {
        dataJson = JSON.stringify(data, null, 2);
        const h1 = document.createElement('h1');
        h1.className = 'error';
        h1.textContent = err.message;
      } finally {
        dataJson = dataJson?.trim().replaceAll('\\', '');
      }
      if (Array.isArray(data) || 'object' == typeof data)
        preTag.classList.add('json');
      else preTag.classList.add('code');
      const regex = new RegExp(
          Object.keys(wordsList).join('|') + '|[^ws]',
          'gi'
        ),
        highlight = [];
      const html = dataJson.replace(regex, (char) => {
        if (wordsList.hasOwnProperty(char))
          return `<span style="color:${wordsList[char].color}">${char}</span>`;
        if (/[(){}\[\]]/.test(char)) {
          let color = randomColor();
          if ('(' === char || '{' === char || '[' === char)
            return (
              highlight.push(color),
              `<span class="open" style="color:${color}">${char}</span>`
            );
          return `<span class="close" style="color:${
            highlight.pop() || randomColor()
          }">${char}</span>`;
        }
        return char;
      });
      codeTag.innerHTML = html.replaceAll('\\', '');
      preTag.appendChild(codeTag);
      return preTag.outerHTML;
    }
  }
}
export default log;
