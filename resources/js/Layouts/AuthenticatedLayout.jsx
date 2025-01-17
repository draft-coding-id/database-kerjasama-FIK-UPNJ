import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    List,
    Card,
    ListItem,
    Typography,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    UserGroupIcon,
    UserCircleIcon,
    DocumentPlusIcon,
    ArchiveBoxArrowDownIcon,
    HomeIcon,
} from "@heroicons/react/24/solid";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { NavbarDashboard } from "@/Components/Dashboard/NavbarDashboard";
import { CiBoxList } from "react-icons/ci";

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;

    const LIST_ITEM_STYLES =
        "select-none hover:bg-orange-700 focus:bg-orange-700 active:bg-orange-700 hover:text-white focus:text-white active:text-white data-[selected=true]:text-white";

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Card className=" w-full max-w-[16rem] p-3 shadow-md rounded-none">
                <div className="mb-2 flex items-center gap-4 p-4">
                    <Link href="/">
                        <ApplicationLogo className="block h-12 w-auto fill-current text-gray-800" />
                    </Link>
                </div>
                <hr className="my-2 border-gray-200" />
                <List>
                    <Link href={route("dashboard")}>
                        <ListItem
                            className={`${LIST_ITEM_STYLES} ${
                                route().current("dashboard")
                                    ? "bg-orange-700 text-white"
                                    : ""
                            }`}
                        >
                            <ListItemPrefix>
                                <HomeIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Dashboard
                        </ListItem>
                    </Link>
                    {/* <Link href={route('agreementarchives.index', 1)}>
                        <ListItem className={`${LIST_ITEM_STYLES} ${route().current('agreementarchives.index') || route().current('agreementarchives.view') ? 'bg-orange-700 text-white' : ''}`}>
                            <ListItemPrefix>
                                <ArchiveBoxArrowDownIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Agreement Archives
                        </ListItem>
                    </Link> */}
                    {/* {user.is_admin ? (
                    <Link href={route('agreementarchives.create')}>
                        <ListItem className={`${LIST_ITEM_STYLES} ${route().current('agreementarchives.create') ? 'bg-orange-700 text-white' : ''}`}>
                            <ListItemPrefix>
                                <DocumentPlusIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            New Entry
                        </ListItem>
                    </Link>
                    ) : null} */}
                    {user.is_admin ? (
                        <Link href={route("list-master.index")}>
                            <ListItem
                                className={`${LIST_ITEM_STYLES} ${
                                    route().current("list-master.index")
                                        ? "bg-orange-700 text-white"
                                        : ""
                                }`}
                            >
                                <ListItemPrefix>
                                    <CiBoxList />
                                </ListItemPrefix>
                                List Master
                            </ListItem>
                        </Link>
                    ) : null}
                    {user.is_admin ? (
                        <Link href={route("users.index")}>
                            <ListItem
                                className={`${LIST_ITEM_STYLES} ${
                                    route().current("users.index")
                                        ? "bg-orange-700 text-white"
                                        : ""
                                }`}
                            >
                                <ListItemPrefix>
                                    <UserGroupIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                User Management
                            </ListItem>
                        </Link>
                    ) : null}
                </List>
                <hr className="my-2 border-gray-200" />
                <List>
                    <Link href={route("profile.edit")}>
                        <ListItem
                            className={`${LIST_ITEM_STYLES} ${
                                route().current("profile.edit")
                                    ? "bg-orange-700 text-white"
                                    : ""
                            }`}
                        >
                            <ListItemPrefix>
                                <UserCircleIcon className="h-6 w-6" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                    </Link>
                    <Link href={route("logout")} method="post" as="button">
                        <ListItem className={LIST_ITEM_STYLES}>
                            <ListItemPrefix>
                                <ArrowLeftStartOnRectangleIcon
                                    strokeWidth={2.5}
                                    className="h-5 w-5"
                                />
                            </ListItemPrefix>
                            Sign Out
                        </ListItem>
                    </Link>
                </List>

                <Typography
                    variant="small"
                    className="font-medium text-orange-700 flex justify-center mt-auto"
                >
                    2024 © UPNVJ
                </Typography>
            </Card>
            <div className="flex-1">
                <NavbarDashboard />

                <main className="bg-[#F4F5F9] min-h-[90vh]">{children}</main>
            </div>
        </div>
    );
}
