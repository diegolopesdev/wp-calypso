/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { domains } from '../reducer';
import {
	SITE_DOMAINS_FETCH,
	SITE_DOMAINS_FETCH_COMPLETED,
	SITE_DOMAINS_FETCH_FAILED,
	SERIALIZE,
	DESERIALIZE
} from 'state/action-types';

describe( 'reducer', () => {
	describe( '#domains()', () => {
		it( 'should return an empty state when original state is undefined and action is empty', () => {
			const state = domains( undefined, {} );

			expect( state ).to.eql( {} );
		} );

		it( 'should return an empty state when original state and action are empty', () => {
			const original = Object.freeze( {} );
			const state = domains( original, {} );

			expect( state ).to.eql( original );
		} );

		it( 'should return an empty state when original state is undefined and action is unknown', () => {
			const state = domains( undefined, {
				type: 'SAY_HELLO',
				siteId: 11111111
			} );

			expect( state ).to.eql( {} );
		} );

		it( 'should return the original state when action is unknown', () => {
			const original = Object.freeze( {
				11111111: {
					data: [],
					error: null,
					hasLoadedFromServer: true,
					isRequesting: false
				}
			} );

			const state = domains( original, {
				type: 'MAKE_COFFEE',
				siteId: 11111111
			} );

			expect( state ).to.eql( original );
		} );

		it( 'should return the initial state with requesting enabled when fetching is triggered', () => {
			const state = domains( undefined, {
				type: SITE_DOMAINS_FETCH,
				siteId: 11111111
			} );

			expect( state ).to.eql( {
				11111111: {
					data: null,
					error: null,
					hasLoadedFromServer: false,
					isRequesting: true
				}
			} );
		} );

		it( 'should return the original state with an error and requesting disabled when fetching failed', () => {
			const original = Object.freeze( {
				11111111: {
					data: [],
					error: null,
					hasLoadedFromServer: true,
					isRequesting: true
				}
			} );

			const state = domains( original, {
				type: SITE_DOMAINS_FETCH_FAILED,
				siteId: 11111111,
				error: 'Unable to fetch site domains'
			} );

			expect( state ).to.eql( {
				11111111: {
					data: [],
					error: 'Unable to fetch site domains',
					hasLoadedFromServer: true,
					isRequesting: false
				}
			} );
		} );

		it( 'should return a list of domains with loaded from server enabled and requesting disabled when fetching completed', () => {
			const state = domains( undefined, {
				type: SITE_DOMAINS_FETCH_COMPLETED,
				siteId: 11111111,
				domains: []
			} );

			expect( state ).to.eql( {
				11111111: {
					data: [],
					error: null,
					hasLoadedFromServer: true,
					isRequesting: false
				}
			} );
		} );

		it( 'should accumulate domains for different sites', () => {
			const original = Object.freeze( {
				11111111: {
					data: [],
					error: null,
					hasLoadedFromServer: true,
					isRequesting: false
				}
			} );

			const state = domains( original, {
				type: SITE_DOMAINS_FETCH,
				siteId: 55555555
			} );

			expect( state ).to.eql( {
				11111111: {
					data: [],
					error: null,
					hasLoadedFromServer: true,
					isRequesting: false
				},
				55555555: {
					data: null,
					error: null,
					hasLoadedFromServer: false,
					isRequesting: true
				}
			} );
		} );

		it( 'should override previous domains of the same site', () => {
			const original = Object.freeze( {
				11111111: {
					data: null,
					error: 'Unable to fetch site domains',
					hasLoadedFromServer: false,
					isRequesting: false
				}
			} );

			const state = domains( original, {
				type: SITE_DOMAINS_FETCH,
				siteId: 11111111
			} );

			expect( state ).to.eql( {
				11111111: {
					data: null,
					error: null,
					hasLoadedFromServer: false,
					isRequesting: true
				}
			} );
		} );

		it( 'never persists state because this is not implemented', () => {
			const original = Object.freeze( {
				11111111: {
					data: null,
					error: 'Unable to fetch site domains',
					hasLoadedFromServer: false,
					isRequesting: false
				}
			} );

			const state = domains( original, {
				type: SERIALIZE
			} );

			expect( state ).to.eql( {} );
		} );

		it( 'never loads persisted state because this is not implemented', () => {
			const original = Object.freeze( {
				11111111: {
					data: null,
					error: null,
					hasLoadedFromServer: false,
					isRequesting: false
				},
				22222222: {
					data: [],
					error: null,
					hasLoadedFromServer: true,
					isRequesting: false
				}
			} );

			const state = domains( original, {
				type: DESERIALIZE
			} );

			expect( state ).to.eql( {} );
		} );
	} );
} );
