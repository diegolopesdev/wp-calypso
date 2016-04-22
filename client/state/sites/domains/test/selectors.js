/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	getDomainsBySite,
	getDomainsBySiteId,
	isRequestingSiteDomains
} from '../selectors';

describe( 'selectors', () => {
	describe( '#getDomainsBySite()', () => {
		it( 'should return domains by site', () => {
			const domain_1 = {
				data: [
					{ primaryDomain: false },
					{ primaryDomain: false },
					{ primaryDomain: true }
				]
			};

			const domain_2 = {
				data: [
					{ primaryDomain: true },
					{ primaryDomain: false },
					{ primaryDomain: false }
				]
			};

			const state = {
				sites: {
					domains: {
						2916284: domain_1,
						77203074: domain_2
					}
				}
			};

			const domains = getDomainsBySite( state, { ID: 77203074 } );
			expect( domains ).to.eql( domain_2 );
		} );
	} );

	describe( '#getDomainsBySiteId()', () => {
		it( 'should return domains by site id', () => {
			const domain_1 = {
				data: [
					{ primaryDomain: false },
					{ primaryDomain: false },
					{ primaryDomain: true }
				]
			};

			const domain_2 = {
				data: [
					{ primaryDomain: true },
					{ primaryDomain: false },
					{ primaryDomain: false }
				]
			};

			const state = {
				sites: {
					domains: {
						2916284: domain_1,
						77203074: domain_2
					}
				}
			};

			const domains = getDomainsBySiteId( state, 2916284 );
			expect( domains ).to.eql( domain_1 );
		} );
	} );

	describe( '#isRequestingSiteDomains()', () => {
		it( 'should return true if we are fetching domains', () => {
			const state = {
				sites: {
					domains: {
						2916284: {
							data: null,
							error: null,
							hasLoadedFromServer: false,
							isRequesting: true
						},
						77203074: {
							data: null,
							error: null,
							hasLoadedFromServer: false,
							isRequesting: false
						}
					}
				}
			};

			expect( isRequestingSiteDomains( state, 2916284 ) ).to.equal( true );
			expect( isRequestingSiteDomains( state, 77203074 ) ).to.equal( false );
			expect( isRequestingSiteDomains( state, 'unknown' ) ).to.equal( false );
		} );
	} );
} );
