import React from 'react'
import Account from './account/Account';
import Profile from './profile/Profile';
import List from './list/List';
import Posts from './posts/Posts';
import Details from './details/Details';
import Home from './home/Home';

const MainContent = ({ page }) => {
  const renderContent = () => {
    switch (page) {
      case "Account":
        return <Account />;
      case "Profile":
        return <Profile />;
      case "List":
        return <List />;
      case "Post":
        return <Posts />;
      case "Details":
        return <Details />;
      case "Home":
        return <Home />;

      default:
        return <p>Content for {page} goes here...</p>;
    }
  };
  return <div className="main-content">{renderContent()}</div>;

}

export default MainContent
