import {Provider} from 'react-redux';

import {Router} from '@navigation';
import {store} from '@redux';

export const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
