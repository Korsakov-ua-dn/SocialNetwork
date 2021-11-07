import React, {Suspense} from 'react'

export function withSuspense(Component: React.ComponentType) {

    return <Suspense fallback={<div>Загрузка...</div>}>
        <Component/>
    </Suspense>
}

// export function withSuspense <WCP>(Component: React.ComponentType<WCP>) {

//     return (props: WCP) => <Suspense fallback={<div>Загрузка...</div>}>
//         <Component {...props} />
//     </Suspense>
// } // дополнительно прокидываем пропсы