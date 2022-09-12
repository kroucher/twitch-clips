import Image from "next/future/image";
import Link from "next/link";
import { TwitchClip } from "../../server/trpc/router/clipsRouter";

const ClipCard = ({ clip, i }: { clip: TwitchClip, i: number }) => {
    return (
        <>
            <li key={i} className="p-2 shadow-sm rounded-md hover:shadow-inner hover:shadow-gray-400 group shadow-gray-300 transition-transform ease-in-out antialiased">
                <Link passHref href={`/user/${clip.broadcaster_name}/clip/${clip.id}`}
                    as={`/user/${clip.broadcaster_name}/clip/${clip.id}`}

                    className="border rounded-md p-2 flex flex-col items-start justify-start w-full overflow-hidden truncate">
                    <a
                        className="w-full flex flex-col items-start justify-between"
                        href={`/user/${clip.broadcaster_name}/clip/${clip.id}`}
                    >
                        <div className="relative w-full">
                            <Image width={1920} height={1080} alt={clip.title} src={clip.thumbnail_url} className="w-full" />
                            <span className="group-hover:hidden absolute top-0.5 right-0.5 text-xs rounded-lg w-fit text-center p-1 bg-slate-900/70 text-white z-10">{clip.duration}s</span>
                            <span className="group-hover:hidden absolute bottom-0.5 right-0.5 text-xs rounded-lg w-fit p-1 bg-slate-900/70 text-white z-10">{new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            }).format(new Date(clip.created_at))}</span>
                            <span className="group-hover:hidden hidden xl:block sm:absolute bottom-0.5 left-0.5 text-xs rounded-lg w-fit text-center p-1 h-fit bg-slate-900/70 text-white z-10 whitespace-nowrap">{clip.view_count} views</span>
                            <span className="group-hover:hidden absolute xl:hidden top-0 left-0.5 text-xs rounded-lg w-fit text-center p-1 h-fit bg-slate-900/70 text-white z-10 whitespace-nowrap">{clip.view_count} views</span>
                        </div>
                        <p className="text-sm truncate text-ellipsis w-48 group-hover:w-full h-12 group-hover:whitespace-pre-line font-bold pt-2">{clip.title}</p>
                        <p className="text-xs pt-2">Clipped by: {clip.creator_name}</p>
                    </a>
                </Link>
            </li>
        </>
    );
}

export default ClipCard;