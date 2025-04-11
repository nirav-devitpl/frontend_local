import { useLocation } from "react-router";

export default function useCheckActiveNav() {
  const { pathname } = useLocation();

  const checkActiveNav = (nav: string, subLink: boolean = false) => {
    if (subLink) {
      const pathArray = pathname.split("/").filter((item) => item !== "");
      const navArray = nav.split("/").filter((item) => item !== "");
      if (pathArray.length === 1 && navArray.length === 1 && pathname !== "/") {
        return navArray[0] === pathArray[0];
      } else if (pathArray.length > 1 && navArray.length > 1) {
        return navArray[1] === pathArray[1];
      } else return false;
    } else {
      const pathArray = pathname.split("/").filter((item) => item !== "");

      if (nav === "/" && pathArray.length < 1) return true;

      return pathArray.includes(nav.replace(/^\//, ""));
    }
  };

  return { checkActiveNav };
}
