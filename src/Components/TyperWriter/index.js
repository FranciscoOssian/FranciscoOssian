import {Element} from './styles'

export const TyperWriter = ({children}) => {
    return (
        <Element><p className="line-1 anim-typewriter">{children}</p></Element>
    )
}