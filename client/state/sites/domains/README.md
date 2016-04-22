Site Domains
============

A module for managing site domains data.

## Actions

Used in combination with the Redux store instance `dispatch` function, actions can be used in manipulating the current global state.

### `fetchSiteDomains( siteId: Number )`

Fetches domains for the site with the given site ID.

### `fetchSiteDomainsCompleted( siteId: Number, data: Object )`

Adds the domains fetched from the API to the set of domains for the given site ID.

### `refreshSiteDomains( siteID: Number )`

Clears domains and fetches them for the given site.

```js
import { fetchSiteDomains, fetchSiteDomainsCompleted } from 'state/sites/domains/actions';

dispatch( fetchSiteDomains( 555555555 ) );
dispatch( fetchSiteDomainsCompleted( 555555555, { 1: { ... }, 1003: { ... }, 1008: { ... } } ) );
```

## Reducer
Data from the aforementioned actions is added to the global state tree, under `sites.domains`, with the following structure:

```js
state.sites.domains = {
	555555555: [
		{
			autoRenewalDate: String,
			autoRenewing: Number,
			blogId: Number,
			canSetAsPrimary: Boolean,
			domain: String,
			expired: Boolean,
			expiry: setMomentType,
			expirySoon: Boolean,
			googleAppsSubscription: String,
			hasPrivateRegistration: Boolean,
			hasRegistration: Boolean,
			hasZone: Boolean,
			isPendingIcannVerification: Boolean,
			manualTransferRequired: Boolean,
			newRegistration: Boolean,
			partnerDomain: Boolean,
			pendingRegistration: Boolean,
			pendingRegistrationTime: String,
			primaryDomain: Boolean,
			privateDomain: Boolean,
			registrationDate: String.
			type: String,
			wpcomDomain: Boolean
		}
	]
}
```
