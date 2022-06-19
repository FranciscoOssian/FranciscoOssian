import {Element} from './styles'
import { TyperWriter } from '../TyperWriter'

export const Title = ({children}) => {
    return (
        <Element>
            <TyperWriter>{children}</TyperWriter>
        </Element>
    )
}