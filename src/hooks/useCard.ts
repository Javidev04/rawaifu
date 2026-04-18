import { useState, useEffect } from 'react'
import { db } from '../data/db'

const STORAGE_KEY = 'data'

function CargarDataInicial(): typeof db {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return db.map((item) => ({ ...item }))
        const scores = JSON.parse(raw) as unknown
        if (!Array.isArray(scores) || scores.length !== db.length) {
            return db.map((item) => ({ ...item }))
        }
        if (!scores.every((n) => typeof n === 'number' && !Number.isNaN(n))) {
            return db.map((item) => ({ ...item }))
        }
        return db.map((item, i) => ({ ...item, score: scores[i] as number }))
    } catch {
        return db.map((item) => ({ ...item }))
    }
}

export const useCard = () => {

    //Genera dos valores aletorios dintintos entre si
    function CrearParesAleatorios(length: number): [number, number] {
        if (length <= 1) return [0, 0]
        const a = Math.floor(Math.random() * length)
        let b = Math.floor(Math.random() * length)
        while (b === a) {
            b = Math.floor(Math.random() * length)
        }
        return [a, b]
    }

    // Nuevo par [a,b] con a≠b; ambos índices distintos de los dos anteriores.
    function nuevoParDistintoDeAnteriores(
        length: number,
        prev1: number,
        prev2: number
    ): [number, number] {
        if (length <= 1) return [0, 0]

        const personajes = Array.from({ length }, (_, i) => i).filter(
            (i) => i !== prev1 && i !== prev2
        )

        if (personajes.length >= 2) {
            const a = personajes[Math.floor(Math.random() * personajes.length)]
            let b = personajes[Math.floor(Math.random() * personajes.length)]
            while (b === a) {
                b = personajes[Math.floor(Math.random() * personajes.length)]
            }
            return [a, b]
        }

        let a: number
        let b: number
        do {
            ;[a, b] = CrearParesAleatorios(length)
        } while (
            (a === prev1 && b === prev2) ||
            (a === prev2 && b === prev1)
        )
        return [a, b]
    }
        
    //Declaracion de los useState
    const [data, setData] = useState(CargarDataInicial)
    const [par, setPar] = useState<[number, number]>(() =>
        CrearParesAleatorios(db.length)
    )

    //Declaracion de las constantes
    const random1 = par[0]
    const random2 = par[1]

    //useEffect para guardar los scores en el localStorage
    useEffect(() => {
        const arreglo = data.map((item) => item.score)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(arreglo))
    }, [data])

    const alClicEnImagen = (lado: 0 | 1) => () => {
        const idx = par[lado]
        setPar(([r1, r2]) => nuevoParDistintoDeAnteriores(db.length, r1, r2))
        setData((prev) => {
            const next = prev.map((item) => ({ ...item }))
            next[idx] = { ...next[idx], score: next[idx].score + 100 }
            return next
        })
    }

    return {
        data,
        random1,
        random2,
        alClicPrimeraImagen: alClicEnImagen(0),
        alClicSegundaImagen: alClicEnImagen(1),
    }
}