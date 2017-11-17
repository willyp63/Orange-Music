import React from 'react';
import classNames from 'classnames';
import { getNestedFieldValue } from '../../../../../util/nested_field';
import { getImageUrl, EMPTY_IMG_SRC } from '../../../../../util/image';
import MoreButton from '../../shared/more_button';
import PlayableImage from '../../shared/playable_image';
import Link from '../../../link';
import { GRID } from '../../../../material';
import { getPlayActionModel, getNonPlayActionModels } from '../../../../../schemas/action';

const IMAGE_IDX = 2;

class Row extends React.Component {
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

    const titleStyle = {flexBasis: subtitle ? '50%' : '100%'};
    const subtitleStyle = {flexBasis: subtitle ? '50%' : '0', padding: subtitle ? GRID : 0};

	  return (
	    <div className={classNames('row', {'no-play-icon': !playActionModel, 'no-more-btn': !hasMoreButton})}>
	      <div className="img-cell">
	        <PlayableImage imageSrc={imageSrc} onClick={onImageClick} />
	      </div>
	      <div className="title-cell" style={titleStyle}>
	        <Link className='title' label={title} linkLocation={titleLinkLocation} />
	      </div>
	      <div className="subtitle-cell" style={subtitleStyle}>
	        <Link className='subtitle' label={subtitle} linkLocation={subtitleLinkLocation} />
	      </div>
	      <div className="more-btn-cell">
	        {$moreButton}
	      </div>
	    </div>
	  );
	}
}

export default Row;
