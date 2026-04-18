import { useMemo } from 'react'
import { db } from '../data/db'

type Entry = (typeof db)[number]

type RankingProps = {
  data: Entry[]
}

export default function Ranking({ data }: RankingProps) {
  const sorted = useMemo(
    () => [...data].sort((a, b) => b.score - a.score),
    [data]
  )

  return (
    <section className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-black mb-4 sm:mb-6 tracking-tight">
        Ranking
      </h2>
      <div className="overflow-hidden rounded-lg sm:rounded-xl border border-zinc-700/80 bg-zinc-900/60 shadow-xl shadow-black/40 backdrop-blur-sm">
        <div className="overflow-x-auto -mx-px sm:mx-0">
          <table className="w-full min-w-[280px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-orange-500/35 bg-linear-to-r from-zinc-800/90 to-zinc-800/70">
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-orange-300 w-12 sm:w-16 text-center"
                >
                  #
                </th>
                <th scope="col" className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-zinc-200">
                  Personaje
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 sm:px-4 sm:py-3 font-semibold text-zinc-200 text-right w-24 sm:w-28"
                >
                  Puntos
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/60">
              {sorted.map((entry, i) => (
                <tr
                  key={entry.id}
                  className="transition-colors hover:bg-zinc-800/50 even:bg-zinc-950/30"
                >
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-center align-middle">
                    <span
                      className={
                        i === 0
                          ? 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/25 text-amber-200 font-bold text-base ring-1 ring-amber-400/40'
                          : i === 1
                            ? 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-400/20 text-zinc-200 font-semibold ring-1 ring-zinc-400/30'
                            : i === 2
                              ? 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-900/40 text-orange-200 font-semibold ring-1 ring-orange-600/35'
                              : 'text-white font-medium tabular-nums'
                      }
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 align-middle">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <img
                        src={`/${entry.image}.jpg`}
                        alt=""
                        className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 rounded-md sm:rounded-lg object-cover ring-1 ring-zinc-600/80 shadow-md"
                      />
                      <span className="font-medium text-zinc-100 truncate sm:whitespace-normal">
                        {entry.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 sm:px-4 sm:py-3 text-right align-middle">
                    <span className="tabular-nums font-semibold text-orange-300">
                      {entry.score.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
