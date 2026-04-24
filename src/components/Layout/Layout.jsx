import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Layout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-content">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
