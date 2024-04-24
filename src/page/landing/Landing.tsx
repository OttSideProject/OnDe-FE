/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
const divStyle = css`
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  padding: 32px;
  text-align: center;
  &:hover {
    color: white;
  }
`

export const Landing = () => {
  return <div css={divStyle}>Hover to change color.</div>
};
