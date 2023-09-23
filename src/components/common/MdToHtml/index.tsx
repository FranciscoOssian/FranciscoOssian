import React from 'react';
import { marked } from 'marked';
import './styles.scss';

function MdToHTML({ text }: { text: string }) {
  const htmlText = marked.parse(text);

  return (
    <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlText }} />
  );
}

export default MdToHTML;
