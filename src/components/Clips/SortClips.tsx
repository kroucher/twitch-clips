import { Dispatch, SetStateAction } from "react";
import { SortBy } from "../../utils/useSortClips";
import RangeSlider from "./RangeSlider";

export type TimeFrame = "24hr" | "7days" | "30days" | "all";

const SortClips = ({
    sortedBy,
    sortedDirection,
    setSortBy,
    setSortDirection,
    timeFrame,
    setTimeFrame,
}: {
    sortedBy: string,
    sortedDirection: "asc" | "desc",
    setSortBy: Dispatch<SetStateAction<SortBy>>,
    setSortDirection: (sortDirection: "asc" | "desc") => void,
    timeFrame: TimeFrame,
    setTimeFrame: (timeFrame: TimeFrame) => void,
}) => {
    return (
        <>
            <div className="flex flex-col items-start justify-center text-center bg-slate-800 p-1 rounded-md text-sm sm:text-base">
                <span className="text-left py-2 mb-2 border-b w-full">Sort By:</span>
                <button
                    className={sortedBy === "created_at" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`}
                    onClick={() => setSortBy("created_at")}>Created At</button>
                <button
                    className={sortedBy === "view_count" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`}
                    onClick={() => setSortBy("view_count")}>View Count</button>
            </div>
            <div className="flex flex-col items-start justify-center rounded-md bg-slate-800 p-1 text-sm sm:text-base">
                <span className="text-left py-2 mb-2 border-b w-full">Order:</span>
                <button className={sortedDirection === "asc" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`} onClick={() => setSortDirection("asc")}>Ascending</button>
                <button className={sortedDirection === "desc" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`} onClick={() => setSortDirection("desc")}>Descending</button>
            </div>
            <div className="flex items-center justify-center flex-col col-span-2 bg-slate-800 rounded-md p-1">
                <span className="text-sm sm:text-base text-left border-b w-full py-2 mb-2">Top:</span>
                <div className="grid sm:grid-cols-2 content-center text-center w-full text-sm sm:text-base">
                    <button
                        className={timeFrame === "24hr" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`}
                        onClick={() => setTimeFrame("24hr")}>24 Hours</button>
                    <button
                        className={timeFrame === "7days" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`}
                        onClick={() => setTimeFrame("7days")}>7 Days</button>

                    <button
                        className={timeFrame === "30days" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`}
                        onClick={() => setTimeFrame("30days")}>30 Days</button>
                    <button
                        className={timeFrame === "all" ? `bg-slate-700 px-2 py-1 w-full rounded-md` : `px-2 py-1 w-full bg-slate-800 rounded-md`}
                        onClick={() => setTimeFrame("all")}>All Time</button>
                </div>
            </div>
        </>
    );
}

export default SortClips;