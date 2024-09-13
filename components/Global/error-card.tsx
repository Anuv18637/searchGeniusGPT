'use client'

import React, { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { useUIState, useActions, useAIState } from 'ai/rsc'
import { Card } from './card'
import { Button } from './button'
import { Label } from './label'

type ErrorCardProps = {
  errorMessage: string
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ errorMessage }) => {
  const [messages, setMessages] = useState<any>()
  const [aiState, setAIState] = useState<any>()
  // const { submit } = useActions()

  const handleRetry:any = async () => {
    // Remove the last message from the UIState
    setMessages(messages.slice(0, -1))

    const aiMessages = aiState.messages
    // Get the last message with role = user
    const lastUserMessage = [...aiMessages]
      .reverse()
      .find(m => m.role === 'user')

    let retryMessages: any = []
    // Remove messages after lastUserMessage, cannot identify by id, so process by order
    if (lastUserMessage) {
      const lastUserMessageIndex = aiMessages.findIndex(
        (m:any) => m === lastUserMessage
      )
      retryMessages = aiMessages.slice(0, lastUserMessageIndex + 1)
    }
    // Request retry from the server and add the response to the current messages
    // const response = await submit(undefined, false, retryMessages)
    // setMessages((currentMessages:any) => [...currentMessages, response])
  }

  return (
    <Card className="p-4">
      <form
        className="flex flex-col items-center space-y-4"
        action={handleRetry}
      >
        <Label>{errorMessage}</Label>
        <Button size="sm" className="w-fit" type="submit">
          <RefreshCcw size={14} className="mr-1" />
          Retry
        </Button>
      </form>
    </Card>
  )
}
