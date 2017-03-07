import { Symbol } from '../react';

/**
 * The type of Redux action which begins a request to open a dialog.
 *
 * {
 *     type: BEGIN_DIALOG_REQUEST,
 *     component: React.Component,
 *     props: React.PropTypes.object
 * }
 *
 */
export const BEGIN_DIALOG_REQUEST = Symbol('BEGIN_DIALOG_REQUEST');

/**
 * The type of Redux action which closes a dialog
 *
 * {
 *     type: END_DIALOG_REQUEST
 * }
 */
export const END_DIALOG_REQUEST = Symbol('END_DIALOG_REQUEST');
