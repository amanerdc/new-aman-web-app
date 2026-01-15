"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, LinkIcon, Copy, Check, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { getAgentById } from "@/lib/agents"

type AgentToolsProps = {
  currentPath: string
}

export function AgentTools({ currentPath }: AgentToolsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [agentId, setAgentId] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [agentName, setAgentName] = useState("")
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const generateLink = () => {
    if (!agentId.trim()) {
      setError("Please enter an Agent ID")
      setGeneratedLink("")
      setAgentName("")
      return
    }

    const agent = getAgentById(agentId.trim())
    if (!agent) {
      setError("Agent ID not found")
      setGeneratedLink("")
      setAgentName("")
      return
    }

    setError("")
    setAgentName(agent.name)

    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const separator = currentPath.includes("?") ? "&" : "?"
    const link = `${baseUrl}${currentPath}${separator}agent=${agent.id}`
    setGeneratedLink(link)
  }

  const copyToClipboard = async () => {
    if (generatedLink) {
      await navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="border-t mt-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        <span className="text-sm font-medium">Agent Tools</span>
      </button>

      {isOpen && (
        <Card className="mx-auto max-w-md mb-8">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-id">Agent ID</Label>
              <div className="flex gap-2">
                <Input
                  id="agent-id"
                  placeholder="Enter your Agent ID (e.g., m10-1)"
                  value={agentId}
                  onChange={(e) => {
                    setAgentId(e.target.value)
                    setError("")
                  }}
                />
                <Button onClick={generateLink}>
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            {agentName && (
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  Agent: <strong>{agentName}</strong>
                </span>
              </div>
            )}

            {generatedLink && (
              <div className="space-y-2">
                <Label>Generated Link</Label>
                <div className="flex gap-2">
                  <Input value={generatedLink} readOnly className="text-xs" />
                  <Button variant="outline" size="icon" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
