import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

import EmojiResultRow from "./EmojiResultRow";

export default class EmojiResults extends PureComponent {
  static propTypes = {
    emojiData: PropTypes.array
  };

  componentDidMount() {
    this.clipboard = new Clipboard(".copy-to-clipboard");
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <div className="component-emoji-results">
        {this.props.emojiData.map(emojiData => 
          <EmojiResultRow
            key={emojiData.title}
            symbol={emojiData.symbol}
            keywords={emojiData.keywords}
            title={emojiData.title}
          />
        )}
      </div>
    );
  }
}
