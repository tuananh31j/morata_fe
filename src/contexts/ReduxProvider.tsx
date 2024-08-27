import { Provider } from 'react-redux';
import { store, persistor } from '~/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};
export { ReduxProvider };
