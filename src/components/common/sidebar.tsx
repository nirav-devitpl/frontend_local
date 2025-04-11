import { useEffect, useState } from "react";
import { IconChevronsLeft, IconMenu2, IconX } from "@tabler/icons-react";
import { Layout, LayoutHeader } from "./layout";
import { Button } from "../custom/button";
import Nav from "./nav";
import { cn } from "@/lib/utils";
import useSidelinks from "@/hooks/use-sidelinks";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * @interface SidebarProps
 * @property {boolean} isCollapsed - Indicates whether the sidebar is in a collapsed state (showing icons only) or expanded (showing full navigation links).
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsCollapsed - Function to update the collapsed state of the sidebar.
 * @property {string} [className] - Optional additional class names for styling the sidebar.
 */
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @memberof common
 * @name Sidebar
 * @description The `Sidebar` component renders a responsive, collapsible navigation sidebar. It includes a logo, navigation links, and a toggle button for expanding or collapsing the sidebar.
 * @interface SidebarProps props - The properties to be passed to the component.
 * @property {boolean} isCollapsed - Indicates whether the sidebar is in a collapsed state (showing icons only) or expanded (showing full navigation links).
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setIsCollapsed - Function to update the collapsed state of the sidebar.
 * @property {string} [className] - Optional additional class names for styling the sidebar.
 * @returns {JSX.Element} - The rendered Sidebar component.
 */
export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: Readonly<SidebarProps>) {
  const [navOpened, setNavOpened] = useState(false);
  const { sidelinks } = useSidelinks();

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navOpened]);

  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          isCollapsed ? "md:w-14" : "md:w-64"
        } bg-background dark:bg-background`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
        } w-full bg-black md:hidden`}
      />

      <Layout>
        {/* Header */}
        <LayoutHeader className="sticky top-0 justify-between px-4 py-3 shadow md:px-4 bg-inherit dark:bg-accent">
          <div className={`flex items-center ${!isCollapsed ? "gap-2" : ""}`}>
            <div
              className={`${isCollapsed ? "visible w-auto" : "invisible w-0"}`}
            >
              <img
                src="/category-small.png"
                alt="Deals"
                className="mb-1 max-w-full w-10"
              />
            </div>
            <div
              className={`flex flex-col justify-end truncate ${
                isCollapsed ? "invisible w-0" : "visible w-auto"
              }`}
            >
              <Link to={"/"}>
                <img src="/category.png" alt="Deals" className="mb-1 h-[29px]" />
              </Link>
            </div>
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </LayoutHeader>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`h-full flex-1 overflow-auto ${
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sidelinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-3 top-4 hidden rounded-full md:inline-flex h-6 w-6"
        >
          <ArrowLeft
            className={`size-5 ${isCollapsed ? "rotate-180" : ""}`}
            size={14}
          />
        </Button>
      </Layout>
    </aside>
  );
}
