import Request from "@layer0/core/router/Request";
import Response from "@layer0/core/router/Response";
import Zlib from "zlib";
/**
 * This function is called for all requests that don't match a route.
 * @param req The request
 * @param res The response
 */
export default function log(req: Request, res: Response) {
  return new Promise<void>((resolve, reject) => {
    Zlib.gunzip(toArrayBuffer(req.rawBody), (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      // Here's how you set a response header
      res.setHeader("content-type", "application/json");
      res.body = JSON.stringify({
        // here's how you access the incoming request body
        body: result.toString(),
      });

      resolve();
    });
  });

  // If you want to add a custom response status:
  // res.statusCode = 599;
  // res.statusMessage = "WTF";
}

/*
Here's an example cURL:
curl -v -H 'Content-Encoding: gzip' --data-binary @logs.json.gz http://localhost:3000/log
*/

function toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
