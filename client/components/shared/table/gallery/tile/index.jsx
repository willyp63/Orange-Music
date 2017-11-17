import React from 'react';
import classNames from 'classnames';
import { getNestedFieldValue } from '../../../../../util/nested_field';
import { getImageUrl, EMPTY_IMG_SRC } from '../../../../../util/image';
import { getPlayActionModel, getNonPlayActionModels } from '../../../../../schemas/action';
import MoreButton from '../../shared/more_button';
import PlayableImage from '../../shared/playable_image';
import Link from '../../../link';

const IMAGE_IDX = 3;

class GalleryTile extends React.Component {
  render() {
    const { entity, schema, actions } = this.props;

    const title = getNestedFieldValue(entity, schema.titlePath);
    const subtitle = getNestedFieldValue(entity, schema.subtitlePath);
    const image = getNestedFieldValue(entity, schema.imagePath);

    const imageSrc = image ? getImageUrl(image, IMAGE_IDX) : EMPTY_IMG_SRC;

    const playActionModel = getPlayActionModel({entity, schema, actions});
    const nonPlayActionModels = getNonPlayActionModels({entity, schema, actions});

    const hasMoreButton = nonPlayActionModels.length !== 0;
    const $moreButton = hasMoreButton
      ? (<MoreButton actionModels={nonPlayActionModels} />)
      : '';

    const onImageClick = playActionModel ? playActionModel.action : () => {};

    const titleLinkLocation = schema.titleLinkLocation ? schema.titleLinkLocation(title) : null;
    const subtitleLinkLocation = schema.subtitleLinkLocation ? schema.subtitleLinkLocation(subtitle) : null;

    const $divider = subtitle ? (<div className='divider'></div>) : '';

    return (
      <div className={classNames('tile', {'no-play-icon': !playActionModel, 'no-more-btn': !hasMoreButton})}>
        <PlayableImage imageSrc={imageSrc} onClick={onImageClick}>
          {$moreButton}
        </PlayableImage>
        <div className='info'>
          <Link className='title' label={title} linkLocation={titleLinkLocation} />
          {$divider}
          <Link className='subtitle' label={subtitle} linkLocation={subtitleLinkLocation} />
        </div>
      </div>
    );
  }
}

export default GalleryTile;
