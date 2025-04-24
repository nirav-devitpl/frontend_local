import { SideLink } from "@/models/sidelinks";
import {
  IconCalendar,
  IconCalendarDue,
  IconLayoutDashboard,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export default function useSidelinks() {
  const { t } = useTranslation();

  const sidelinks: SideLink[] = [
    {
      title: t("SIDEBAR.DASHBOARD"),
      href: "/",
      label: "",
      icon: <IconLayoutDashboard size={20} />,
    },
    {
      title: t("SIDEBAR.CHANNEL_MANAGER"),
      href: "/channel-manager",
      label: "",
      icon: <IconCalendarDue size={20} />,
    },
    {
      title: t("SIDEBAR.ROLE_MANAGER"),
      href: "/roles",
      label: "",
      icon: <IconCalendar size={20} />,
    }    
  ];

  return { sidelinks };
}
