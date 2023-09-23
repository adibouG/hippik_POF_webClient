import React, { ReactNode } from "react";
import {Logger} from "../Logger/Logger";

type Props = {
    children: ReactNode;
}

class ErrorBound extends React.Component
{
    constructor(props: Props) 
    {
      super(props);
      this.state = { 
            hasError: false,
            error: null 
        };
    }
  
    static getDerivedStateFromError(error: Error) 
    {
      // Update state so the next render will show the fallback UI.
      return ({ hasError: true, error: error });
    }
  
    componentDidCatch(error, info) 
    {
      // Example "componentStack":
      //   in ComponentThatThrows (created by App)
      //   in ErrorBoundary (created by App)
      //   in div (created by App)
      //   in App
      logErrorToMyService(error, info.componentStack);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return this.props.fallback;
      }
  
      return this.props.children;
    }
  }