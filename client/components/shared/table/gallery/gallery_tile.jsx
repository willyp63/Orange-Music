import React from 'react';
import { isNotEmpty, isEmpty } from '../../../../util/empty';
import { EMPTY_IMG_SRC } from '../../../../util/image';
import { getNestedFieldValue } from '../../../../util/nested_field';
import { getImageUrl } from '../../../../api/last_fm/last_fm_api';
import { MatChip, MatButton } from '../../../material/index';

const IMAGE_IDX = 3;

const GalleryTile = ({entity, schema, actions}) => {
  const image = getNestedFieldValue(entity, schema.imagePath);
  const title = getNestedFieldValue(entity, schema.titlePath);
  const subtitle = getNestedFieldValue(entity, schema.subtitlePath);

  const imageSrc = image ? getImageUrl(image, IMAGE_IDX) : EMPTY_IMG_SRC;
  const imageClassName = imageSrc === EMPTY_IMG_SRC ? 'bordered' : '';

  const $titleChip = title ? (<MatChip className='title' text={title} />) : '';
  const $subtitleChip = subtitle
    ? (<MatChip className='subtitle' text={subtitle} />)
    : '';

  const $buttons = Object.keys(schema.actions).map((actionType) => {
    const action = schema.actions[actionType];
    return (
      <MatButton className={action.buttonClassName}
                 icon={action.icon}
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
};

export default GalleryTile;
