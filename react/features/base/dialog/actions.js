import {
    BEGIN_DIALOG_REQUEST,
    END_DIALOG_REQUEST
} from './actionTypes';

/**
 * Signals Dialog to close its dialog.
 *
 * @returns {{
 *     type: END_DIALOG_REQUEST
 * }}
 */
export function hideDialog() {
    return {
        type: END_DIALOG_REQUEST
    };
}

/**
 * Signals Dialog to open dialog.
 *
 * @param {Object} component - The component to display as dialog.
 * @param {Object} props - The properties needed for that component.
 * @returns {Object}
 */
export function openDialog(component, props) {
    return {
        type: BEGIN_DIALOG_REQUEST,
        component,
        props
    };
}
