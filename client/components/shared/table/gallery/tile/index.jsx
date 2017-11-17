import React from 'react';
import { getNestedFieldValue } from '../../../../../util/nested_field';
import MoreButton from '../../shared/more_button';
import PlayableImage from '../../shared/playable_image';
import Link from '../../../link';

const IMAGE_IDX = 3;

class GalleryTile extends React.Component {
  render() {
    const { entity, schema, actions } = this.props;

    const title = getNestedFieldValue(entity, schema.titlePath);
    const subtitle = getNestedFieldValue(entity, schema.subtitlePath);

    const $divider = subtitle ? (<div className="divider"></div>) : '';

    return (
      <div className="tile">
        <PlayableImage entity={entity} schema={schema} actions={actions} imageIdx={IMAGE_IDX} onMouseLeave={() => {
          this.moreButton.closeMenu();
        }}>
          <MoreButton entity={entity} schema={schema} actions={actions} ref={el => this.moreButton = el} />
        </PlayableImage>
        <div className="info">
          <Link label={title}
                linkLocation={schema.titleLinkLocation ? schema.titleLinkLocation(title) : null}
                className='title' />
          {$divider}
          <Link label={subtitle}
                linkLocation={schema.subtitleLinkLocation ? schema.subtitleLinkLocation(subtitle) : null}
                className='subtitle' />
        </div>
      </div>
    );
  }
}

export default GalleryTile;
