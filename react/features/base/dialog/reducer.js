import { ReducerRegistry, setStateProperties } from '../redux';

import {
    BEGIN_DIALOG_REQUEST,
    END_DIALOG_REQUEST
} from './actionTypes';

/**
 * Listen for actions which show or hide dialogs.
 *
 * @param {Object[]} state - Current state.
 * @param {Object} action - Action object.
 * @param {string} action.type - Type of action.
 * @returns {{}}
 */
ReducerRegistry.register('features/base/dialog', (state = {}, action) => {

    switch (action.type) {
    case BEGIN_DIALOG_REQUEST:

        return setStateProperties(state, {
            show: true,
            component: action.component,
            props: action.props
        });
    case END_DIALOG_REQUEST:
        return setStateProperties(state, {
            show: false
        });
    }

    return state;
});
