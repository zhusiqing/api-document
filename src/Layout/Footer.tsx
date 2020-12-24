export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>&copy;{year} liaomo 文档查看</p>
    </footer>
  );
};
