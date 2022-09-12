import { useEffect, useState } from "react";
import { TwitchClip } from "../server/trpc/router/clipsRouter";

export type SortBy = "view_count" | "created_at";
type SortDirection = "asc" | "desc";

export const useSortClips = (
  clips: TwitchClip[],
  sortBy: SortBy,
  sortDirection: SortDirection
) => {
  const [sortedBy, setSortBy] = useState<SortBy>(sortBy);
  const [sortedDirection, setSortDirection] =
    useState<SortDirection>(sortDirection);
  const [sortClips, setSortClips] = useState<TwitchClip[]>([]);

  useEffect(() => {
    const sortClipsBy = (
      clips: TwitchClip[],
      sortBy: SortBy,
      sortDirection: SortDirection
    ) => {
      const sortedClips = [...clips].sort((a, b) => {
        if (sortDirection === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] > b[sortBy] ? -1 : 1;
        }
      });
      return sortedClips;
    };
    if (clips.length > 0) {
      const sortedClips = sortClipsBy(clips, sortedBy, sortedDirection);
      setSortClips(sortedClips);
    }
    return () => {
      setSortClips([]);
    };
  }, [clips, sortedBy, sortedDirection]);

  return {
    sortedBy,
    setSortBy,
    sortedDirection,
    setSortDirection,
    sortClips,
  };
};
