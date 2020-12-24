import { useEffect, useState } from 'react';
import MD from 'markdown-it';
import hljs from 'highlight.js';
import Clipboard from 'clipboard';
import { notification } from 'antd';
import './Markdown.scss';

interface InterfaceProp {
  value: string
};

const md = new MD({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><span class="lang">${lang}</span><a title="点击复制内容" class="copy copy-btn" href="javascript:void(0);">copy</a><code>${hljs.highlight(lang, str, true).value}</code><span class="copy-text" style="display:none;">${str}</span></pre>`;
      } catch (_) {};
    };
    return '<pre class="hljs"><code></code></pre>';
  }
});





const MarkdownComponent = (props: InterfaceProp) => {
  const [detail, updateDetail] = useState('')
  useEffect(() => {
    if (props.value) {
      const clipboard = new Clipboard('.copy-btn', {
        text: function(e) {
          const str = e.parentElement?.lastElementChild?.textContent || ''
          return str;
        }
      });
      clipboard.on('success', e => {
        notification.success({
          message: '复制成功',
          key: 'cpoy'
        });
      });
    };
    updateDetail(md.render(props.value));
  }, [props.value]);
  return <div className="markdown-content" dangerouslySetInnerHTML={{__html: detail}}></div>;
};

export default MarkdownComponent;
