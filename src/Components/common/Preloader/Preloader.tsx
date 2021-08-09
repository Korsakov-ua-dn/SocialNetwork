import preloader from "../../../assets/img/Spin-1s-200px.svg"

type PreloaderPropsType = {
    isFetching: boolean
}

const Preloader = (props: PreloaderPropsType) => {
    return (
        <div>
            {props.isFetching ? <img src={preloader} alt="spinner"/> : null}
        </div>
    )
}

export default Preloader