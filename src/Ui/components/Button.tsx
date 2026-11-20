
import { cn } from "@/libs/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline" | "default"
}

export default function Button({ variant = "default", className, ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors"

  const variants: Record<string, string> = {
    default: "bg-white text-black hover:bg-gray-200",
    ghost: "bg-transparent text-black hover:bg-black/5",
    outline: "border border-black/10 text-black hover:bg-black/5",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  )
}
