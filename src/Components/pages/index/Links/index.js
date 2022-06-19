import {
    Element,
} from './styles'

export const Links = ({links}) => {
    return (
        <Element>
            {links.map( link =>
                <a key={link.link} href={link.link}>
                    <li>
                        <div>{link.name}</div>
                        <div>↳</div>
                    </li>
                </a>
            )}
        </Element>
    )
}