import React from "react";

import {CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon} from "@heroicons/react/24/outline";
const  classNames = (...classes) => classes.filter(Boolean).join(' ');

const ChatPanel = () => {

    const navigation = [
        { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
        { name: 'Team', href: '#', icon: UsersIcon, current: false },
        { name: 'Projects', href: '#', icon: FolderIcon, current: false },
        { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
        { name: 'Documents', href: '#', icon: InboxIcon, current: false },
        { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
    ]

    return (
        <div className="flex flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-grow flex-col overflow-y-auto bg-indigo-700 pt-5">
                <div className="flex flex-shrink-0 items-center px-4">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                        alt="Your Company"
                    />
                </div>
                <div className="mt-5 flex flex-1 flex-col">
                    <nav className="flex-1 space-y-1 px-2 pb-4">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600',
                                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                                )}
                            >
                                <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-indigo-300" aria-hidden="true" />
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default ChatPanel;