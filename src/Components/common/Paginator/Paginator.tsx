import { useState } from "react"
import s from "./Paginator.module.css"
import cn from 'classnames'

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    portionSize: number
}

export const Paginator: React.FC<PropsType> = (
    {
        totalCount,
        pageSize,
        currentPage,
        onPageChanged,
        portionSize,
    }
) => { 
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [currentPortion, setCurrentPortion] = useState<number>(1)
    let leftPortionPageNumber = (currentPortion*portionSize)-portionSize+1
    let rightPortionPageNumber = currentPortion*portionSize

    return (
        <div>
            { leftPortionPageNumber > 1 && <button onClick={() => setCurrentPortion(currentPortion - 1)}> prev </button> }
            {   
                pages
                    .filter(p => p >= leftPortionPageNumber && p <=rightPortionPageNumber )
                    .map(p => <span
                    key={p}
                    className={ cn(s.page, {[s.selectedPage]: currentPage === p}) }
                    onClick={() => onPageChanged(p)}
                >{p} </span>)
            }
            { currentPortion < portionCount && <button onClick={() => setCurrentPortion(currentPortion + 1)}> next </button> }
        </div>
    )
}