"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, CheckSquare, Settings, Menu, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { isLoggedIn, logout } = useAuth()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const routes = [
    {
      name: "Profile",
      path: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Tasks",
      path: "/",
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleSidebar}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Todo App</h1>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {routes.map((route) => (
              <Link key={route.path} href={route.path} onClick={() => setIsOpen(false)}>
                <div
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors",
                    pathname === route.path ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  {route.icon}
                  <span className="ml-3">{route.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

