import style from "./ProfilePage.module.css";

const ProfilePage = () => {
  return (
    <div className={style.profilePage}>
      <div className={style.contentContainer}>
        <div className={style.section01}>
          <div className={style.subSection01}>
            <img src="../assets/profilePic.webp" alt="" />
            <div className={style.nameSubSection}>
              <span>Lola</span>
              <span>3 Friends</span>
            </div>
          </div>
          <div className={style.subSection02}></div>
        </div>
        <div className={style.section02}></div>

        <div className={style.section03}></div>

        <div className={style.section04}></div>
      </div>
    </div>
  );
};

export default ProfilePage;
