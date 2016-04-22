/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { SITE_DOMAINS_FETCH_COMPLETED } from 'state/action-types';
import { fetchSiteDomainsCompleted } from '../actions';

describe( 'actions', () => {
	describe( '#fetchSiteDomainsCompleted()', () => {
		it( 'should return an action object with an array of domains', () => {
			const siteId = 2916284;
			const action = fetchSiteDomainsCompleted( siteId, {} );

			expect( action ).to.eql( {
				type: SITE_DOMAINS_FETCH_COMPLETED,
				siteId,
				domains: []
			} );
		} );
	} );
} );
