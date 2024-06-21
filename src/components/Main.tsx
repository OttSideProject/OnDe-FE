"use client";

/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import reset from "@/styles/core/reset";
import Link from "next/link";
import Header from "./header/Header";

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

const Main = () => {
	return (
		<>
			<Global styles={reset} />
			<Header />
			<div className="Main" css={testStyle}>
				<nav>
					<ul>
						<li>
							{" "}
							<Link href="/">메인화면</Link>{" "}
						</li>
						<li>
							{" "}
							<Link href="/users/signup">회원가입</Link>{" "}
						</li>
						<li>
							{" "}
							<Link href="/">로그인</Link>{" "}
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Main;
