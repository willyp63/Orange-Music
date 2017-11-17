import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class MatPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this._render = this._render.bind(this);
  }
  componentDidMount() {
    this.popupTarget = document.createElement('div');
    document.body.appendChild(this.popupTarget);
    this._render();
  }
  componentWillReceiveProps(newProps) {
    this._render(newProps);
  }
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.popupTarget);
    document.body.removeChild(this.popupTarget);
  }
  _render(props) {
    let { isOpen, children, className, reference } = props || this.props;
    this.popupTarget.className = 'mat-popup-overlay';
    const popupClassName = classNames('mat-popup', {open: isOpen});
    ReactDOM.render(<div className={popupClassName}><div className={className}>{children}</div></div>, this.popupTarget);
    if (typeof reference === 'function') { reference(this.popupTarget); }
  }
  render() {
    return <noscript />
  }
}

export default MatPopup;
