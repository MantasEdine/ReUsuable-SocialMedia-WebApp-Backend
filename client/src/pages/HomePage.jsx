import style from "./HomePage.module.css";
import ProfilePage from "./ProfilePage";
import Content from "./Content";
const HomePage = () => {
  return (
    <div className={style.homePage}>
      <ProfilePage />
      <Content />
    </div>
  );
};

export default HomePage;
