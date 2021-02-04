import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getTagList, InterfacePage, InterfaceTag } from '@services/document';
import './index.scss';

const Document: React.FC = () => {
  const [tagList, updateTagList] = useState<InterfaceTag[]>([]);
  const history = useHistory()

  const fetchTagList = async (params?:InterfacePage) => {
    const { success, data } = await getTagList(params);
    if (success) {
      const { list = [] } = data;
      updateTagList(list);
    };
  };
  const goToDocument = (id: string) => {
    history.push(`/document/${id}`);
  };
  useEffect(() => {
    fetchTagList();
  }, []);
  return (
    <div className="document-page">
      <h3>版本列表：</h3>
      {
        tagList.length
          ? (
            <ul>
              {
                tagList.map((el:InterfaceTag) => (
                  <li key={el._id} onClick={() => {goToDocument(el._id);}}>
                    { el.name }
                  </li>
                ))
              }
            </ul>
          )
          : (
            <p className="empty">暂无数据</p>
          )
      }
    </div>
  );
};

export default Document;
