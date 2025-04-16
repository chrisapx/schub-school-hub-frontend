
import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface DrawerProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const Drawer = ({
  children,
  isOpen,
  onClose,
  title,
  subtitle,
  size = "md"
}: DrawerProps) => {
  const [isClosing, setIsClosing] = React.useState(false)
  const drawerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose()
      }
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleOutsideClick)

    // Lock body scroll when drawer is open
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleOutsideClick)
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300) // Match animation duration
  }

  if (!isOpen && !isClosing) return null

  // Size mapping
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-screen-lg"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-sm">
      <div
        ref={drawerRef}
        className={cn(
          "h-full flex flex-col bg-background border-l border-border shadow-lg",
          sizeClasses[size],
          "w-full overflow-hidden",
          isClosing ? "slide-out-drawer" : "slide-in-drawer"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export { Drawer }
