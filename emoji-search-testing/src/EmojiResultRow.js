import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./EmojiResultRow.css";

export default class EmojiResultsRow extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    keywords: PropTypes.string,
    symbol: PropTypes.string
  };

  render() {
    const codePointHex = this.props.symbol.codePointAt(0).toString(16);
    const src = `//cdn.jsdelivr.net/emojione/assets/png/${codePointHex}.png`;
    return (
      <div
        className="component-emoji-result-row copy-to-clipboard"
        data-testid="filter-items"
        data-clipboard-text={this.props.symbol}
      >
        <img alt={this.props.title} src={src} />
        <span className="title">{this.props.title}</span>
        <span data-testid="filter-keywords" className="keywords">{this.props.keywords}</span>
        <span className="info">Click to copy emoji</span>
      </div>
    );
  }
}