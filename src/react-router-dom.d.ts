declare module "react-router-dom" {
  import * as React from "react";

  export type HistoryLike = {
    push: (path: string) => void;
    replace: (path: string) => void;
  };

  export function useHistory(): HistoryLike;

  export const Redirect: React.ComponentType<any>;
  export const Route: React.ComponentType<any>;
}
