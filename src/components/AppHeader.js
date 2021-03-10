import { Input, Menu } from "antd";
import "./AppHeader.scss";
import LogoImage from "assets/logo.png";

function AppHeader() {
  return (
    <div className="header">
      <h1 className="page-title">
        <img src={LogoImage} alt="logo" />
      </h1>
      <div className="search">
        <Input.Search />
      </div>
      <div className="topnav">
        <Menu mode="horizontal">
          <Menu.Item>메뉴1</Menu.Item>
          <Menu.Item>메뉴2</Menu.Item>
          <Menu.Item>메뉴3</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;
