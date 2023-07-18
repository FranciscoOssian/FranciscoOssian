import styled from 'styled-components'

export const Name = styled.a`
    font-weight: 600;
    color: #0969da;
    text-decoration: none;
    font-size: 14px;
`

export const Description = styled.p`
    margin-top: 8px;
    margin-bottom: 0;
`

export const Ol = styled.ol`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 1.5;
    color: #656d76;
    font-size: 12px;
    padding: 0;
    list-style: none;

    li{
        width: 100%;
    }

    & > li > div{
        border: 1px solid #d0d7de;
        border-radius: 6px;
        padding: 16px;
    }

    .public{
        border-color: #d0d7de;
        color: #656d76;
        padding: 0.12em 0.5em;
        border: 1px solid #d0d7de;
        border-radius: 2em;
        margin-left: 8px;
    }

    @media (min-width: 768px){
        li{
            width: 40.99999998%;
            
            & > div{
                overflow: hidden;
                max-height: 129px;
                min-height: 111px;
            }

            padding-right: 8px !important;
            padding-left: 8px !important;
            margin-bottom: 16px !important;
        }
    }
`

export const StarsLink = styled.a`
    color: #656d76;
    text-decoration: none;
    display: flex;
    align-items: center;

    svg{
        margin-right: 2px;
    }
`

export const TechInfo = styled.p`
    display: flex;
    align-items: center;
`

export const Lang = styled.p`
    margin-right: 16px;
    display: flex;
    div{
        width: 10px;
        height: 10px;
        border-radius: 100%;
        margin-right: 2px;
        background-color: #3178c6;
    }

    div[data-content="TypeScript"]{
        background-color: #3178c6;
    }
    div[data-content="JavaScript"]{
        background-color: #f1e05a;
    }
`