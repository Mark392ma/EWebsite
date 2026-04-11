import React from "react";
import * as LucideIcons from 'lucide-react';


interface Props{
    icon: keyof typeof LucideIcons;
    name: string;
    stat: string;
    description: string;
    border?: string;
}

const StatCard: React.FC<Props> = ({ icon, name, stat, description, border }) => {
    const IconComponent = LucideIcons[icon] as React.ComponentType<any>;
    return (
        <div className={`bg-white p-4 rounded-lg shadow-md ${border}`}>
            <div className="flex items-center">
                <IconComponent className="text-2xl text-blue-500 mr-2" />
                <h3 className="text-lg font-medium">
                    {name}
                </h3>
            </div>
            <p className="text-3xl font-bold mt-2">{stat}</p>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
    )
}

export default StatCard