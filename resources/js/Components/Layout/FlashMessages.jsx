import React, { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { toast } from 'react-hot-toast'

// FlashMessages 组件 - 优化错误处理
const FlashMessages = React.memo(() => {
    const { flash, errors } = usePage().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                duration: 4000,
                position: 'top-right',
            })
        }
        if (flash.error) {
            toast.error(flash.error, {
                duration: 5000,
                position: 'top-right',
            })
        }

        // 处理验证错误
        if (errors && Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).flat()
            errorMessages.forEach(message => {
                toast.error(message, {
                    duration: 5000,
                    position: 'top-right',
                })
            })
        }
    }, [flash.success, flash.error, errors])

    return null
})

FlashMessages.displayName = 'FlashMessages'

export default FlashMessages
