/**
 * External dependencies
 */
var React = require( 'react' ),
	classNames = require( 'classnames' );

/**
 * Internal dependencies
 */
var Gridicon = require( 'components/gridicon' );

var DomainProductPrice = React.createClass( {
	subMessage() {
		var freeWithPlan = this.props.cart && this.props.cart.hasLoadedFromServer && this.props.cart.next_domain_is_free && ! this.props.isFinalPrice;
		if ( freeWithPlan ) {
			return <span className="domain-product-price__free-text">{ this.translate( 'Free with your plan' ) }</span>;
		} else if ( this.props.withPlansOnly && this.props.price ) {
			return <small>{ this.translate( 'Included in the Premium Plan' ) } <Gridicon icon="lock" size={ 12 }/></small>;
		}
		return null;
	},
	priceText() {
		if ( ! this.props.price ) {
			return this.translate( 'Free' );
		} else if ( this.props.withPlansOnly ) {
			return null;
		}
		return this.translate( '%(cost)s {{small}}/year{{/small}}', {
			args: { cost: this.props.price },
			components: { small: <small /> }
		} );
	},
	render: function() {
		var freeWithPlan = this.props.cart && this.props.cart.hasLoadedFromServer && this.props.cart.next_domain_is_free && ! this.props.isFinalPrice,
			classes = classNames( 'domain-product-price', { 'is-free-domain': freeWithPlan }, {
				'is-placeholder': this.props.isLoading
			} );

		if ( this.props.isLoading ) {
			return <div className={ classes }>{ this.translate( 'Loading…' ) }</div>;
		}

		return (
			<div className={ classes }>
				<span className="domain-product-price__price">{ this.priceText() }</span>
				{ this.subMessage() }
			</div>
		);
	}
} );

module.exports = DomainProductPrice;
