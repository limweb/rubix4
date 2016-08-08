import React from 'react';
import classNames from 'classnames';

export default class Icon extends React.Component {
  static propTypes = {
    bundle: React.PropTypes.string,
    glyph: React.PropTypes.string.isRequired,
  };

  render() {
    let _glyph = this.props.glyph || "";
    let _bundle = this.props.bundle || "";
    let isGlyphicon = (_glyph.search('glyphicon') !== -1) || (_bundle.search('glyphicon') !== -1);

    let iconString = `${_bundle}-${_glyph}`;
    let bundle = _bundle.length ?
                   (!isGlyphicon ? `icon-${iconString}` : iconString)
                   : null;
    let glyph = !_bundle.length ? _glyph : '';

    let classes = classNames(this.props.className, bundle, glyph, {
      'glyphicon': isGlyphicon,
      'rubix-icon': !isGlyphicon,
      'form-control-feedback': this.props.feedback
    });

    let props = {
      ...this.props,
      className: classes,
    };

    return (
      <span {...props} />
    );
  }
}
