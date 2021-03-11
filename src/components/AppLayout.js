import "./AppLayout.scss";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

function AppLayout({ children, sidebar }) {
  return (
    <div className="app">
      <AppHeader />
      <div className="contents">{children}</div>
      <div className="sidebar">{sidebar}</div>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
