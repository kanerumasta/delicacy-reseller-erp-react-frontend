import React from "react";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { MdReceipt, MdDashboard } from "react-icons/md";
import { FaCubes, FaShoppingBag, FaChartBar } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { BiSolidCube } from "react-icons/bi";

export const adminSidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdDashboard />,
  },
  {
    title: "Inventory",
    icon: <FaCubes />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Inventory Items",
        path: "/inventory/items",
        icon: <BiSolidCube />,
        cName: "sub-nav",
      },
      {
        title: "Delicacies",
        path: "/inventory/delicacies",
        icon: <IoFastFood />,
      },
    ],
  },
  {
    title: "Requisition",
    icon: <MdReceipt />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "All Requisitions",
        path: "/requisitions/all",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
      {
        title: "My",
        path: "/requisitions/my",
        icon: <IoFastFood />,
      },
    ],
  },
  {
    title: "Purchasing",
    icon: <FaShoppingBag />,
    subNav: [
      {
        title: "Purchase Orders",
        path: "/purchasing/purchase-orders",
        icon: <IoIcons.IoIosPaper />,
        cName: "sub-nav",
      },
    ],
  },
  {
    title: "Staff",
    path: "/staff",
    icon: <FaShoppingBag />,
  },
];
export const staffSidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdDashboard />,
  },
  {
    title: "Inventory",
    icon: <FaCubes />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Delicacies",
        path: "/inventory/delicacies",
        icon: <IoFastFood />,
      },
    ],
  },
  {
    title: "Requisition",
    icon: <MdReceipt />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "My",
        path: "/requisitions/my",
        icon: <IoFastFood />,
      },
    ],
  },
  {
    title: "Purchasing",
    path: "/purchasing",
    icon: <FaShoppingBag />,
  },
];
