import { Skeleton } from "../ui/skeleton";

export default function LoadingTable({ rows = 5 }: { rows?: number }) {
	const tableRows = Array.from({ length: rows }, () => {
		return (
			<div className="mb-4" key={crypto.randomUUID()}>
				<Skeleton className="w-full h-8 rounded" />
			</div>
		);
	});
	return <>{tableRows}</>;
}
