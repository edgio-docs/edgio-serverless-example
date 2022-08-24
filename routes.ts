import { Router } from "@layer0/core/router";
import fallback from "./functions/fallback";
import hello from "./functions/hello";

export default new Router()
  .get("/hello/:name", ({ compute, cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60, // cache at the edge for 1 hour
        staleWhileRevalidateSeconds: 60 * 60 * 24 * 365, // serve stale for one year
      },
    });
    compute(hello);
  })
  .fallback(({ compute }) => {
    return compute(fallback);
  });
