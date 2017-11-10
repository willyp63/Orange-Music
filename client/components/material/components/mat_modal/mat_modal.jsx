import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class MatModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this._render = this._render.bind(this);
  }
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    document.body.appendChild(this.modalTarget);
    this._render();
  }
  componentWillReceiveProps(newProps) {
    this._render(newProps);
  }
  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }
  _render(props) {
    const { isOpen, children, className } = props || this.props;
    this.modalTarget.className = classNames('mat-overlay', {open: isOpen});
    const modalClassName = classNames('mat-modal', className, {open: isOpen});
    ReactDOM.render(<div className={modalClassName}>{children}</div>, this.modalTarget);
  }
  render() {
    return <noscript />
  }
}

export default MatModal;
