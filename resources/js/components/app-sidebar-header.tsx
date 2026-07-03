import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell, Calendar } from 'lucide-react';
import DarkMode from './darkmode-btn';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="border-sidebar-border/50 flex justify-between h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div>
                <SidebarTrigger className="-ml-1" />
                <input type="text" placeholder='Search for adm no and contact no' className='border p-2 rounded-lg w- full'/>
            </div>
            <div className='flex items-center gap-1'>
                <span className='border p-2 rounded-lg bg-white/70 font-bold flex items-center gap-2'><Calendar size={16} /> Saturday, 20 Jun 2026</span>
                <DarkMode/>
                <button className='p-2 bg-white/80 rounded-lg'><Bell size={16} /> </button>
                <span className='rounded-full text-center p-2 bg-purple-200'>M</span>
            </div>
            {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
        </header>
    );
}
