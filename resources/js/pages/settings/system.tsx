import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';


import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage System settings',
        href: '/settings/system',
    },
];

export default function System({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage system settings" />

            <SettingsLayout>
                <div className="space-y-6 max-w-full">
                    <HeadingSmall title="Update Your System Settings" />
                    <form onSubmit={submit} className="flex flex-col sm:flex-row sm:flex-wrap">
                        <div className='space-y-6 w-full sm:w-1/2 pr-6'>
                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Name of School:</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="Katana Ngala Secondary School"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Academic Year:</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="2025-2026"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>School Acronym:</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="KTN"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Phone:</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="+254712300209"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="email" className='text-gray-700'>School Email:</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="email" className='text-gray-700'>School Address:</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                    placeholder="School address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>This Term Ends:</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="27/3/2026"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Next Term Starts:</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="27/4/2026"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div>
                                    <p className="mt-2 text-sm text-neutral-800">
                                        Your email address is unverified.
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
                                        >
                                            Click here to re-send the verification email.
                                        </Link>
                                    </p>

                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            A new verification link has been sent to your email address.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <div className='space-y-6 border-l-0 space-x-2 pl-0 border-blue-500 w-full sm:w-1/2 sm:pl-4 sm:border-l-2'>
                            <h3 className="mb-4 text-base font-medium border-b mt-10 sm:mt-0 border-gray-300">Fees per Term</h3>
                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Creche / Daycare</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="8000"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Pre-Primary</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="1500"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Primary</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="10000"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Junior Secondary</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="25000"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="items-center grid md:grid-cols-2 gap-2 sm:grid-cols-1 lg:grid-cols-2 xl-grid-cols-2">
                                <Label htmlFor="name" className='text-gray-700'>Senior Secondary</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="28000"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>

                        <div className="flex items-center tet-center gap-4 col-span-2 w-full mt-4">
                            <Button disabled={processing} className='w-[200px]'>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
               
            </SettingsLayout>
        </AppLayout>
    );
}
