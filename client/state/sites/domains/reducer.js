/**
 * Internal dependencies
 */
import {
	SITE_DOMAINS_FETCH,
	SITE_DOMAINS_FETCH_COMPLETED,
	SITE_DOMAINS_FETCH_FAILED,
	SERIALIZE,
	DESERIALIZE
} from 'state/action-types';

export const initialSiteState = {
	data: null,
	error: null,
	hasLoadedFromServer: false,
	isRequesting: false
};

/**
 * Returns a new state with the given attributes updated for the specified site.
 *
 * @param {Object} state - current state
 * @param {Number} siteId - identifier of the site
 * @param {Object} attributes - list of attributes and their values
 * @returns {Object} the new state
 */
const updateSiteState = ( state, siteId, attributes ) => {
	return Object.assign(
		{},
		state,
		{
			[ siteId ]: Object.assign( {}, initialSiteState, state[ siteId ], attributes )
		}
	);
};

export const domains = ( state = {}, action ) => {
	switch ( action.type ) {
		case SITE_DOMAINS_FETCH:
			return updateSiteState( state, action.siteId, {
				error: null,
				isRequesting: true
			} );
			break;

		case SITE_DOMAINS_FETCH_COMPLETED:
			return updateSiteState( state, action.siteId, {
				error: null,
				hasLoadedFromServer: true,
				isRequesting: false,
				data: action.domains
			} );
			break;

		case SITE_DOMAINS_FETCH_FAILED:
			return updateSiteState( state, action.siteId, {
				error: action.error,
				isRequesting: false
			} );
			break;

		case SERIALIZE:
			return {};
			break;

		case DESERIALIZE:
			return {};
			break;
	}

	return state;
};
