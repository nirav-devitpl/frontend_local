import { JSX } from "react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export interface HeadMenu {
  title: string;
  label?: string;
  href: string;
}

export interface HeadLink extends HeadMenu {
  sub?: HeadMenu[];
}
