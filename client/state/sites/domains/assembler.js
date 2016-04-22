/**
 * External dependencies
 */
import moment from 'moment';

const setMomentType = date => {
	return date
		? moment( date ).startOf( 'day' )
		: date;
};

export const createSiteDomainObject = domain => {
	return {
		autoRenewalDate: domain.auto_renewal_date,
		autoRenewing: Number( domain.auto_renewing ),
		blogId: Number( domain.id ),
		canSetAsPrimary: Boolean( domain.can_set_as_primary ),
		domain: String( domain.domain ),
		expired: Boolean( domain.expired ),
		expiry: setMomentType( domain.expiry ),
		expirySoon: Boolean( domain.expiry_soon ),
		googleAppsSubscription: domain.google_apps_subscription,
		hasPrivateRegistration: Boolean( domain.has_private_registration ),
		hasRegistration: Boolean( domain.has_registration ),
		hasZone: Boolean( domain.has_zone ),
		isPendingIcannVerification: Boolean( domain.is_pending_icann_verification ),
		manualTransferRequired: Boolean( domain.manual_transfer_required ),
		newRegistration: Boolean( domain.new_registration ),
		partnerDomain: Boolean( domain.partner_domain ),
		pendingRegistration: Boolean( domain.pending_registration ),
		pendingRegistrationTime: domain.pending_registration_time,
		primaryDomain: Boolean( domain.primary_domain ),
		privateDomain: Boolean( domain.private_domain ),
		registrationDate: domain.registration_date,
		type: String( domain.type ),
		wpcomDomain: Boolean( domain.wpcom_domain )
	};
};
