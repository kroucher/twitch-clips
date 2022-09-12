import Image from "next/future/image";
import Link from "next/link";
import { Channel } from "node-twitch/dist/types/objects";

const StreamerCard = ({ streamer }: { streamer: Channel }) => {
    return (
        <Link
            href="/user/[username]"
            as={`/user/${streamer.display_name}`}
            passHref
        >
            <a className="relative w-full cursor-pointer">

                <Image width={1920} height={1080} src={streamer.thumbnail_url} alt={streamer.display_name} className="rounded-t-md w-full" />
                {streamer.is_live &&
                    <div className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white rounded-full"> LIVE
                    </div>
                }
                <span className="absolute bottom-0 w-full mx-auto bg-black/80 text-white text-base text-center px-3 py-1">{streamer.display_name}</span>
            </a>
        </Link>
    );
}

export default StreamerCard;