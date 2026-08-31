"use client";

import { IconCalendarHeart, IconHelpCircle, IconHome, IconPhoto, IconTag } from "@tabler/icons-react";
import { useT } from "@/components/LanguageProvider";
import { NavBar } from "@/components/ui/tubelight-navbar";

/**
 * The five places worth a thumb on a phone. Five is the ceiling for a bottom
 * bar; past that the targets get too narrow to hit.
 *
 * Hidden from md up, where the header already carries the full menu.
 */
export default function BottomNav() {
  const t = useT();

  const items = [
    { name: t("bottomNav.home"), url: "/", icon: IconHome },
    { name: t("bottomNav.events"), url: "/weddings", icon: IconCalendarHeart, covers: ["/events"] },
    { name: t("bottomNav.pricing"), url: "/pricing", icon: IconTag },
    { name: t("bottomNav.gallery"), url: "/gallery", icon: IconPhoto },
    { name: t("bottomNav.help"), url: "/faqs", icon: IconHelpCircle },
  ];

  return <NavBar items={items} className="md:hidden" />;
}
