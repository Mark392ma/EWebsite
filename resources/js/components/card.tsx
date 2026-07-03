import { cn } from "@/lib/utils";
import React from "react";


const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
     ref={ref}
     className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
     {...props}>
    </div>
))

Card.displayName = "Card"


const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
     ref={ref}
     className={cn("flex flex-col space-y-1.5 p-6", className)}
     {...props}>
    </div>
))

CardHeader.displayName = "CardHeader"


const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
     ref={ref}
     className={cn("font-semibold leading-none tracking-tight", className)}
     {...props}>
    </div>
))

CardTitle.displayName = "CardTitle"


const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
     ref={ref}
     className={cn("text-sm text-muted-foreground", className)}
     {...props}>
    </div>
))

CardDescription.displayName = "CardDescription"


const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
     ref={ref}
     className={cn("p-6 pt-0", className)}
     {...props}>
    </div>
))

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
     ref={ref}
     className={cn("flex items-center p-6 pt-0", className)}
     {...props}>
    </div>
))

CardFooter.displayName = "CardFooter"

export { Card, CardTitle, CardHeader, CardFooter, CardDescription, CardContent}