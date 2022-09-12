import { useRouter } from "next/router";
import Script from "next/script";
import { trpc } from "../../../../utils/trpc";

const ClipPage = () => {
    const router = useRouter();
    const { clip } = router.query;
    const { data } = trpc.clips.getClip.useQuery({
        clipId: clip as string
    }, {
        enabled: !!clip,
    });
    return (
        <div className="max-w-screen bg-slate-900 text-white items-start flex justify-center min-h-screen pb-32">

            <button onClick={() => router.back()} className="absolute top-0 left-0 m-4 text-2xl border-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>
            <div className="flex flex-col items-start justify-center pt-28 w-full px-4">
                <div className="w-3/4 text-left py-8 px-4">
                    <span className="text-2xl sm:text-5xl whitespace-pre-wrap">{data?.[0]?.title}</span>
                </div>
                <iframe src={`${data?.[0]?.embed_url}&parent=${process.env.NODE_ENV === "production" ? `twitch-clips.beanlea.com` : `localhost:3000`}`} height="720"
                    width="1280"
                    allowFullScreen className="w-full mx-auto px-1" />
                <div className="flex items-center justify-between w-full px-3">
                    <span className="text-xl py-2">Views: {data?.[0]?.view_count}</span>
                    <span className="text-xl py-2">Duration: {data?.[0]?.duration}s</span>
                </div>
            </div>
        </div>


    );
}

export default ClipPage;