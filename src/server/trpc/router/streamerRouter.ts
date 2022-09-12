import { t } from "../trpc";
import { z } from "zod";
import TwitchApi from "node-twitch";
import { Clip } from "node-twitch/dist/types/objects";

const twitch = new TwitchApi({
  client_id: "rx71gqrwwb19qcuc31d2sp2jzrydl7",
  client_secret: "evsr9ofnmg6iw9dd6nrym0cvahswnq",
});

export interface TwitchClip extends Clip {
  duration: number;
}

export const streamerRouter = t.router({
  searchStreamers: t.procedure
    .input(
      z.object({
        query: z.string(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const query = input?.query;
      let cursor = input?.cursor || "";
      if (query && cursor === "") {
        const streamers = await twitch.searchChannels({
          query,
          first: 10,
        });
        return {
          streamers: streamers.data.map((page) => page),
          cursor: streamers.pagination?.cursor,
        };
      } else {
        if (query) {
          const streamers = await twitch.searchChannels({
            query,
            after: cursor,
            first: 10,
          });
          if (streamers.pagination?.cursor) {
            cursor = streamers.pagination.cursor;
          }
          return {
            streamers: streamers.data.map((page) => page),
            cursor: streamers.pagination?.cursor,
          };
        }
      }
    }),
});
