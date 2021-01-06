import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getDocumentList } from '@services/document';
import Markdown from './Markdown';
import './Detail.scss';
interface InterfaceProps {
  id: string
}
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

const DocumentDetail: React.FC<RouteComponentProps<InterfaceProps>> = ({ match }) => {
  const [detail, updateDetail] = useState('');
  const id = match.params?.id;
  const fetchDetail = async (id: string) => {
    const params = {
      _id: id
    };
    const { success, data = [] } = await getDocumentList(params);
    if (success) {
      const list: InterfaceMarkdownData[] = data || [];
      const mdStr = list.map(el => transformMarkdown(el)).join('\n');
      updateDetail(mdStr);
    };
  };

  useEffect(() => {
    fetchDetail(id)
  }, [id]);

  return (
    <div className="document-detail-page">
      <Markdown value={detail}></Markdown>
    </div>

  )
};

export default DocumentDetail;
