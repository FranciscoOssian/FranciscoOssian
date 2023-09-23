import React from 'react';
import { marked } from 'marked';
import './styles.scss';

// Override function
const renderer = {
  code(text: string) {
    const html = `
      <div class="terminal-frame">
        <div class="mac-window-controls">
          <input type="radio" name="window-control" class="mac-window-button close">
          <input type="radio" name="window-control" class="mac-window-button minimize">
          <input type="radio" name="window-control" class="mac-window-button maximize">
        </div>
        <pre class="terminal-frame-text">${text}</pre>
      </div>
    `;

    return html.trim();
  }
};


marked.use({ renderer });

function MdToHTML({ text }: { text: string }) {
  const htmlText = marked.parse(text);

  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlText }} />
  );
}

export default MdToHTML;
