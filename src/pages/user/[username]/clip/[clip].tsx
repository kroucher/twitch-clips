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
            <iframe src={data?.[0]?.embed_url} className="w-full max-w-4xl h-full" />
        </div>
    );
}

export default ClipPage;