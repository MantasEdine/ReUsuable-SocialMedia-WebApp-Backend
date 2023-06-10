import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.NavBar}>
      <div className={style.fullContainer}>
        <div className={style.div01}>
          <h1>SocialMedia</h1>
          <input
            type="text"
            placeholder="Search...."
            className={style.navbarInput}
          />
        </div>
        <div className={style.div02}>
          <span className={style.navSpan}>DarkMode</span>
          <span className={style.navSpan}>messenger</span>
          <span className={style.navSpan}>notifications</span>
          <select name="cars" id="cars" className={style.options}>
            <option value="Fake Man">Fake Man</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
