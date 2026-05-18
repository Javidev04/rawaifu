import {useCallback, useState} from 'react'
import { db } from '../data/db'


export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const entriesPerPage = 15
    const calculateTotalPages = useCallback(() => {
            const totalEntries = db.length
            return Math.ceil(totalEntries / entriesPerPage)
        }, [])

    return {
        currentPage,
        setCurrentPage,
        calculateTotalPages,
        entriesPerPage
    }
}