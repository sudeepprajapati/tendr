"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    // Ensure component is mounted before rendering to avoid hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                disabled
                className="cursor-not-allowed opacity-50"
            >
                <Sun className="size-[1.2rem]" />
            </Button>
        )
    }

    const themes = [
        {
            value: "light",
            label: "Light",
            icon: Sun,
        },
        {
            value: "dark",
            label: "Dark",
            icon: Moon,
        },
        {
            value: "system",
            label: "System",
            icon: Monitor,
        },
    ] as const

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    {theme === "light" && <Sun className="size-[1.2rem]" />}
                    {theme === "dark" && <Moon className="size-[1.2rem]" />}
                    {theme === "system" && <Monitor className="size-[1.2rem]" />}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {themes.map(({ value, label, icon: Icon }) => (
                    <DropdownMenuCheckboxItem
                        key={value}
                        checked={theme === value}
                        onCheckedChange={() => setTheme(value)}
                        className="flex items-center gap-2"
                    >
                        <Icon className="size-4" />
                        <span>{label}</span>
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
