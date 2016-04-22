/**
 * External dependencies
 */
import debugFactory from 'debug';
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import { createSiteDomainObject } from './assembler';
import i18n from 'lib/mixins/i18n';
import wpcom from 'lib/wp';
import {
	SITE_DOMAINS_FETCH,
	SITE_DOMAINS_FETCH_COMPLETED,
	SITE_DOMAINS_FETCH_FAILED,
} from 'state/action-types';

/**
 * Module vars
 */
const debug = debugFactory( 'calypso:site-domains:actions' );

/**
 * Fetches domains for the given site.
 *
 * @param {Number} siteId - identifier of the site
 * @returns {Function} a promise that will resolve once fetching is completed
 */
export function fetchSiteDomains( siteId ) {
	return dispatch => {
		dispatch( {
			type: SITE_DOMAINS_FETCH,
			siteId
		} );

		return new Promise( resolve => {
			wpcom
			.site( siteId )
			.domainsList( ( error, data ) => {
				if ( error ) {
					debug( 'Fetching site domains failed: ', error );

					const errorMessage = error.message || i18n.translate( 'There was a problem fetching site domains. Please try again later or contact support.' );

					dispatch( {
						type: SITE_DOMAINS_FETCH_FAILED,
						siteId,
						error: errorMessage
					} );

					return;
				}

				dispatch( fetchSiteDomainsCompleted( siteId, data ) );
				resolve();
			} );
		} );
	};
}

/**
 * Returns an action object to be used in signalling that an object containing
 * the domains for a given site have been received.
 *
 * @param {Number} siteId - identifier of the site
 * @param {Object} data - list of domains received from the API
 * @returns {Object} the corresponding action object
 */
export function fetchSiteDomainsCompleted( siteId, data ) {
	const { domains } = data;

	return {
		type: SITE_DOMAINS_FETCH_COMPLETED,
		siteId,
		domains: map( domains, createSiteDomainObject )
	};
}

/**
 * Clears domains and fetches them for the given site.
 *
 * @param {Number} siteId - identifier of the site
 * @returns {Function} the corresponding action thunk
 */
export function refreshSiteDomains( siteId ) {
	return dispatch => {
		dispatch( fetchSiteDomains( siteId ) );
	};
}
