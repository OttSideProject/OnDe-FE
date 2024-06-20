import type { Metadata } from "next";
import GlobalStyles from "@/components/GlobalStyles";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
	title: {
		template: " | %s",
		default: "",
	},
	description: "",
	icons: {
		icon: "/favicon.ico",
	},
	openGraph: {
		title: "",
		description: "",
		siteName: "",
		images: { url: "" },
		url: "",
		type: "website",
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps): JSX.Element => {
	return (
		<html lang="ko">
			<body>
				<ClientWrapper>
					<GlobalStyles />
				</ClientWrapper>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
