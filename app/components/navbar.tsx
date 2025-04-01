"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "../contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Film, Calendar, LogOut, List, Menu } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const closeSheet = () => {
    setIsOpen(false)
  }

  const navItems = [
    {
      name: "Generate Showtimes",
      path: "/showtime-generator",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      name: "View Showtimes",
      path: "/showtimes",
      icon: <List className="h-4 w-4" />,
    },
    {
      name: "Manage Movies",
      path: "/movies",
      icon: <Film className="h-4 w-4" />,
    },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/showtime-generator">
              <span className="text-xl font-bold">Showtime App</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button variant={isActive(item.path) ? "default" : "ghost"} className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button variant="ghost" onClick={logout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path} onClick={closeSheet}>
                      <Button
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className="w-full justify-start flex items-center gap-2"
                      >
                        {item.icon}
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      logout()
                      closeSheet()
                    }}
                    className="w-full justify-start flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

