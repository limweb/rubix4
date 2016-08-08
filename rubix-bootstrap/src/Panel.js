import classNames from 'classnames';
import React from 'react';

import Icon from './Icon';
import Button from './Button';
import TabContainer from 'react-bootstrap/lib/TabContainer';

export default class PanelContainer extends React.Component {
  static propTypes = {
    controls: React.PropTypes.oneOfType([
                React.PropTypes.bool,
                React.PropTypes.element
              ]),
    containerClasses: React.PropTypes.string,
    collapseBottom: React.PropTypes.bool,
    gutterBottom: React.PropTypes.bool,
    noOverflow: React.PropTypes.bool,
    bordered: React.PropTypes.bool,
    plain: React.PropTypes.bool,
    onMaximize: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onHide: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    onRemove: React.PropTypes.func,
  };

  constructor(...args) {
    super(...args);

    this.state = { collapse: false, style: {}, hidden: false, glyph: 'minus' };
  }

  getBtnProps(func) {
    return {
      onClick: func,
      onTouchEnd: func
    };
  }

  remove() {
    this.setState({
      collapse: true
    });

    if (this.props.onRemove) this.props.onRemove();
  }

  show() {
    this.setState({
      hidden: false,
      glyph: 'minus',
      style: {}
    });

    if (this.props.onShow) this.props.onShow();
  }

  hide() {
    this.setState({
      hidden: true,
      glyph: 'plus',
      style: {
        height: 16,
        overflow: 'hidden'
      }
    })

    if (this.props.onHide) this.props.onHide();
  }

  toggle() {
    if (this.state.hidden) {
      this.show();
    } else {
      this.hide();
    }

    if (this.props.onToggle) this.props.onToggle();
  }

  maximize() {
    if (this.props.handleMaximize) {
      this.props.handleMaximize();
    }
  }

  renderControls() {
    return (
      <div className='rubix-panel-controls'>
        <Button { ...this.getBtnProps(::this.maximize) }>
          <Icon bundle='fontello' glyph='loop-alt-1' />
        </Button>
        <Button { ...this.getBtnProps(::this.toggle) }>
          <Icon bundle='fontello' glyph={this.state.glyph} />
        </Button>
        <Button { ...this.getBtnProps(::this.remove) }>
          <Icon bundle='fontello' glyph='cancel' />
        </Button>
      </div>
    );
  }

  render() {
    let props = { ...this.props };
    let controls = this.renderControls();

    if (props.controls === false) {
      controls = null;
    } else if (props.controls !== undefined) {
      controls = (
        <div className='rubix-panel-controls'>
          {this.props.controls}
        </div>
      );
    }

    props.className = classNames('rubix-panel-container-with-controls',
                                  props.className,
                                  {
                                    active: this.state.style.height === 16,
                                  });

    let panelClassname = classNames('rubix-panel-container', {
      'bordered': this.props.bordered,
      'panel-plain': this.props.plain,
      'noOverflow': this.props.noOverflow,
      'panel-gutter-bottom': this.props.gutterBottom,
      'panel-collapse-bottom': this.props.collapseBottom,
    }, this.props.containerClasses);

    if (this.state.collapse) return null;

    return (
      <div { ...props } controls={null} children={null}>
        {controls}
        <div className={panelClassname} style={this.state.style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class PanelTabContainer extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    defaultActiveKey: React.PropTypes.any,
    onSelect: React.PropTypes.func,
    generateChildId: React.PropTypes.func,
  };

  render() {
    let props = {
      ...this.props,
      className: classNames('panel-tab-container', this.props.className)
    };

    return (
      <TabContainer id={this.props.id} defaultActiveKey={this.props.defaultActiveKey} onSelect={this.props.onSelect} generateChildId={this.props.generateChildId}>
        <PanelContainer { ...props } id={null} defaultActiveKey={null} onSelect={null} generateChildId={null} />
      </TabContainer>
    );
  }
}

export class Panel extends React.Component {
  static propTypes = {
    horizontal: React.PropTypes.bool
  };

  render() {
    let props = { ...this.props };
    props.className = classNames('rubix-panel', {
      horizontal: props.horizontal
    }, props.className);

    return (
      <div { ...props } children={null}>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export class PanelHeader extends React.Component {
  render() {
    let props = { ...this.props };
    props.className = classNames('rubix-panel-header', props.className);

    return (
      <div { ...props } children={null}>
        {this.props.children}
      </div>
    );
  }
}

export class PanelFooter extends React.Component {
  render() {
    let props = { ...this.props };
    props.className = classNames('rubix-panel-footer', props.className);

    return (
      <div { ...props } children={null}>
        {this.props.children}
      </div>
    );
  }
}

export class PanelLeft extends React.Component {
  render() {
    let props = { ...this.props };
    props.className = classNames('rubix-panel-left', props.className);

    return (
      <div { ...props } children={null}>
        {this.props.children}
      </div>
    );
  }
}

export class PanelRight extends React.Component {
  render() {
    let props = { ...this.props };
    props.className = classNames('rubix-panel-right', props.className);

    return (
      <div { ...props } children={null}>
        {this.props.children}
      </div>
    );
  }
}

export class PanelBody extends React.Component {
  render() {
    let props = { ...this.props };
    props.className = classNames('rubix-panel-body', props.className);

    return (
      <div { ...props } children={null}>
        {this.props.children}
      </div>
    );
  }
}
