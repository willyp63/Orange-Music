import React from 'react';
import ReactDOM from 'react-dom';

import NowPlayingTableComponent from './now_playing_table/now_playing_table';
import QueueTableHeaderComponent from './queue_table/queue_table_header';
import QueueTableComponent from './queue_table/queue_table';

const BOX_SHADOW_STYLE = Object.freeze({
  'border-bottom': '1px solid rgba(0, 0, 0, 0)',
  'box-shadow': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
});

const BORDER_STYLE = Object.freeze({
  'border-bottom': '1px solid #e0e0e0',
  'box-shadow': 'none'
});

class QueueComponent extends React.Component {
  componentDidMount() {
    this.scrollHandler = this.updateNavBarStyle.bind(this);
    $(document).scroll(this.scrollHandler);
    this.scrollHandler();
  }
  componentWillUnmount() {
    $(document).off('scroll', this.scrollHandler);
  }
  updateNavBarStyle() {
    const style = $(window).scrollTop() !== 0
      ? BOX_SHADOW_STYLE
      : BORDER_STYLE;
    $(ReactDOM.findDOMNode(this))
      .find('.nav-bar')
      .css(style);
  }
  render() {
    return (
      <div className="queue">
        <div className="nav-bar">
          <div className="now-playing-label">
            Now Playing
          </div>
          <div className="now-playing-table-container">
            <NowPlayingTableComponent />
          </div>
          <div className="queue-label">
            Up Next
          </div>
          <div className="queue-table-header-container">
            <QueueTableHeaderComponent />
          </div>
        </div>
        <div className="queue-table-container">
          <QueueTableComponent />
        </div>
      </div>
    );
  }
}

const updateNavBarStyle = (_) => {
  $('.nav-bar').css($(window).scrollTop() !== 0
      ? BOX_SHADOW_STYLE
      : BORDER_STYLE);
};

export default QueueComponent;
