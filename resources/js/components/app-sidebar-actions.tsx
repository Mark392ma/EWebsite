import { ClipboardCheckIcon, Plus, UserPlus2 } from 'lucide-react';

export function AppSidebarActions() {
    return (
        <header className="border-sidebar-border/50 p-2 rounded-lg shrink-0 border  bg-[#f2f2f2] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <h3 className='font-bold mb-2'>Quick Actions</h3>
            <div>
                <button className='flex items-center gap-2 border bg-white mb-4 py-2 px-4 w-full rounded-lg font-bold'><Plus size={24} className='bg-green-700 rounded-full w-8 h-8 text-white/80' /> New Payment</button>
                <div className="flex items-center gap-2 justify-between w-full">
                    <button className='border bg-white p-4 rounded-lg flex text-[9px] flex-col items-center'><UserPlus2 size={24} /> Add Student</button>
                    <button className='border bg-white p-4 rounded-lg flex text-[9px] flex-col items-center'><ClipboardCheckIcon size={24} /> Generate Reciept</button>
                </div>
            </div>
            
        </header>
    );
}
