import { UserNav } from "./user-nav";

/**
 * @memberof common
 * @name Header
 * @description The `Header` component renders a dynamic navigation header for the application.
 * @returns {JSX.Element} - The rendered `Header` component.
 */
function Header() {
  return (
      <div className="ml-auto flex items-center space-x-1 gap-3">
        <UserNav />
      </div>
  );
}

export default Header;
