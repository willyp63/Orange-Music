import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import history from '../../../../history';
import { getNestedFieldValue } from '../../../../util/nested_field';
import { getImageUrl, EMPTY_IMG_SRC } from '../../../../util/image';
import { UNIVERSAL_ACTION_TYPES } from '../../../../schemas/action/universal';

const IMAGE_IDX = 3;

class GalleryTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isMoreMenuOpen: false};
  }
  render() {
    const { entity, schema, actions } = this.props;
    const { isMoreMenuOpen } = this.state;


    const image = getNestedFieldValue(entity, schema.imagePath);
    const title = getNestedFieldValue(entity, schema.titlePath);
    const subtitle = getNestedFieldValue(entity, schema.subtitlePath);


    const imageSrc = image ? getImageUrl(image, IMAGE_IDX) : EMPTY_IMG_SRC;


    let $title = '';
    if (title) {
      if (schema.titleLinkLocation) {
        const linkLocation = schema.titleLinkLocation(title);
        $title = (
          <span className='title link'
                onClick={() => history.pushLocation(linkLocation.pathname, linkLocation.search)}>
            {title}
          </span>
        );
      } else {
        $title = (<span className='title'>{title}</span>);
      }
    }

    let $subtitle = '';
    if (subtitle) {
      if (schema.subtitleLinkLocation) {
        const linkLocation = schema.subtitleLinkLocation(subtitle);
        $subtitle = (
          <span className='subtitle link'
                onClick={() => history.pushLocation(linkLocation.pathname, linkLocation.search)}>
            {subtitle}
          </span>
        );
      } else {
        $subtitle = (<span className='subtitle'>{subtitle}</span>);
      }
    }


    const menuActions = Object.keys(schema.actions).filter((actionType) => {
      return actionType !== UNIVERSAL_ACTION_TYPES.PLAY;
    });

    const playAction = Object.keys(schema.actions).includes(UNIVERSAL_ACTION_TYPES.PLAY)
      ? actions[schema.actions[UNIVERSAL_ACTION_TYPES.PLAY].actionName].bind(null, entity)
      : null;

    const $menuItems = menuActions.map((actionType) => {
      const action = schema.actions[actionType];
      return (
        <Button className='menu-item'
                key={action.label}
                onClick={(e) => actions[action.actionName](entity)}>
          {action.label}
        </Button>
      );
    });

    const $moreButton = menuActions.length > 0
      ? (
        <Button className='more-btn' raised={true}
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({isMoreMenuOpen: !isMoreMenuOpen}, () => {
                    $(ReactDOM.findDOMNode(this)).find('.more-menu button')[0].focus();
                  });
                }}>
          <i className='material-icons'>more_horiz</i>
        </Button>
      ) : '';

    const $playIconWrap = playAction
      ?(
        <div className='play-icon-wrap'>
          <i className='material-icons play-icon'>play_circle_outline</i>
        </div>
      ) : '';

    const $imageOverlay = $playIconWrap || $moreButton
      ? (
        <div className='img-overlay'
             onClick={() => { if (playAction) { playAction(); } }}
             onMouseLeave={() => this.setState({isMoreMenuOpen: false})}>
          {$playIconWrap}
          {$moreButton}
          <div className={classNames('more-menu', {open: isMoreMenuOpen})}
               onClick={(e) => {
                 e.stopPropagation();
                 this.setState({isMoreMenuOpen: true});
               }}
               onBlur={() => this.setState({isMoreMenuOpen: false})}>
            {$menuItems}
          </div>
        </div>
      ) : '';

    const $divider = $subtitle ? (<div className="divider"></div>) : '';

    return (
      <div className="tile">
        <img src={imageSrc} className={classNames({bordered: imageSrc === EMPTY_IMG_SRC})} />
        {$imageOverlay}
        <div className="info">
          {$title}
          {$divider}
          {$subtitle}
        </div>
      </div>
    );
  }
}

export default GalleryTile;
