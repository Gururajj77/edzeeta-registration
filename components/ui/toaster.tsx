// components/ui/toaster.tsx
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={`
              ${props.className}
              group
              relative
              flex
              w-full
              items-start
              space-x-4
              overflow-hidden
              rounded-lg
              transition-all
              hover:shadow-xl
            `}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-lg font-semibold text-blue-600">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm font-medium text-gray-700 leading-relaxed">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Toast>
        )
      })}
      <ToastViewport 
        className="
          fixed 
          bottom-[20vh] 
          right-0 
          flex 
          flex-col 
          p-6 
          gap-3 
          w-full 
          md:max-w-[420px] 
          max-h-screen 
          z-50
        " 
      />
    </ToastProvider>
  )
}