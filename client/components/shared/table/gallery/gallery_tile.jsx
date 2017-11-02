import React from 'react';
import ReactDOM from 'react-dom';
import { isNotEmpty, isEmpty } from '../../../../util/empty';
import { EMPTY_IMG_SRC, getImageUrl } from '../../../../util/image';
import { getNestedFieldValue } from '../../../../util/nested_field';
import { MatChip, MatButton } from '../../../material/index';

const IMAGE_IDX = 3;

class GalleryTile extends React.Component {
  render() {
    const { entity, schema, actions } = this.props;

    const image = getNestedFieldValue(entity, schema.imagePath);
    const title = getNestedFieldValue(entity, schema.titlePath);
    const subtitle = getNestedFieldValue(entity, schema.subtitlePath);

    const imageSrc = image ? getImageUrl(image, IMAGE_IDX) : EMPTY_IMG_SRC;
    const imageClassName = imageSrc === EMPTY_IMG_SRC ? 'bordered' : '';

    const TitleChipComponent = schema.titleChipComponent || MatChip;
    const $titleChip = title
      ? (<TitleChipComponent className='title' text={title} actions={actions} />)
      : '';
    const SubtitleChipComponent = schema.subtitleChipComponent || MatChip;
    const $subtitleChip = subtitle
      ? (<SubtitleChipComponent className='subtitle' text={subtitle} actions={actions} />)
      : '';

    const $buttons = Object.keys(schema.actions).map((actionType) => {
      const action = schema.actions[actionType];
      return (
        <MatButton className={action.buttonClassName}
                   icon={action.icon}
                   tooltipText={action.tooltipText}
                   key={actionType}
                   onClick={() => {
                     if (typeof actions[action.actionName] === 'function') {
                       actions[action.actionName](entity);
                     }
                   }} />
      )
    });

    const actionsDrawerStyle = isEmpty($buttons) ? {height: 0} : {};

    return (
      <div className="tile">
        <img src={imageSrc} className={imageClassName} />
        <div className="info">
          {$titleChip}
          {$subtitleChip}
        </div>
        <div className="actions-drawer" style={actionsDrawerStyle}>
          {$buttons}
        </div>
      </div>
    );
  }
}

export default GalleryTile;
