import Request from "@layer0/core/router/Request";
import Response from "@layer0/core/router/Response";
import fetch from "node-fetch";

/**
 * This function is called for all requests that don't match a route.
 * @param req The request
 * @param res The response
 */
export default async function fallback(req: Request, res: Response) {
  // Here's how you set a response header
  res.setHeader("content-type", "application/json");

  // here's how you could make requests to a third party site or API:
  const upstreamRes = await fetch("https://example.com").then((res) =>
    res.text()
  );

  res.body = JSON.stringify({
    // here's how you access the incoming request body
    requestBody: req.body,
    responseBody: upstreamRes,
  });

  // If you want to add a custom response status:
  // res.statusCode = 599;
  // res.statusMessage = "WTF";
}
