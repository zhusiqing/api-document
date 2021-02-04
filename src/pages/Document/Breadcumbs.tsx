import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './Breadcumbs.scss';

type TypeBreadcrumbNameMap = {
  [key: string]: string
};
const breadcrumbNameMap: TypeBreadcrumbNameMap = {
  '/document': '版本列表'
};

const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url: string = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url] || '版本详情'}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Breadcrumb className="breadcumb">
      {extraBreadcrumbItems}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
