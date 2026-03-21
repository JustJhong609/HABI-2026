declare module "react-router-dom" {
  import * as React from "react";

  export interface BrowserRouterProps {
    children?: React.ReactNode;
  }

  export class BrowserRouter extends React.Component<BrowserRouterProps> {}

  export interface RouteProps {
    path?: string;
    exact?: boolean;
    component?: React.ComponentType<any>;
    render?: (props: any) => React.ReactNode;
    children?: React.ReactNode;
  }

  export type HistoryLike = {
    push: (path: string) => void;
    replace: (path: string) => void;
  };

  export function useHistory(): HistoryLike;

  export const Redirect: React.ComponentType<{ to: string }>;
  export const Route: React.ComponentType<RouteProps>;
}
