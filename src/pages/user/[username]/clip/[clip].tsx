import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../../../utils/trpc";

const ClipPage = () => {
    const router = useRouter();
    const { clip } = router.query;

    const { data, status } = trpc.clips.getClip.useQuery({
        clipId: clip as string
    }, {
        enabled: !!clip,
    });
    console.log(data, status);
    return (
        <div className="w-full bg-slate-900 text-white items-center flex justify-center min-h-screen">

            <button onClick={() => router.back()} className="absolute top-0 left-0 m-4 text-2xl border-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>

            <iframe src={data?.[0]?.embed_url} className="w-full max-w-4xl h-full" />
        </div>
    );
}

export default ClipPage;