import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import Navigation from './containers/Navigation';
import Home from './containers/Home';
import Invoices from './containers/Invoices';
import InvoiceEdit from './containers/Invoice';
import Customers from './containers/Customers';
import Products from './containers/Products';

import CustomerModal from './components/customerModal';
import ProductModal from './components/productModal';
import InvoiceModal from './components/invoiceModal';
import GlobalAlert from './components/globalAlert';

import 'react-select/dist/react-select.css';
import './styles/baseStyles.css';

/* REDUCERS */
import reducers from './store/reducers/index';

const composeEnhancers = composeWithDevTools({ realtime: true });
const store = (process.env.NODE_ENV !== 'production') ? createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk))) : createStore(reducers, {}, applyMiddleware(thunk));

render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="main-container">
                <Navigation />
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/customers' component={Customers}/>
                    <Route exact path='/products' component={Products}/>
                    <Route exact path='/invoices' component={Invoices}/>
                    <Route exact path='/invoices/create' component={InvoiceEdit}/>
                    <Route exact path='/invoices/:id/edit' component={InvoiceEdit}/>
                    <Redirect to='/' />
                </Switch>
                <ProductModal />
                <CustomerModal />
                <InvoiceModal />
                <GlobalAlert />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app-root')
);
