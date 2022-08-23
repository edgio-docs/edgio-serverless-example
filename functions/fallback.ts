import Request from "@layer0/core/router/Request";
import Response from "@layer0/core/router/Response";

/**
 * This function is called for all requests that don't match a route.
 * @param req The request
 * @param res The response
 */
export default function fallback(req: Request, res: Response) {
  res.setHeader("content-type", "application/json");
  res.body = JSON.stringify({ url: req.url });
}
