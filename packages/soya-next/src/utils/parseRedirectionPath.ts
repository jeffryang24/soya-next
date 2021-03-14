import { compile } from "path-to-regexp";

export default function parseRedirectionPath(path: string, params?: object) {
  return compile(path)(params);
}
