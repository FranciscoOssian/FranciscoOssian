import styled from '@emotion/styled'

export const Element = styled.ul`

    list-style: none;
    width: 100%;
    padding: 0;

    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    
    font-family: 'Inter';
    font-style: normal;
    text-align: center;
    text-align: center;
    color: #000000;

    a{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    li{
        width: 9.375rem;
        height: 3.1875rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin: 0;
        margin-bottom: 1rem;

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
        & div:last-of-type{
            display: none;
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

            & div:first-of-type{
                padding: 0 10px 0 10px;
            }
            & div:last-of-type{
                display: inline;
            }

            div{
                height: 33.33%;
            }
            div:first-of-type{
                height: 66.66%;
            }
        }
    }
`