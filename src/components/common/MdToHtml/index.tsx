import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import { unified } from 'unified';

import 'highlight.js/styles/dark.css';

import 'katex/dist/katex.min.css';

import './styles.scss';
import './math.scss';

function rehypeTerminalWrapper() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      if (node.tagName !== 'pre') return;

      const codeNode = node.children?.find((child: any) => child.tagName === 'code');
      if (!codeNode) return;

      const classes = codeNode.properties?.className || [];

      // 1. Ignorar se for explicitamente marcado como linguagem matemática/latex
      if (classes.includes('language-math') || classes.includes('language-latex')) {
        return;
      }

      const terminal = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['terminal-frame'] },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['mac-window-controls'] },
            children: [
              {
                type: 'element',
                tagName: 'input',
                properties: {
                  type: 'radio',
                  name: 'window-control',
                  className: ['mac-window-button', 'close'],
                },
              },
              {
                type: 'element',
                tagName: 'input',
                properties: {
                  type: 'radio',
                  name: 'window-control',
                  className: ['mac-window-button', 'minimize'],
                },
              },
              {
                type: 'element',
                tagName: 'input',
                properties: {
                  type: 'radio',
                  name: 'window-control',
                  className: ['mac-window-button', 'maximize'],
                },
              },
            ],
          },
          {
            type: 'element',
            tagName: 'pre',
            properties: { className: ['terminal-frame-text'] },
            children: [codeNode], // 👈 AQUI é onde o highlight já injetou spans
          },
        ],
      };

      parent.children[index] = terminal;
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkMath)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeHighlight) // 🔥 Agora ele cuida das cores
  .use(rehypeTerminalWrapper)
  .use(rehypeKatex, { output: 'htmlAndMathml' })
  .use(rehypeStringify);

async function MdToHTML({ text }: { text: string }) {
  let htmlText = '';

  try {
    htmlText = String(await processor.process(text));
  } catch (e) {
    htmlText = String(await processor.process(text));
  }

  return (
    <div>
      <input type="checkbox" id="h2-toggle" className="hidden" />
      <div className="markdown-body text-white" dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}

export default MdToHTML;
