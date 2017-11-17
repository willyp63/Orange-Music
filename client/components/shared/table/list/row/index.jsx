import React from 'react';
import { getNestedFieldValue } from '../../../../../util/nested_field';
import MoreButton from '../../shared/more_button';
import PlayableImage from '../../shared/playable_image';
import Link from '../../../link';
import { GRID } from '../../../../material';


const IMAGE_IDX = 2;

class Row extends React.Component {
	render() {
		const { entity, schema, actions } = this.props;

		const title = getNestedFieldValue(entity, schema.titlePath);
	  const subtitle = getNestedFieldValue(entity, schema.subtitlePath);

	  return (
	    <div className='row' onMouseLeave={() => this.moreButton.closeMenu()}>
	      <div className="img-cell">
	        <PlayableImage entity={entity} schema={schema} actions={actions} imageIdx={IMAGE_IDX} />
	      </div>
	      <div className="title-cell" style={{flexBasis: subtitle ? '50%' : '100%'}}>
	        <Link label={title}
	              linkLocation={schema.titleLinkLocation ? schema.titleLinkLocation(title) : null}
	              className='title' />
	      </div>
	      <div className="subtitle-cell" style={{flexBasis: subtitle ? '50%' : '0', padding: subtitle ? GRID : 0}}>
	        <Link label={subtitle}
			          linkLocation={schema.subtitleLinkLocation ? schema.subtitleLinkLocation(subtitle) : null}
			          className='subtitle' />
	      </div>
	      <div className="more-btn-cell">
	        <MoreButton entity={entity} schema={schema} actions={actions} ref={el => this.moreButton = el} />
	      </div>
	    </div>
	  );
	}
}

export default Row;
