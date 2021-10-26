import s from "./Paginator.module.css"

type PropsType = {
    totalCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
}

export const Paginator: React.FC<PropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {
                pages.map(p => <span
                    key={p}
                    className={props.currentPage === p ? s.selectedPage : ""}
                    onClick={() => props.onPageChanged(p)}
                >{p} </span>)
            }
        </div>
    )
}