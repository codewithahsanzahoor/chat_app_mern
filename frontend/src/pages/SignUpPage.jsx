import { Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useState } from "react";
import { toast } from "react-hot-toast";

function SignUpPage() {
	const { isSigningUp, signUp } = useAuthStore();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
		fullName: "",
	});

	function validateForm() {
		if (!formData.fullName.trim())
			return toast.error("Full Name is required");
		if (!formData.email.trim()) return toast.error("Email is required");
		if (!formData.password.trim())
			return toast.error("Password is required");
		if (formData.password.length < 6)
			return toast.error("Password should be at least 6 characters long");

		return true;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const success = validateForm();
		if (success === true) signUp(formData);
	}
	return (
		<div className="" id="form">
			<div className="hero bg-base-200 min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="text-center lg:text-left">
						<h1 className="text-5xl font-bold">SignUp now!</h1>
						<p className="py-6">SignUp Now for your Chat App</p>
					</div>
					<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
						<form
							onSubmit={handleSubmit}
							className="card-body"
							method="post"
						>
							<div className="form-control">
								<label className="label">
									<span className="label-text">FullName</span>
								</label>
								<input
									type="text"
									placeholder="John Doe"
									className="input input-bordered"
									value={formData.fullName}
									onChange={(e) =>
										setFormData({
											...formData,
											fullName: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Email</span>
								</label>
								<input
									type="email"
									placeholder="john@gmail"
									className="input input-bordered"
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="password"
									className="input input-bordered"
									value={formData.password}
									onChange={(e) =>
										setFormData({
											...formData,
											password: e.target.value,
										})
									}
									required
								/>
								{/* <label className="label">
									<a
										href="#"
										className="label-text-alt link link-hover"
									>
										Forgot password?
									</a>
								</label> */}
							</div>
							<div className="form-control mt-6">
								<button
									type="submit"
									className="btn btn-primary w-full"
									disabled={isSigningUp}
								>
									{isSigningUp ? (
										<>
											<Loader2 className="animate-spin size-5" />
											Loading...
										</>
									) : (
										"Create Account"
									)}
								</button>
							</div>
							<div className="text-center">
								<p className="text-base-content/60">
									Already have an account?{" "}
									<a
										href="/login"
										className="link link-hover"
									>
										Login
									</a>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUpPage;
