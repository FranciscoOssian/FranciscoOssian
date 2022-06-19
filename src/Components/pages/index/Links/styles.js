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

        margin-bottom: 16px;
        aspect-ratio: 150/51;

        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.22);
        border-radius: 10px;
        
        div{
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 38px;
            line-height: 46px;
        }
        
        & div:first-of-type{
            font-size: 18px;
            line-height: 22px;
        }
    }

    @media (min-width: 600px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        li {
            width: 155px;
            height: 155px;

            margin: 22px;

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