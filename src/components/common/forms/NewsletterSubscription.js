/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

import config from '../../../config';
import {isValidEmail} from '../../../utils/strings';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Button from '../buttons/Button';
import Text from '../typography/Text';

import InputField from './InputField';

// Translation data for this component
import intlData from './NewsletterSubscription.intl';

/**
 * Component
 */
class NewsletterSubscription extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        newsletterEmail: undefined
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./NewsletterSubscription.scss');
    }

    //*** View Controllers ***//

    handleNewsletterEmailChange = (value) => {
        this.setState({newsletterEmail: value});
    };

    handleNewsletterSubmitClick = () => {
        document.getElementById('mc-embedded-subscribe').click();
    };

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        // Return the mailchimp default subscription form that will be hidden and triggered by our UI
        let mailChimpForm = () => {
            return (
                <form action={config.mailChimp.signupFormPostURL}
                      method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate
                      style={{position: 'absolute', left: '-5000px', ariaHidden: 'true'}}>
                    <div id="mc_embed_signup_scroll">
                        <label htmlFor="mce-EMAIL">Subscribe to our mailing list</label>
                        <input type="email" value={this.state.newsletterEmail} name="EMAIL" id="mce-EMAIL" required />
                        {this.props.signupSource ?
                            <input type="hidden" name="SIGNUP" id="SIGNUP" value={this.props.signupSource} />
                            :
                            null
                        }
                        <div style={{position: 'absolute', left: '-5000px', ariaHidden: 'true'}}>
                            <input type="text" name="b_e2f7608a217091f244fd31631_9d4cb32d8c" tabIndex="-1" value="" />
                        </div>
                        <div>
                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
                        </div>
                    </div>
                </form>
            );
        };

        //
        // Return
        //
        return (
            <div className="newsletter-subscription">
                <div className="newsletter-subscription__description">
                    <Text size="small">
                        <FormattedMessage message={intlStore.getMessage(intlData, 'newsletterDescription')}
                                          locales={intlStore.getCurrentLocale()} />
                    </Text>
                </div>
                <div className="newsletter-subscription__content">
                    {mailChimpForm()}
                    <div className="newsletter-subscription__content-item">
                        <InputField placeholder={intlStore.getMessage(intlData, 'newsletterPlaceholder')}
                                    onChange={this.handleNewsletterEmailChange} />
                    </div>
                    <div className="newsletter-subscription__content-item">
                        <Button type="primary" onClick={this.handleNewsletterSubmitClick}
                                disabled={!isValidEmail(this.state.newsletterEmail)}>
                            {intlStore.getMessage(intlData, 'newsletterSubmitButton')}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default NewsletterSubscription;
