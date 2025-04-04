import { auth, currentUser } from "@clerk/nextjs/server";
import { LuUser } from "react-icons/lu";

export default async function UserIcon() {
	// const {userId} = auth();
	const user = await currentUser();
	const profileImage = user?.imageUrl;
	if (profileImage) {
		return (
			<img
				src={profileImage}
				alt="user icon"
				className="w-6 h-6 rounded-full object-cover"
			/>
		);
	}

	return <LuUser className="w-6 h-6 bg-primary rounded-full text-while" />;
}
