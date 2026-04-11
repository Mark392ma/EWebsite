import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type MainNavItem, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Banknote, BarChart, Bell, BookOpen, CreditCard, File, Folder, FolderArchive, LayoutGrid, Mail, MessageSquare, Receipt, Settings, Tag, User, User2 } from 'lucide-react';
import AppLogo from './app-logo';
import { FeesNav } from './collapse-nav';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Students',
        url: '/students',
        icon: User2,
    },
    {
        title: 'Reports',
        url: '/reports',
        icon: BarChart,
    },

];

const feeManagementLink: MainNavItem[] = [
    {
        title: 'Fees Management',
        icon: Banknote,
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
                url: '/fee-management/fees-reminder',
                icon: Bell,
            },
        ]
    }
]

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: MessageSquare,
    },
    {
        title: 'Notifications',
        url: '/notifications',
        icon: Mail,
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
