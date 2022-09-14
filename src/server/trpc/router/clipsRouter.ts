import { t } from "../trpc";
import { z } from "zod";
import TwitchApi from "node-twitch";
import { Clip } from "node-twitch/dist/types/objects";

const twitch = new TwitchApi({
  client_id: "rx71gqrwwb19qcuc31d2sp2jzrydl7",
  client_secret: process.env.TWITCH_SECRET as string,
});

export interface TwitchClip extends Clip {
  duration: number;
}

export const clipsRouter = t.router({
  getMoreClips: t.procedure
    .input(
      z.object({
        username: z.string(),
        cursor: z.string().nullish(),
        timeFrame: z.enum(["24hr", "7days", "30days", "all"]).default("all"),
      })
    )
    .query(async ({ input }) => {
      const userID = input?.username;
      let cursor = input?.cursor || "";
      let beforeDate = "";
      let afterDate = "";
      if (input.timeFrame) {
        const formattedTimeFrame = formatTimeFrame(input.timeFrame);
        beforeDate = formattedTimeFrame.start.toISOString();
        afterDate = formattedTimeFrame.end.toISOString();
      }
      console.log(beforeDate, afterDate);
      if (userID) {
        const broadcasterId = await twitch.getUsers([userID]);
        if (broadcasterId.data?.[0] && cursor === "") {
          const clips = await twitch.getClips({
            broadcaster_id: broadcasterId.data[0].id,
            first: 50,
            ended_at: afterDate,
            started_at: beforeDate,
          });
          console.log(clips);
          return {
            clips: clips.data,
            cursor: clips.pagination?.cursor,
          };
        } else {
          console.log("found broadcaster");
          console.log("found cursor");
          if (broadcasterId.data?.[0]) {
            const clips = await twitch.getClips({
              broadcaster_id: broadcasterId.data[0]?.id,
              after: cursor,
              first: 50,
            });
            if (clips.pagination?.cursor) {
              console.log("cursor", clips.pagination.cursor);
              cursor = clips.pagination.cursor;
            }
            return {
              clips: clips.data as TwitchClip[],
              cursor: cursor,
            };
          } else {
            return {
              clips: [] as TwitchClip[],
              cursor: "",
            };
          }
        }
      } else {
        console.log("no user");
        return {
          clips: [] as TwitchClip[],
          cursor: "",
        };
      }
    }),
  getClips: t.procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      console.log(input);
      const userID = input?.username;
      const broadcasterId = await twitch.getUsers([userID]);
      if (broadcasterId.data?.[0]) {
        let cursor = "";
        const clips = await twitch.getClips({
          broadcaster_id: broadcasterId.data[0]?.id,
          first: 10,
        });
        if (clips.pagination?.cursor) {
          console.log("cursor", clips.pagination.cursor);
          cursor = clips.pagination.cursor;
        }
        return {
          clips: clips.data as TwitchClip[],
          cursor: cursor,
        };
      } else {
        return {
          clips: [] as TwitchClip[],
        };
      }
    }),
  getClip: t.procedure
    .input(z.object({ clipId: z.string() }))
    .query(async ({ input }) => {
      const clipId = input?.clipId;
      const clip = await twitch.getClips({ id: clipId });
      return clip.data as TwitchClip[];
    }),
});

function formatTimeFrame(timeFrame: string) {
  switch (timeFrame) {
    case "24hr":
      return {
        start: new Date(Date.now() - 24 * 60 * 60 * 1000),
        end: new Date(Date.now()),
      };
    case "7days":
      return {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date(Date.now()),
      };
    case "30days":
      return {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date(Date.now()),
      };
    case "all":
      return {
        start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        end: new Date(Date.now()),
      };
    default:
      return {
        start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        end: new Date(Date.now()),
      };
  }
}
