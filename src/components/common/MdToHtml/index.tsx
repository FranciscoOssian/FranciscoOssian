import React from 'react';
import { marked } from 'marked';
import './styles.scss';

function escapeXml(xml: string) {
  return xml
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function slug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

const used = false;

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
  },

  heading(text: string, level: number) {
    const blockLevel = (style: string) =>
      `<h${level} class="${style}" id=${slug(text)}>${text}</h${level}>`;
    if (level > 2 || level === 1) return blockLevel('');
    else
      return `
      ${used ? '' : '</details>'}
      <details class="mb-2 pl-[20px]">
        <summary class="ml-[-20px] marker:color-primary relative mt-[24px] mb-[34px] cursor-pointer select-none">${blockLevel(
          'absolute -top-[30px] left-[20px]'
        )}</summary>
    `;
  },
};

marked.use({ renderer });

async function MdToHTML({ text }: { text: string }) {
  let htmlText = await marked.parse(text);

  return (
    <div>
      <input type="checkbox" id="h2-toggle" className="hidden" />
      <div className="markdown-body text-white" dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}

export default MdToHTML;
