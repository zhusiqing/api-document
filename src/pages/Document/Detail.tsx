import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getDocumentList } from '@services/document';
import MD from 'markdown-it';
import hljs from 'highlight.js';
import Clipboard from 'clipboard';
import './Detail.scss';
import { notification } from 'antd';
interface InterfaceProps {
  id: string
}
declare global {
  interface Window { copyContent: (e: any) => void }
}
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

interface InterfaceRequestList {
  title: string
  type: string
  require: boolean
  defaultValue?: string
  content?: string
};
interface InterfaceMarkdownData {
  method: string
  method_des: string
  url: string
  title: string
  tag: string
  requestList?: InterfaceRequestList[]
  responseSuccess?: string
  responseError?: string
}
const transformMarkdown = (data: InterfaceMarkdownData) :string => {
  const reqList: InterfaceRequestList[] = data.requestList || [];
  const reqListStr = reqList.map(el => `|${el.title}|${el.type}|${el.require}|${el.defaultValue}|${el.content}|` ).join('\n');
  const str = `
  ## ${data.title}

  - **url**【${data.method_des}】${data.url}

  |参数|类型|是否必填|默认值|备注|
  |-|-|-|-|-|
  ${reqListStr}

  - **成功响应**

  \`\`\`json
  ${data.responseSuccess}
  \`\`\`

  - **失败响应**

  \`\`\`json
  ${data.responseError}
  \`\`\`
  `;
  return str;
}
const DocumentDetail = ({ match }: RouteComponentProps<InterfaceProps>) => {
  const initDetail: any = {}
  const [detail, updateDetail] = useState(initDetail);
  const id = match.params?.id;
  const fetchDetail = async () => {
    const params = {
      _id: id
    };
    const { success, data = [] } = await getDocumentList(params);
    if (success) {
      const list: InterfaceMarkdownData[] = data || [];
      const mdStr = list.map(el => transformMarkdown(el)).join('\n');
      updateDetail(md.render(mdStr));
    };
  };

  window.copyContent = e => {
    console.log(e);
  }
  useEffect(() => {
    fetchDetail()
  }, ['1']);
  useEffect(() => {
    if (detail) {
      const clipboard = new Clipboard('.copy-btn', {
        text: function(e) {
          const str = e.parentElement?.lastElementChild?.textContent || ''
          return str;
        }
      })
      clipboard.on('success', e => {
        notification.success({
          message: '复制成功',
          key: 'cpoy'
        })
      })
    }

  }, [detail])
  return (
    <div className="document-detail-page markdown-content" dangerouslySetInnerHTML={{__html: detail}}></div>

  )
};

export default DocumentDetail;
