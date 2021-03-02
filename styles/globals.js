import {css, Global} from '@emotion/react'


export const globalStyles = (

    <Global
        styles={css`
          html,
          body {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            background: linear-gradient(90deg, rgba(20,74,102,1) 0%, rgba(32,103,125,1) 35%, rgba(2,13,24,1) 100%);
            min-height: 100vh;
            min-width: 100vw;
            font-family: Helvetica, Arial, sans-serif;
            overflow: hidden;

          }
        `}
    />
)
