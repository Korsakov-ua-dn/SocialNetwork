import preloader from "../../../assets/img/Spin-1s-200px.svg"
import s from "./Preloader.module.css"

type PreloaderPropsType = {
    isFetching: boolean
}

const Preloader = (props: PreloaderPropsType) => {
    return (
        <div>
            {props.isFetching ? <img className={s.preloaderImg} src={preloader} alt="spinner"/> : null}
        </div>
    )
}

export default Preloader