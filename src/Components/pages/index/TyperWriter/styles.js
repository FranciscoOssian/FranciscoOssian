import styled from '@emotion/styled'

export const Element = styled.div`

    max-width: 100vw;

    @keyframes typewriter{
        from{width: 0;}
        to{width: 100%;}
    }
    @keyframes blinkTextCursor{
        from{border-right-color: black;}
        to{border-right-color: transparent;}
    }

    .anim-typewriter{
        animation: typewriter 2s steps(27) 1s 1 normal both,
                    blinkTextCursor 500ms steps(44) infinite normal;
    }

    a{
        color: blue;
    }

    .line-1{
        border-right: 0.125rem solid rgba(255,255,255,.75);
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
    }

    @media (min-width: 600px) {
        
    }

    

    

    
    
    

`