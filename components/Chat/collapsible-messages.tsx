'use client'

import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { Separator } from '@radix-ui/react-separator'
import { cn } from '@/utils/server/google'
import { Button } from '../Global/button'

interface CollapsibleMessageProps {
  message: {
    id: string
    isCollapsed?: any
    component: React.ReactNode
  }
  isLastMessage?: boolean
}

export const CollapsibleMessage: React.FC<any> = ({
  message,
  isLastMessage = false
}) => {
  const [data] = useStreamableValue(message.isCollapsed)
  const isCollapsed = data ?? false
  const [open, setOpen] = useState(isLastMessage)

  useEffect(() => {
    setOpen(isLastMessage)
  }, [isCollapsed, isLastMessage])

  // if not collapsed, return the component
  if (!isCollapsed) {
    return message.component
  }

  return (
    <Collapsible
      open={open}
      onOpenChange={value => {
        setOpen(value)
      }}
    >
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            'w-full flex justify-end',
            !isCollapsed ? 'hidden' : ''
          )}
        >
          <Button
            variant="ghost"
            size={'icon'}
            className={cn('-mt-3 rounded-full')}
          >
            <ChevronDown
              size={14}
              className={cn(
                open ? 'rotate-180' : 'rotate-0',
                'h-4 w-4 transition-all'
              )}
            />
            <span className="sr-only">collapse</span>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>{message.component}</CollapsibleContent>
      {!open && <Separator className="my-2 bg-muted" />}
    </Collapsible>
  )
}
