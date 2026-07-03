import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type MainNavItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BarChart, Bell, BellIcon, CircleDollarSign, File, FolderArchive, GraduationCap, Home, Receipt, Send, Settings, Tag, User } from 'lucide-react';
import AppLogo from './app-logo';
import { FeesNav } from './collapse-nav';
import { AppSidebarActions } from './app-sidebar-actions';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
        size: 16,
    },
    {
        title: 'Student Accounts',
        url: '/students',
        icon: GraduationCap,
        size: 16,
    },
    {
        title: 'Reports',
        url: '/reports',
        icon: BarChart,
        size: 16,
    },

];

const feeManagementLink: MainNavItem[] = [
    {
        title: 'Fees Management',
        icon: CircleDollarSign,
        subItems: [
             {
                title: 'Fees Type',
                url: '/fee-management/fees-type',
                icon: Tag,
            },
            {
                title: 'Fees Group',
                url: '/fee-management/fees-group',
                icon: FolderArchive,
            },
            {
                title: 'Fees Setup',
                url: '/fee-management/fees-setup',
                icon: Settings,
            },
            {
                title: 'Fees Allocation',
                url: '/fee-management/fees-allocation',
                icon: User,
            },
            {
                title: 'Fees Invoice',
                url: '/fee-management/fees-invoice',
                icon: Receipt,
            },
            {
                title: 'Due Fees Invoice',
                url: '/fee-management/due-fees-invoice',
                icon: File,
            },
            {
                title: 'Fees Reminder',
                url: '/fee-management/fees-reminders',
                icon: Bell,
            },
        ]
    }
]

const footerNavItems: NavItem[] = [
    {
        title: 'Notifications',
        url: '/notifications',
        icon: BellIcon,
        size: 16,
    },
    {
        title: 'SMS/Email',
        url: '/notifications',
        icon: Send,
        size: 16,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <AppSidebarActions />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <FeesNav items={feeManagementLink}/>
            </SidebarContent>
            

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
