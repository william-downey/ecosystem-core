"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-start justify-center gap-4 px-4">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">System</p>
          <h1 className="font-heading text-4xl">Something in the shell failed.</h1>
          <Button render={<Link href="/error/system" />}>Open system error</Button>
        </div>
      );
    }
    return this.props.children;
  }
}
