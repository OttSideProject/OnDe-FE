/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Router } from '@routes/Router';
import { Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import reset from '@styles/core/reset';

const testStyle = css`
  li {
    font-size: 20px;
    border-radius: 4px;
    padding: 10px;
    text-align: center;
    font-family: Malgun Gothic;
    margin-bottom: 30px
    margin-top: 10px
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} /> 
      <Router />
      <div className="App" css={testStyle}>
        <nav>
          <ul>
            <li>
              {' '}
              <Link to="/">메인화면</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/user/signup">회원가입</Link>{' '}
            </li>
            <li>
              {' '}
              <Link to="/user/#">로그인</Link>{' '}
            </li>
          </ul>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;
