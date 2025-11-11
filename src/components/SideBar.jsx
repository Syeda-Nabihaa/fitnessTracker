"use client";
import React, { Children, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./aceternityUi/SideBarUi";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconRun,
  IconChefHatFilled,
  IconChartLine,
  IconSalad,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/Utils";
import { Outlet } from "react-router-dom";

export function SidebarComponent() {
  const links = [
    {
      label: "Dashboard",
      href: "/home",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Workout",
      href: "/workout",
      icon: (
        <IconRun className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
     {
      label: "Nutrition",
      href: "/nutrition",
      icon: (
        <IconSalad className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
     {
      label: "Progress",
      href: "/progress",
      icon: (
        <IconChartLine className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden  border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        // for your use case, use `h-screen` instead of `h-[60vh]`
        "h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <img
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-auto p-6 bg-white">
        <Outlet />
      </div>
 
    </div>
  );
}
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
   
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white text-2xl">
        Fitness Tracker
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div
        className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white text-center font-bold" > 
        FT
        </div>
    </a>
  );
};

