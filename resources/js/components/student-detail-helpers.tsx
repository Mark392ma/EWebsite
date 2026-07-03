import type { ReactNode } from 'react';

interface MenuItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
}

export function MenuItem({ icon, text, active }: MenuItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
        active ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-100'
      }`}
    >
      {icon}
      {text}
    </div>
  );
}

interface InfoProps {
  label: string;
  value: string;
}

export function Info({ label, value }: InfoProps) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium mt-1">{value}</p>
    </div>
  );
}
