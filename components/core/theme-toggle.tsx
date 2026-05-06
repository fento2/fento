"use client"

import * as React from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useLayoutEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const themes = [
        { value: "light", icon: Sun, label: "Light" },
        { value: "dark", icon: Moon, label: "Dark" },
        { value: "system", icon: Monitor, label: "System" },
    ]

    return (
        <ToggleGroup
            type="single"
            value={theme || "system"}
            onValueChange={setTheme}
            className="text-white"
        >
            {themes.map((t) => {
                const Icon = t.icon
                return (
                    <ToggleGroupItem
                        key={t.value}
                        value={t.value}
                        aria-label={`${t.label} theme`}
                        title={`${t.label} theme`}
                    >
                        <Icon size={16} />
                    </ToggleGroupItem>
                )
            })}
        </ToggleGroup>
    )
}
