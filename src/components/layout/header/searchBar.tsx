export default function SearchBar() {
	return (
		<div className="">
			<form action="">
				<input
					className="w-100 bg-[#dee5ff] border-2 border-blue-500 focus:bg-[#fff] focus:text-black  inset-shadow-[0_0px_3px_rgba(4,40,80)] outline-none py-2 pl-3 pr-10 rounded-r-lg "
					placeholder="Что бы ты хотел ?"
					type="text"
					name="search"
					id=""
				/>
				<button>O</button>
			</form>
		</div>
	);
}
