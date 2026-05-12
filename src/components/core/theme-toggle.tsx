"use client"

import * as React from "react"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type Props = {
    // true hanya saat navbar transparan di atas hero gelap (belum di-scroll)
    transparent?: boolean
}

export function ThemeToggle({ transparent = false }: Props) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
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
        >
            {themes.map((t) => {
                const Icon = t.icon
                const isActive = (theme || "system") === t.value
                return (
                    <ToggleGroupItem
                        key={t.value}
                        value={t.value}
                        aria-label={`${t.label} theme`}
                        title={`${t.label} theme`}
                        className={cn(
                            transparent
                                ? "text-white! hover:text-white!"
                                : "text-foreground! hover:text-foreground!",
                            isActive && (transparent ? "bg-white/20!" : "bg-accent/15!")
                        )}
                    >
                        <Icon size={16} />
                    </ToggleGroupItem>
                )
            })}
        </ToggleGroup>
    )
}
