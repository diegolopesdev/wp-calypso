/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { fetchSitePurchases } from 'lib/upgrades/actions';
import PurchasesStore from 'lib/purchases/store';
import StoreConnection from 'components/data/store-connection';
import sitesFactory from 'lib/sites-list';
import QuerySiteDomains from 'components/data/query-site-domains';
import { getDomainsBySite } from 'state/sites/domains/selectors';

/**
 * Module variables
 */
const sites = sitesFactory(),
	stores = [
		PurchasesStore,
		sites
	];

function getStateFromStores( props ) {
	return {
		purchases: PurchasesStore.getBySite( sites.getSelectedSite().ID ),
		selectedSite: sites.getSelectedSite().ID,
		siteDomains: props.siteDomains
	};
}

const SitePurchasesData = React.createClass( {
	shouldFetchPurchases() {
		const purchases = PurchasesStore.get();
		const selectedSite = sites.getSelectedSite();

		return selectedSite &&
			! purchases.isFetchingSitePurchases &&
			! purchases.hasLoadedSitePurchasesFromServer;
	},

	componentWillMount() {
		if ( this.shouldFetchPurchases() ) {
			fetchSitePurchases( sites.getSelectedSite().ID );
		}

		this.previousSelectedSite = sites.getSelectedSite();
	},

	componentWillReceiveProps() {
		if ( this.shouldFetchPurchases() || sites.getSelectedSite() !== this.previousSelectedSite ) {
			fetchSitePurchases( sites.getSelectedSite().ID );

			this.previousSelectedSite = sites.getSelectedSite();
		}
	},

	render() {
		const selectedSite = sites.getSelectedSite();
		return (
			<div>
				<StoreConnection
					component={ this.props.component }
					stores={ stores }
					getStateFromStores={ getStateFromStores }
					siteDomains={ this.props.siteDomains }
				>
					{ this.props.children }
				</StoreConnection>
				{
					selectedSite &&
					<QuerySiteDomains siteId={ selectedSite.ID } />
				}
			</div>
		);
	}
} );

export default connect(
	function( state, props ) {
		const _sites = props.sites || props.children && props.children.props
			? props.children.props.sites
			: null;

		if ( ! _sites ) {
			return null;
		}

		const selectedSite = _sites.getSelectedSite();
		const siteDomains = getDomainsBySite( state, selectedSite );

		return { siteDomains };
	}
)( SitePurchasesData );
