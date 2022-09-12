import Link from "next/link";
import { useRouter } from "next/router";
import { Clip } from "node-twitch/dist/types/objects";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { trpc } from "../../../utils/trpc";
import { useSortClips } from "../../../utils/useSortClips";
import InfiniteScroll from 'react-infinite-scroller';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import useDebounce from "../../../utils/useDebounce";
import { TwitchClip } from "../../../server/trpc/router/clipsRouter";
import SearchBar from "../../../components/Clips/SearchBar";
import SortClips, { TimeFrame } from "../../../components/Clips/SortClips";
import ClipCard from "../../../components/Clips/ClipCard";
import RangeSlider from "../../../components/Clips/RangeSlider";
import { PacmanLoader } from "react-spinners";
import ScrollToTop from "../../../components/ScrollButton/ScrollToTop";



const loader = (
    <div className="col-span-1 sm:col-span-4 mx-auto">
        <PacmanLoader
            size={20}
            color="white"
            loading={true}
        />
    </div>
)

const UserPage = () => {
    const [parent] = useAutoAnimate(/* optional config */)
    const router = useRouter();
    const { username } = router.query;
    const [clips, setClips] = useState<TwitchClip[]>([]);
    const [searchResults, setSearchResults] = useState<TwitchClip[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchResults = useDebounce(searchTerm, 500);
    const [timeFrame, setTimeFrame] = useState<TimeFrame>("all");
    const [rangeValue, setRangeValue] = useState<number[]>([0, 60]);
    const debouncedRange = useDebounce(rangeValue, 500);
    const { fetchNextPage, hasNextPage } = trpc.clips.getMoreClips.useInfiniteQuery(
        {
            username: username as string,
            timeFrame: timeFrame,
        },
        {
            getNextPageParam: (lastPage) => lastPage?.cursor,
            enabled: !!username || debouncedSearchResults.length === 0,
            onSuccess(data) {
                setClips([...data.pages.map((page) => page.clips?.map((clip) => clip as TwitchClip))].flat());
            },
        },
    );
    const { sortClips, setSortDirection, setSortBy, sortedBy, sortedDirection } = useSortClips(clips, "created_at", "desc");

    useEffect(
        () => {
            if (debouncedSearchResults.length > 0) {
                setSearchResults(clips.filter((clip) => clip.title.toLowerCase().includes(searchTerm.toLowerCase()) || clip.creator_name.toLowerCase().includes(searchTerm.toLowerCase())));
            } else {
                setSearchResults([]);
            }
        },
        [debouncedSearchResults] // Only call effect if debounced search term changes
    );


    return (
        <main className="flex flex-col items-center justify-start min-h-[120vh] mx-auto bg-slate-900 w-full text-white">
            {/*  back button */}
            <Link href="/">
                <a className="absolute top-0 left-0 m-4 text-2xl border-2 rounded-full">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </a>
            </Link>

            <div className="w-full flex flex-col-reverse sm:flex-col">
                <div className="flex items-center justify-end w-full">
                    <div className="flex flex-col items-center justify-center w-full sm:basis-2/5 lg:basis-1/5 px-4 pt-4">
                        <SearchBar setSearchTerm={setSearchTerm} />
                    </div>
                </div>
                <span className="text-4xl text-center py-4 capitalize">{username}&apos;s Clips</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-2 pb-16">
                <SortClips
                    setSortBy={setSortBy}
                    setSortDirection={setSortDirection}
                    sortedBy={sortedBy}
                    sortedDirection={sortedDirection}
                    timeFrame={timeFrame}
                    setTimeFrame={setTimeFrame}
                />
            </div>
            <h1 className="text-lg">Duration:</h1>
            <RangeSlider rangeValue={rangeValue} setRangeValue={setRangeValue} />
            <ul ref={parent as LegacyRef<HTMLUListElement>}>
                <InfiniteScroll
                    loadMore={() => fetchNextPage()}
                    hasMore={hasNextPage}
                    loader={loader}
                    className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-2 pb-16"
                >
                    {searchResults.length > 0 ? searchResults.filter((clip) => {
                        return (debouncedRange?.[0] !== undefined && clip.duration >= debouncedRange?.[0]) && (debouncedRange?.[1] !== undefined && clip.duration <= debouncedRange?.[1]);
                    }).map((clip, i) => (
                        <ClipCard
                            key={i}
                            i={i}
                            clip={clip}
                        />
                    )) : sortClips && sortClips.filter(clip => {
                        return (debouncedRange?.[0] !== undefined && clip.duration >= debouncedRange?.[0]) && (debouncedRange?.[1] !== undefined && clip.duration <= debouncedRange?.[1]);
                    }
                    ).map((clip, i) => {
                        return (
                            <ClipCard
                                i={i}
                                key={i}
                                clip={clip}
                            />
                        )
                    })}
                </InfiniteScroll>

            </ul>

            <ScrollToTop />

        </main>
    );
}

export default UserPage;
