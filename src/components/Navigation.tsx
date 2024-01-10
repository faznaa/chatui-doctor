import React from 'react'
import {
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    ChatBubbleLeftIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
  } from '@heroicons/react/24/outline'

const navigation = [


    { name: 'Dashboard', href: '#', icon: HomeIcon, current: false },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Chat', href: '#', icon: ChatBubbleLeftIcon, current: true },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
  ]

export default function Navigation() {
  return (
    <div>
        {navigation.map((item) => (
            <a
            key={item.name}
            href={item.href}
            className={`${
              item.current ? 'text-white' : 'text-gray-400 '
            } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
            aria-current={item.current ? 'page' : undefined}
          >
            <item.icon
              className={`mr-4 flex-shrink-0 h-6 w-6 ${
                item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
              }`}
              aria-hidden="true"
            />
            {/* {item.name} */}
          </a>
        ))}
    </div>
  )
}
