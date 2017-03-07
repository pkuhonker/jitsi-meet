import React, { Component } from 'react';
import { connect } from 'react-redux';
import AKButton from '@atlaskit/button';
import AKButtonGroup from '@atlaskit/button-group';
import ModalDialog from '@atlaskit/modal-dialog';

import { hideDialog } from '../actions';
import { translate } from '../../i18n';

/**
 * Web dialog that uses atlaskit modal-dialog to display dialogs.
 */
class Dialog extends Component {

    /**
     * Dialog component's property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * Whether cancel button is disabled. Enabled by default.
         */
        cancelDisabled: React.PropTypes.bool,

        /**
         * Optional i18n key to change the cancel button title.
         */
        cancelTitleKey: React.PropTypes.string,

        /**
         * This is the body of the dialog, the component children.
         */
        children: React.PropTypes.node,

        /**
         * Used to show hide the dialog on cancel.
         */
        dispatch: React.PropTypes.func,

        /**
         * Whether the dialog is modal. This means clicking on the blanket will
         * leave the dialog open. No cancel button.
         */
        isModal: React.PropTypes.bool,

        /**
         * The handler for onCancel event.
         */
        onCancel: React.PropTypes.func,

        /**
         * The handler for the event when submitting the dialog.
         */
        onSubmit: React.PropTypes.func,

        /**
         * Whether to show/hide the dialog.
         */
        show: React.PropTypes.bool,

        /**
         * Is submit button enabled/disabled. Enabled by default.
         */
        submitDisabled: React.PropTypes.bool,

        /**
         * Optional i18n key to change the submit button title.
         */
        submitTitleKey: React.PropTypes.string,

        /**
         * Used to obtain translations.
         */
        t: React.PropTypes.func,

        /**
         * Key to use for showing a title.
         */
        titleKey: React.PropTypes.string,

        /**
         * Width of the dialog, can be:
         * - 'small' (400px), 'medium' (600px), 'large' (800px),
         * 'x-large' (968px)
         * - integer value for pixel width
         * - string value for percentage
         */
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
        return (
            <ModalDialog
                footer = { this._renderFooter() }
                header = { this._renderHeader() }
                isOpen = { this.props.show }
                onDialogDismissed = { this._onCancel }
                width = { this.props.width
                    ? this.props.width : 'medium' }>
                <div>
                    <form
                        id = 'modal-dialog-form'
                        onSubmit = { this._onSubmit }>
                        { this.props.children }
                    </form>
                </div>
            </ModalDialog>);
    }

    /**
     * Render cancel button.
     *
     * @returns {*} The cancel button if enabled and dialog is not modal.
     * @private
     */
    _renderCancelButton() {
        if (this.props.cancelDisabled || this.props.isModal) {
            return null;
        }

        return (
            <AKButton
                appearance = 'subtle'
                id = 'modal-dialog-cancel-button'
                onClick = { this._onCancel }>
                { this.props.t(this.props.cancelTitleKey
                    ? this.props.cancelTitleKey : 'dialog.Cancel') }
            </AKButton>
        );
    }

    /**
     * Render component in dialog footer.
     *
     * @returns {ReactElement}
     * @private
     */
    _renderFooter() {
        return (
            <footer>
                <AKButtonGroup>
                    { this._renderCancelButton() }
                    { this._renderSubmitButton() }
                </AKButtonGroup>
            </footer>
        );
    }

    /**
     * Render component in dialog header.
     *
     * @returns {ReactElement}
     * @private
     */
    _renderHeader() {
        const { t } = this.props;

        return (
            <header>
                <h2>
                    { t(this.props.titleKey) }
                </h2>
            </header>
        );
    }

    /**
     * Render submit button.
     *
     * @returns {*} The submit button if enabled.
     * @private
     */
    _renderSubmitButton() {
        if (this.props.submitDisabled) {
            return null;
        }

        return (
            <AKButton
                appearance = 'primary'
                form = 'modal-dialog-form'
                id = 'modal-dialog-submit-button'
                onClick = { this._onSubmit }>
                { this.props.t(this.props.submitTitleKey
                    ? this.props.submitTitleKey : 'dialog.Ok') }
            </AKButton>
        );
    }

    /**
     * Dispatches action to hide the dialog.
     *
     * @returns {void}
     */
    _onCancel() {
        if (this.props.isModal) {
            return;
        }

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
     * @private
     * @returns {void}
     */
    _onSubmit() {
        let hide = true;

        if (this.props.onSubmit) {
            hide = this.props.onSubmit();
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
