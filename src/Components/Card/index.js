import { Element } from "./styles"

export const Card = ({ title, text, link }) => {
    return (
        <Element href={link}>
            <div>{title}&rarr;</div>
            <p>{text}</p>
        </Element>
    )
}