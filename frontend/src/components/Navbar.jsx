import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

function Navbar() {
	const { authUser, logOut } = useAuthStore()
	return (
		<div id="navbar">
			<div className="navbar bg-base-100">
				<div className="flex-1">
					<Link
						className="btn btn-ghost text-xl"
						to={'/'}
					>
						A_Chat_App
					</Link>
				</div>
				<div className="flex gap-2">
					<div className="form-control">
						<input
							type="text"
							placeholder="Search"
							className="input input-bordered w-24 md:w-auto"
						/>
					</div>
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img
									alt="Tailwind CSS Navbar component"
									src={`${
										authUser?.profilePic ||
										'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
									}`}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							{authUser && (
								<>
									<li>
										<Link
											to={
												'/profile'
											}
											className="justify-between"
										>
											Profile
										</Link>
									</li>
									<li>
										<button
											onClick={
												logOut
											}
										>
											Logout
										</button>
									</li>
								</>
							)}
							<li>
								<Link to={'/settings'}>
									Settings
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
