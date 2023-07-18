import styled from 'styled-components'

export const Th = styled.th``

export const Table = styled.table`
    width: 100%;
`

export const Thead = styled.thead`
    padding: 0.125em 0.5em 0.125em 0;
    font-size: 12px;
    font-weight: 400;
    color: #1f2328;
    text-align: left;
    fill: #1f2328;
`

export const Tbody = styled.tbody<{hover?: boolean}>`
    td{
        width: 11px;
        min-width: 11px;
        min-height: 11px;
        height: 11px;
        border-radius: 2px;
        border-spacing: 4px;
        &:hover{
            position: relative;
            &:before{
                position: absolute;
                padding: 8px 16px;
                font-size: 12px;
                color: #ffffff;;
                text-align: center;
                background: #24292f;;
                border-radius: 6px;
                content: attr(data-content);
                max-width: 200px;
                left: 15px;
                top: 15px;
                display: ${p => p.hover === false? 'none' : 'block'};
            }
            &:after{
                width: 5px;
                height: 5px;
                clip-path: polygon(50% 100%, 0 0, 100% 0);
            }
        }
    }
    td[data-level="0"]{
        background-color: #ebedf0;
    }
    td[data-level="1"]{
        background-color: #9be9a8;
    }
    td[data-level="2"]{
        background-color: #40c463;
    }
    td[data-level="3"]{
        background-color: #30a14e;
    }
    td[data-level="4"]{
        background-color: #216e39;
    }
    span{
        display: hidden;
    }
`

export const TableBox = styled.div`
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar{
    /*Your styles here*/
        width: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #d0d7de; 
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #d0d7de; 
    }
`

export const Legend = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 5px 0 5px;
`

export const Main = styled.div`
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;

    padding: 10px;

    border: 1px solid #d0d7de !important;

    max-width: 1000px;
`