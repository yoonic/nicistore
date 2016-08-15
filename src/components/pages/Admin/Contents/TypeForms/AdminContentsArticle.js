/**
 * Imports
 */
import React from 'react';
import {FormattedMessage} from 'react-intl';

// Flux
import IntlStore from '../../../../../stores/Application/IntlStore';

// Required components
import FormLabel from '../../../../common/forms/FormLabel';
import InputField from '../../../../common/forms/InputField';
import MarkdownHTML from '../../../../common/typography/MarkdownHTML';
import MarkdownEditor from '../../../../common/forms/MarkdownEditor';

// Translation data for this component
import intlData from './AdminContentsArticle.intl';

/**
 * Component
 */
class AdminContentsArticle extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Initial State ***//

    state = {
        fieldErrors: {}
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./AdminContentsArticle.scss');
    }

    //*** View Controllers ***//

    handleLocaleFieldField = (field, locale, value) => {
        let body = this.props.body;
        body[field][locale] = value;
        this.props.onChange(body);
    };

    //*** Template ***//

    render() {
        let intlStore = this.context.getStore(IntlStore);
        return (
            <div className="admin-contents-article">
                <div className="admin-contents-article__summary">
                    <div className="admin-contents-article__form-item">
                        <InputField label={
                                        <div>
                                            <FormattedMessage
                                                message={intlStore.getMessage(intlData, 'summary')}
                                                locales={intlStore.getCurrentLocale()} />
                                            &nbsp;({this.props.selectedLocale})
                                        </div>
                                    }
                                    onChange={this.handleLocaleFieldField.bind(null, 'summary', this.props.selectedLocale)}
                                    value={this.props.body.summary[this.props.selectedLocale]}
                                    error={this.state.fieldErrors[`summary.${this.props.selectedLocale}`]} />
                    </div>
                </div>
                <div className="admin-contents-article__content">
                    <div className="admin-contents-article__markdown">
                        <MarkdownEditor key={this.props.selectedLocale}
                                        label={
                                            <div>
                                                <FormattedMessage message={intlStore.getMessage(intlData, 'edit')}
                                                                  locales={intlStore.getCurrentLocale()} />
                                                &nbsp;({this.props.selectedLocale})
                                            </div>
                                        }
                                        value={this.props.body.markdown[this.props.selectedLocale]}
                                        onChange={this.handleLocaleFieldField.bind(null, 'markdown', this.props.selectedLocale)} />
                    </div>
                    <div className="admin-contents-article__preview">
                        <div className="admin-contents-article__label">
                            <FormLabel>
                                <FormattedMessage message={intlStore.getMessage(intlData, 'preview')}
                                                  locales={intlStore.getCurrentLocale()} />
                                &nbsp;({this.props.selectedLocale})
                            </FormLabel>
                        </div>
                        <div className="admin-contents-article__markdown-preview">
                            <MarkdownHTML>
                                {this.props.body.markdown[this.props.selectedLocale]}
                            </MarkdownHTML>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default AdminContentsArticle;
