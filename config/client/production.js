// App config the for production environment.
// Do not require this directly. Use ./src/config instead.
export default {
    app: {
        title: 'NICI Store',
        locale: {
            available: ['en', 'pt'],
            default: 'pt'
        }
    },
    api: {
        atlas: {
            baseUrl: 'https://nicistore.com/api/v1'
        }
    },
    googleAnalytics: {
        enabled: true,
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID, // LIVE Property
        options: {
            debug: false
        }
    },
    facebookPixel: {
        enabled: true,
        id: process.env.FACEBOOK_PIXEL_ID
    },
    crisp: {
        enabled: true,
        websiteID: process.env.CRISP_WEBSITE_ID // TODO: This is still hardcoded in the vendor file
    },
    mailChimp: {
        signupFormPostURL: process.env.MAILCHIMP_SIGNUP_FORM_POST_URL
    },
    switchPayments: {
        enabled: true,
        environment: 'https://api.switchpayments.com/v2/',
        publicKey: process.env.SWITCH_PUBLIC_KEY
    }
};
