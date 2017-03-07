import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../i18n';

import Prompt from 'react-native-prompt';

import { hideDialog } from '../actions';

/**
 * Native dialog using Prompt.
 */
class Dialog extends Component {

    /**
     * Dialog component's property types.
     *
     * @static
     */
    static propTypes = {
        cancelTitleKey: React.PropTypes.string,
        dispatch: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onSubmit: React.PropTypes.func,
        placeholderKey: React.PropTypes.string,
        show: React.PropTypes.bool,
        submitTitleKey: React.PropTypes.string,
        t: React.PropTypes.func,
        titleKey: React.PropTypes.string,
        width: React.PropTypes.string
    }

    /**
     * Initializes a new Dialog instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props) {
        super(props);

        this._onCancel = this._onCancel.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { t } = this.props;
        const {
            cancelTitleKey,
            placeholderKey,
            submitTitleKey,
            titleKey,
            show } = this.props;

        return (
            <Prompt
                cancelText = { cancelTitleKey ? t(cancelTitleKey) : undefined }
                onCancel = { this._onCancel }
                onSubmit = { this._onSubmit }
                placeholder = { t(placeholderKey) }
                submitText = { submitTitleKey ? t(submitTitleKey) : undefined }
                title = { t(titleKey) }
                visible = { show } />
        );
    }

    /**
     * Dispatches action to hide the dialog.
     *
     * @returns {void}
     */
    _onCancel() {

        let hide = true;

        if (this.props.onCancel) {
            hide = this.props.onCancel();
        }

        if (hide) {
            this.props.dispatch(hideDialog());
        }
    }

    /**
     * Dispatches the action when submitting the dialog.
     *
     * @param {string} value - The submitted value.
     * @private
     * @returns {void}
     */
    _onSubmit(value) {
        let hide = true;

        if (this.props.onSubmit) {
            hide = this.props.onSubmit(value);
        }

        if (hide) {
            this.props.dispatch(hideDialog());
        }
    }
}

/**
 * Maps (parts of) the Redux state to the associated Dialog's props.
 *
 * @param {Object} state - Redux state.
 * @protected
 * @returns {{
 *     show: bool
 * }}
 */
function _mapStateToProps(state) {
    const dialog = state['features/base/dialog'];

    return {
        show: dialog.show
    };
}

export default translate(connect(_mapStateToProps)(Dialog));
