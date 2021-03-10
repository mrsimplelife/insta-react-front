import "./AppLayout.scss";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import StoryList from "./StoryList";
import SuggestionList from "./SuggestionList";

function AppLayout({ children }) {
  return (
    <div className="app">
      <AppHeader />
      <div className="contents">{children}</div>
      <div className="sidebar">
        <StoryList style={{ marginBottom: "1rem" }} />
        <SuggestionList />
      </div>
      <AppFooter />
    </div>
  );
}

export default AppLayout;
