import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
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

async function fetchGist(src: string): Promise<string> {
  const match = src.match(/(?:gist\.github\.com\/)?(?:([^/\s?#]+)\/)?([a-f0-9]+)(?:\.js)?/i);
  if (!match) return '';

  const [, user, id] = match;
  const query = src.includes('?') ? `?${src.split('?')[1].trim()}` : '';
  const url = user
    ? `https://gist.github.com/${user}/${id}.json${query}`
    : `https://gist.github.com/${id}.json${query}`;

  try {
    const res = await (fetch as any)(url, {
      headers: { 'User-Agent': 'Node' },
      next: { revalidate: 3600 },
    });
    const { div, stylesheet } = await res.json();
    return `<link rel="stylesheet" href="${stylesheet}" />${div}`;
  } catch {
    const gistUrl = `https://gist.github.com/${user ? `${user}/` : ''}${id}`;
    return `<p><a href="${gistUrl}" target="_blank" rel="noopener noreferrer">Gist: ${gistUrl}</a></p>`;
  }
}

function rehypeGist() {
  return async (tree: any) => {
    const tasks: Promise<void>[] = [];

    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;

      // 1. Bloco de código: ```gist usuario/id (padrão)
      if (node.tagName === 'pre') {
        const code = node.children?.find((c: any) => c.tagName === 'code');
        if (code?.properties?.className?.includes('language-gist')) {
          const text = code.children?.map((c: any) => c.value || '').join('').trim();
          tasks.push(
            fetchGist(text).then((html) => {
              if (html) parent.children[index] = { type: 'raw', value: html };
            })
          );
        }
      }

      // 2. Tag <script src="https://gist.github.com/..."> (portabilidade)
      if (node.tagName === 'script' && typeof node.properties?.src === 'string' && node.properties.src.includes('gist.github.com')) {
        if (parent.tagName === 'p') parent.tagName = 'div';
        tasks.push(
          fetchGist(node.properties.src).then((html) => {
            if (html) parent.children[index] = { type: 'raw', value: html };
          })
        );
      }
    });

    await Promise.all(tasks);
  };
}

function rehypeTerminalWrapper() {
  return (tree: any) => {
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (!parent || index === undefined) return;
      if (node.tagName !== 'pre') return;

      const codeNode = node.children?.find((child: any) => child.tagName === 'code');
      if (!codeNode) return;

      const classes = codeNode.properties?.className || [];

      // Ignorar se for matemática ou gist
      if (
        classes.includes('language-math') ||
        classes.includes('language-latex') ||
        classes.includes('language-gist')
      ) {
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
            children: [codeNode],
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
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeGist)
  .use(rehypeHighlight)
  .use(rehypeTerminalWrapper)
  .use(rehypeKatex, { output: 'htmlAndMathml' })
  .use(rehypeStringify, { allowDangerousHtml: true });

async function MdToHTML({ text }: { text: string }) {
  let htmlText = '';

  try {
    htmlText = String(await processor.process(text));
  } catch (e) {
    console.error('Error processing markdown:', e);
  }

  return (
    <div>
      <input type="checkbox" id="h2-toggle" className="hidden" />
      <div className="markdown-body text-white" dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
}

export default MdToHTML;
