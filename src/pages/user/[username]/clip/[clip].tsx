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
        <div>
            Enter
        </div>
    );
}

export default ClipPage;