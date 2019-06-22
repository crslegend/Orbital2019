import { Component } from "react";
import { withRouter } from "react-router-dom";

// this fixes the scrolling issue
// making sure the page is now at the top if user previously had scrolled down
// from another page to go to the current page

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
