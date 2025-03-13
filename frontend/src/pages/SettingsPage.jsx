import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

function SettingsPage() {
	const { theme, setTheme } = useThemeStore();

	const handleThemeChange = (event) => {
		setTheme(event.target.value);
	};

	const PREVIEW_MESSAGES = [
		{ id: 1, content: "Hey! How's it going?", isSent: false },
		{
			id: 2,
			content: "I'm doing great! Just working on some new features.",
			isSent: true,
		},
	];

	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<label htmlFor="theme-select" className="mr-2">
				Select Theme:{" "}
			</label>
			<select
				id="theme-select"
				value={theme}
				onChange={handleThemeChange}
			>
				<option value="light" default>
					Light
				</option>
				<option value="dark">Dark</option>
				<option value="cupcake">Cupcake</option>
				<option value="bumblebee">Bumblebee</option>
				<option value="emerald">Emerald</option>
				<option value="coral">Coral</option>
				<option value="cyberpunk">Cyberpunk</option>
				<option value="valentine">Valentine</option>
				<option value="halloween">Halloween</option>
				<option value="gourd">Gourd</option>
				<option value="aqua">Aqua</option>
				<option value="lofi">Lofi</option>
				<option value="pastel">Pastel</option>
				<option value="fantasy">Fantasy</option>
				<option value="wireframe">Wireframe</option>
				<option value="black">Black</option>
				<option value="luxury">Luxury</option>
				<option value="dracula">Dracula</option>
				<option value="cmyk">Cmyk</option>
				<option value="autumn">Autumn</option>
				<option value="business">Business</option>
				<option value="acid">Acid</option>
				<option value="lemonade">Lemonade</option>
				<option value="night">Night</option>
				<option value="coffee">Coffee</option>
				<option value="winter">Winter</option>
				<option value="sunset">Sunset</option>
				<option value="caramellatte">Caramel Latte</option>
			</select>

			{/* <div className="dropdown mb-72">
				<div tabIndex={0} role="button" className="btn m-1">
					Theme
					<svg
						width="12px"
						height="12px"
						className="inline-block h-2 w-2 fill-current opacity-60"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 2048 2048"
					>
						<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
					</svg>
				</div>
				<ul
					tabIndex={0}
					className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
				>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Light"
							value="light"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Dark"
							value="dark"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Cupcake"
							value="cupcake"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Bumblebee"
							value="bumblebee"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Emerald"
							value="emerald"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Coral"
							value="coral"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Cyberpunk"
							value="cyberpunk"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Valentine"
							value="valentine"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Halloween"
							value="halloween"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Gourd"
							value="gourd"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Aqua"
							value="aqua"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Lofi"
							value="lofi"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Pastel"
							value="pastel"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Fantasy"
							value="fantasy"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Wireframe"
							value="wireframe"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Black"
							value="black"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Luxury"
							value="luxury"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Dracula"
							value="dracula"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Cmyk"
							value="cmyk"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Autumn"
							value="autumn"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Business"
							value="business"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Acid"
							value="acid"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Lemonade"
							value="lemonade"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Night"
							value="night"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Coffee"
							value="coffee"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Winter"
							value="winter"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Sunset"
							value="sunset"
						/>
					</li>
					<li>
						<input
							type="radio"
							name="theme-dropdown"
							className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
							aria-label="Caramel Latte"
							value="caramellatte"
						/>
					</li>
				</ul>
			</div> */}

			{/* Preview Section */}
			<h3 className="text-lg font-semibold mb-4">Preview below</h3>
			<div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
				<div className="p-4 bg-base-200">
					<div className="max-w-lg mx-auto">
						{/* Mock Chat UI */}
						<div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
							{/* Chat Header */}
							<div className="px-4 py-3 border-b border-base-300 bg-base-100">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
										J
									</div>
									<div>
										<h3 className="font-medium text-sm">
											John Doe
										</h3>
										<p className="text-xs text-base-content/70">
											Online
										</p>
									</div>
								</div>
							</div>

							{/* Chat Messages */}
							<div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
								{PREVIEW_MESSAGES.map((message) => (
									<div
										key={message.id}
										className={`flex ${
											message.isSent
												? "justify-end"
												: "justify-start"
										}`}
									>
										<div
											className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${
								message.isSent
									? "bg-primary text-primary-content"
									: "bg-base-200"
							}
                        `}
										>
											<p className="text-sm">
												{message.content}
											</p>
											<p
												className={`
                            text-[10px] mt-1.5
                            ${
								message.isSent
									? "text-primary-content/70"
									: "text-base-content/70"
							}
                          `}
											>
												12:00 PM
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Chat Input */}
							<div className="p-4 border-t border-base-300 bg-base-100">
								<div className="flex gap-2">
									<input
										type="text"
										className="input input-bordered flex-1 text-sm h-10"
										placeholder="Type a message..."
										value="This is a preview"
										readOnly
									/>
									<button className="btn btn-primary h-10 min-h-0">
										<Send size={18} />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
