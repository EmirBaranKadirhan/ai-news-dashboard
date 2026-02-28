import React from 'react'
import { Smile, Frown, Meh } from 'lucide-react';





function SentimentBadge({ sentiment }) {

  console.log(sentiment.includes("Olumsuz"))

  const sentimentMap = {
    "Olumlu": <Smile size={28} color="#2E6F40" strokeWidth={1.5} />,
    "Olumsuz": <Frown size={28} color="#CD1C18" strokeWidth={1.5} />,
    "Nötr": <Meh size={28} color="#898989" strokeWidth={1.5} />
  }

  return (
    <div  >
      {sentimentMap[sentiment] || null}
    </div>

  )
}

export default SentimentBadge