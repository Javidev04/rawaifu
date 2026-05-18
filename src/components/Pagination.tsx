import { useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'

type PaginationProps = {
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
  calculateTotalPages: () => number
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function buildPageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages = new Set([1, total, current, current - 1, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const range: (number | 'ellipsis')[] = []

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) range.push('ellipsis')
    range.push(sorted[i])
  }

  return range
}

const navButtonClass =
  'inline-flex h-9 sm:h-10 min-w-9 sm:min-w-10 items-center justify-center rounded-lg border border-zinc-600/80 bg-black text-zinc-200 transition hover:border-orange-500/50 hover:bg-zinc-700/80 hover:text-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:pointer-events-none disabled:opacity-35 disabled:hover:border-zinc-600/80 disabled:hover:bg-zinc-800/70 disabled:hover:text-zinc-200 cursor-pointer touch-manipulation'

const pageButtonClass =
  'inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-transparent text-sm font-medium tabular-nums text-black transition hover:border-zinc-600/80 hover:bg-black hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 cursor-pointer touch-manipulation'

const pageButtonActiveClass =
  'border-orange-500/45 bg-orange-400 text-white font-semibold shadow-sm shadow-orange-950/40'

export default function Pagination({
  currentPage,
  setCurrentPage,
  calculateTotalPages,
}: PaginationProps) {
  const totalPages = calculateTotalPages()
  const pageRange = useMemo(
    () => buildPageRange(currentPage, totalPages),
    [currentPage, totalPages],
  )

  if (totalPages <= 1) return null

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages))
  }

  return (
    <nav
      className="w-full max-w-4xl mx-auto sm:mt-12"
      aria-label="Paginación del ranking"
    >   
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 p-2 sm:p-2.5 backdrop-blur-sm">
        <button
          type="button"
          className={`${navButtonClass} sm:px-3`}
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline text-sm font-medium pr-0.5">Anterior</span>
        </button>

        <div
          className="flex items-center gap-0.5 sm:gap-1 px-0.5 sm:px-1"
          role="group"
          aria-label="Números de página"
        >
          {pageRange.map((item, index) =>
            item === 'ellipsis' ? (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex h-9 w-7 sm:h-10 items-center justify-center text-zinc-500 select-none"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={`${pageButtonClass} ${item === currentPage ? pageButtonActiveClass : ''}`}
                onClick={() => goToPage(item)}
                aria-label={`Ir a la página ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          className={`${navButtonClass} sm:px-3`}
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Página siguiente"
        >
          <span className="hidden sm:inline text-sm font-medium pl-0.5">Siguiente</span>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </nav>
  )
}