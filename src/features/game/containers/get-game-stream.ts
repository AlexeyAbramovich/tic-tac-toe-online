import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";

export function getGameStream(req: NextRequest) {
  const { responce } = sseStream(req);
  return responce;
}
