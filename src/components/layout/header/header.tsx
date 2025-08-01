import CatalogMenu from "@/components/layout/header/catalogMenu";
import Logo from "@/components/layout/header/logo";
import SearchBar from "@/components/layout/header/searchBar";
import CheckAuth from "./checkAuth";

const Header: React.FC = () => {
	return (
		<header className="bg-blue-500 fixed w-full z-1000 py-2 shadow-[0_0_15px_0_#000]">
			<nav>
				<div className="max-w-screen-xl px-4 mx-auto xs:mx-0 2xl:px-0">
					<div className="flex items-center">
						<div className="flex-grow-1 items-center">
							<div className="flex justify-between">
								<Logo />
								<div className="flex items-center">
									<CatalogMenu />
									<SearchBar />
								</div>
							</div>
						</div>

						<div className="ml-auto">
							<CheckAuth />
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
