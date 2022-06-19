import styled from '@emotion/styled'

export const Element = styled.div`
    & a {
        color: #0070f3;
        text-decoration: none;
    }

    & a:hover,
    & a:focus,
    & a:active {
        text-decoration: underline;
    }

    width: 100%;

    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.15;
    text-align: center;
    
    @media (min-width: 600px) {
        font-size: 4rem;
    }
`