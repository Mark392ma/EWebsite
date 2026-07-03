import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 overflow-hidden'>
            
            {/* Background Blur Effects */}
            <div className='absolute top-0 left-0 w-69 h-69 bg-white/40 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-69 h-69 bg-blue-400/20 blur-3xl rounded-full'></div>

            {/* Login Card */}
            <div className='absolute top-5 left-5 flex gap-3'>
                <div className='w-4 h-4 rounded-full bg-red-400'></div>
                <div className='w-4 h-4 rounded-full bg-yellow-400'></div>
                <div className='w-4 h-4 rounded-full bg-green-400'></div>
            </div>

            {children}
        </div>
        // <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        //     <div className="w-full max-w-sm">
        //         <div className="flex flex-col gap-8">
        //             <div className="flex flex-col items-center gap-4">
        //                 <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
        //                     <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
        //                         <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
        //                     </div>
        //                     <span className="sr-only">{title}</span>
        //                 </Link>

        //                 <div className="space-y-2 text-center">
        //                     <h1 className="text-xl font-medium">{title}</h1>
        //                     <p className="text-muted-foreground text-center text-sm">{description}</p>
        //                 </div>
        //             </div>
        //             {children}
        //         </div>
        //     </div>
        // </div>
    );
}
