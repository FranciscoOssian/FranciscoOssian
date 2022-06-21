import styled from '@emotion/styled'

export const Element = styled.ul`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;

    list-style: none;

    padding: 0;

    font-family: 'Inter';
    font-style: normal;
    align-items: center;
    text-align: center;
    color: #000000;

    
    li{
        width: 38.46vw;
        display: grid;
        grid-template-columns: 66.66% 33.33%;

        margin-bottom: 1rem;
        aspect-ratio: 150/51;

        box-sizing: border-box;
        border: 0.0625rem solid rgba(0, 0, 0, 0.22);
        border-radius: 0.625rem;
        
        div{
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 2.375rem;
            line-height: 2.875rem;
        }
        
        & div:first-of-type{
            font-size: 1.125rem;
            line-height: 1.375rem;
        }
    }

    @media (min-width: 600px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
            width: 9.6875rem;
            height: 9.6875rem;

            margin: 1.375rem;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            div{
                height: 33.33%;
            }
            div:first-of-type{
                height: 66.66%;
            }
        }
    }
`