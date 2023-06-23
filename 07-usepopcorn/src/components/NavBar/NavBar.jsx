import Logo from "./Logo";
const NavBar = function ({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;
