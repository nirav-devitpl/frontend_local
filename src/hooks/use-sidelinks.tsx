import { SideLink } from "@/models/sidelinks";
import { Network } from "lucide-react";
import {
  IconBuildingWarehouse,
  IconCalendar,
  IconCalendarDue,
  IconClipboardText,
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
    },
    {
      title: t("SIDEBAR.INVENTORY"),
      href: "/inventory",
      label: "",
      icon: <IconBuildingWarehouse size={20} />,
    },
    {
      title: t("SIDEBAR.DATA_MANAGEMENT"),
      href: "/data-management",
      label: "",
      icon: <IconClipboardText size={20} />,
    },
    {
      title: t("SIDEBAR.CATEGORIES"),
      href: "/categories/list",
      label: "",
      icon: <Network size={20} />,
    },
    {
      title: t("SIDEBAR.CUSTOMER"),
      href: "/customer/list",
      label: "",
      icon: <Network size={20} />,
    },
  ];

  return { sidelinks };
}
