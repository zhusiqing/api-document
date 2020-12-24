import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getTagList, InterfacePage, InterfaceTag } from '@services/document';
import './index.scss';

const Document = () => {
  const initTagList: InterfaceTag[] = [];
  const [tagList, updateTagList] = useState(initTagList);
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
  });
  return (
    <div className="document-page">
      <h3>版本列表：</h3>
      <ul>
        {tagList.map((el:InterfaceTag) => (
          <li key={el._id} onClick={() => {goToDocument(el._id);}}>
            { el.name }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Document;
