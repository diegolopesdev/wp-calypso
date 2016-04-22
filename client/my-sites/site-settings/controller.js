/**
 * External Dependencies
 */
import ReactDom from 'react-dom';
import React from 'react';
import page from 'page';

/**
 * Internal Dependencies
 */
import sitesFactory from 'lib/sites-list';
import route from 'lib/route';
import i18n from 'lib/mixins/i18n';
import { renderWithReduxStore } from 'lib/react-helpers';
import config from 'config';
import analytics from 'lib/analytics';
import titlecase from 'to-title-case';
import SitePurchasesData from 'components/data/purchases/site-purchases';
import { SiteSettingsComponent } from 'my-sites/site-settings/main';
import DeleteSite from './delete-site';
import StartOver from './start-over';
import utils from 'lib/site/utils';
import titleActions from 'lib/screen-title/actions';

/**
 * Module vars
 */
const sites = sitesFactory();

const canDeleteSite = site => {
	return site.capabilities &&
		site.capabilities.manage_options &&
		! site.jetpack &&
		! site.is_vip;
};

module.exports = {
	redirectToGeneral() {
		page.redirect( '/settings/general' );
	},

	siteSettings( context ) {
		const basePath = route.sectionify( context.path );
		const FIVE_MINUTES = 5 * 60 * 1000;
		let analyticsPageTitle = 'Site Settings';

		titleActions.setTitle( i18n.translate( 'Site Settings', { textOnly: true } ),
			{ siteID: route.getSiteFragment( context.path ) }
		);

		let site = sites.getSelectedSite();

		// if site loaded, but user cannot manage site, redirect
		if ( site && ! utils.userCan( 'manage_options', site ) ) {
			page.redirect( '/stats' );
			return;
		}

		// if user went directly to jetpack settings page, redirect
		if ( site.jetpack && ! config.isEnabled( 'manage/jetpack' ) ) {
			window.location.href = `//wordpress.com/manage/${ site.ID }`;
			return;
		}

		if (
			! site.latestSettings ||
			new Date().getTime() - site.latestSettings > ( FIVE_MINUTES )
		) {
			if ( sites.initialized ) {
				site.fetchSettings();
			} else {
				sites.once( 'change', () => {
					site = sites.getSelectedSite();
					site.fetchSettings();
				} );
			}
		}

		renderWithReduxStore(
			<SitePurchasesData>
				<SiteSettingsComponent
					context={ context }
					sites={ sites }
					section={ context.params.section }
					path={ context.path } />
			</SitePurchasesData>,
			document.getElementById( 'primary' ),
			context.store
		);

		// analytics tracking
		if ( 'undefined' !== typeof context.params.section ) {
			analyticsPageTitle += ` > ${ titlecase( context.params.section ) }`;
		}
		analytics.pageView.record( `${ basePath }/:site`, analyticsPageTitle );
	},

	importSite( context ) {
		ReactDom.render(
			<SiteSettingsComponent
				context={ context }
				sites={ sites }
				section="import"
				path={ context.path } />,
			document.getElementById( 'primary' )
		);
	},

	exportSite( context ) {
		ReactDom.render(
			<SiteSettingsComponent
				context={ context }
				sites={ sites }
				section="export"
				path={ context.path } />,
			document.getElementById( 'primary' )
		);
	},

	deleteSite( context ) {
		let site = sites.getSelectedSite();

		if ( sites.initialized ) {
			if ( ! canDeleteSite( site ) ) {
				return page( `/settings/general/${ site.slug }` );
			}
		} else {
			sites.once( 'change', () => {
				site = sites.getSelectedSite();
				if ( ! canDeleteSite( site ) ) {
					return page( `/settings/general/${ site.slug }` );
				}
			} );
		}

		ReactDom.render(
			<SitePurchasesData>
				<DeleteSite
					context={ context }
					sites={ sites }
					path={ context.path } />
			</SitePurchasesData>,
			document.getElementById( 'primary' )
		);
	},

	startOver( context ) {
		let site = sites.getSelectedSite();

		if ( sites.initialized ) {
			if ( ! canDeleteSite( site ) ) {
				return page( `/settings/general/${ site.slug }` );
			}
		} else {
			sites.once( 'change', () => {
				site = sites.getSelectedSite();
				if ( ! canDeleteSite( site ) ) {
					return page( `/settings/general/${ site.slug }` );
				}
			} );
		}

		ReactDom.render(
			<StartOver
				context={ context }
				sites={ sites }
				path={ context.path } />,
			document.getElementById( 'primary' )
		);
	},

	legacyRedirects( context, next ) {
		const { section } = context.params;

		if ( ! context ) {
			return page( '/me/public-profile' );
		}

		const redirectMap = {
			account: '/me/account',
			password: '/me/security',
			'public-profile': '/me/public-profile',
			notifications: '/me/notifications',
			disbursements: '/me/public-profile',
			earnings: '/me/public-profile',
			'billing-history': '/me/billing',
			'billing-history-v2': '/me/billing',
			'connected-apps': '/me/security/connected-applications'
		};
		if ( redirectMap[ section ] ) {
			return page.redirect( redirectMap[ section ] );
		}
		next();
	},

	setScroll( context, next ) {
		window.scroll( 0, 0 );
		next();
	}
};
