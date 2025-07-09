import * as outline from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"

export default function Carousel({ items, interval = 5000,}) {
  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef(null)

  // Scroll to given index
  const scrollToIndex = idx => {
    const container = containerRef.current
    if (!container) return
    const width = container.clientWidth
    container.scrollTo({ left: idx * width, behavior: 'smooth' })
  }

  // Auto-advance
  useEffect(() => {
    if (items.length <= 1) return
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % items.length
        scrollToIndex(next)
        return next
      })
    }, interval)
    return () => clearInterval(timerRef.current)
  }, [items.length, interval])

  // Sync index on manual scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const onScroll = () => {
      const idx = Math.round(container.scrollLeft / container.clientWidth)
      setCurrentIndex(idx)
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative w-full overflow-hidden mb-4 text-white border rounded-md">
      <div
        ref={containerRef}
        className="flex overflow-x-scroll scroll-snap-x snap-mandatory scroll-smooth touch-pan-x hide-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item, idx) => (
          <div key={idx} className="relative flex-none w-full scroll-snap-start bg-on-pri-cont overflow-hidden">
            <div className="p-5 w-full h-[186px] flex flex-col justify-between text-white">
              <div className="flex gap-1 items-center">
                <outline.CubeIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">{item.title}</span>
              </div>
              <p className="flex-1 mt-2 text-center">{item.message}</p>
              <button className="btn text-pri">
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-1 h-1 rounded-full transition-colors duration-200 $
              currentIndex === idx ? 'bg-[#A8DF46]' : 'bg-white'
            `}
            onClick={() => {
              clearInterval(timerRef.current)
              setCurrentIndex(idx)
              scrollToIndex(idx)
            }}
          />
        ))}
      </div>
    </div>
  )
}