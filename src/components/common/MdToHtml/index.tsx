import React from 'react';
import { marked } from 'marked';
import './styles.scss';

function escapeXml(xml: string) {
  return xml.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

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
        <pre class="terminal-frame-text">${escapeXml(text)}</pre>
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
