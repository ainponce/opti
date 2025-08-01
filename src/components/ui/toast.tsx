import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Toast, useToast } from '@/hooks/use-toast'

interface ToastProps {
    toast: Toast
    onRemove: (id: string) => void
}

const ToastItem = ({ toast, onRemove }: ToastProps) => {
    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-400" />
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-400" />
            case 'info':
                return <Info className="w-5 h-5 text-blue-400" />
            default:
                return <Info className="w-5 h-5 text-gray-400" />
        }
    }

    const getBackgroundColor = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-900/90 border-green-700'
            case 'error':
                return 'bg-red-900/90 border-red-700'
            case 'info':
                return 'bg-blue-900/90 border-blue-700'
            default:
                return 'bg-gray-900/90 border-gray-700'
        }
    }

    return (
        <div
            className={`${getBackgroundColor()} border rounded-lg p-4 shadow-lg backdrop-blur-sm animate-in`}
        >
            <div className="flex items-start gap-3">
                {getIcon()}
                <div className="flex-1 text-sm text-gray-100">
                    {toast.message}
                </div>
                <button
                    onClick={() => onRemove(toast.id)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export const ToastContainer = () => {
    const { toasts, removeToast } = useToast()

    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>
    )
} 