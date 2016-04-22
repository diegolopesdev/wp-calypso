/**
 * Internal dependencies
 */
import { initialSiteState } from './reducer';

export const getDomainsBySiteId = ( state, siteId ) => {
	if ( ! siteId ) {
		return initialSiteState;
	}
	return state.sites.domains[ siteId ] || initialSiteState;
};

export const getDomainsBySite = ( state, site ) => {
	if ( ! site ) {
		return initialSiteState;
	}
	return getDomainsBySiteId( state, site.ID );
};

export const isRequestingSiteDomains = ( state, siteId ) => {
	const domains = getDomainsBySiteId( state, siteId );
	return domains.isRequesting;
};
