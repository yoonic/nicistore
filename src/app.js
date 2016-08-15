/**
 * Imports
 */
import Fluxible from 'fluxible';

// Stores
import AccountStore from './stores/Account/AccountStore';
import ApplicationStore from './stores/Application/ApplicationStore';
import CartStore from './stores/Cart/CartStore';
import CheckoutStore from './stores/Checkout/CheckoutStore';
import CollectionsAddStore from './stores/Collections/CollectionsAddStore';
import CollectionsFeaturedHomepage from './stores/Collections/CollectionsFeaturedHomepage';
import CollectionsStore from './stores/Collections/CollectionsStore';
import CollectionsListStore from './stores/Collections/CollectionsListStore';
import CollectionDetailsStore from './stores/Collections/CollectionDetailsStore';
import ContentsAddStore from './stores/Contents/ContentsAddStore';
import ContentsListStore from './stores/Contents/ContentsListStore';
import ContentDetailsStore from './stores/Contents/ContentDetailsStore';
import CustomersListStore from './stores/Customers/CustomersListStore';
import DrawerStore from './stores/Application/DrawerStore';
import FileUploadStore from './stores/Files/FileUploadStore';
import IntlStore from './stores/Application/IntlStore';
import LoginStore from './stores/Account/LoginStore';
import NotificationQueueStore from './stores/Application/NotificationQueueStore';
import OrderDetailsStore from './stores/Orders/OrderDetailsStore';
import OrderEmailStore from './stores/Orders/OrderEmailStore';
import OrdersListStore from './stores/Orders/OrdersListStore';
import OrderStore from './stores/Orders/OrderStore';
import PageLoadingStore from './stores/Application/PageLoadingStore';
import ProductContentsStore from './stores/Products/ProductContentsStore';
import ProductDetailsStore from './stores/Products/ProductDetailsStore';
import ProductsAddStore from './stores/Products/ProductsAddStore';
import ProductsHomepageStore from './stores/Products/ProductsHomepageStore';
import ProductsListStore from './stores/Products/ProductsListStore';
import ProductSuggestionsStore from './stores/Products/ProductSuggestionsStore';
import RegisterStore from './stores/Account/RegisterStore';
import ResetStore from './stores/Account/ResetStore';
import ResponsiveStore from './stores/Application/ResponsiveStore';

// Routes
import Routes from './routes';

// Plugins
import apiPlugin from './utils/apiPlugin';

/**
 * Create new application instance.
 */
const app = new Fluxible({
    component: Routes,
    stores: [
        AccountStore,
        ApplicationStore,
        CartStore,
        CheckoutStore,
        CollectionsAddStore,
        CollectionsFeaturedHomepage,
        CollectionsStore,
        CollectionsListStore,
        CollectionDetailsStore,
        ContentsAddStore,
        ContentsListStore,
        ContentDetailsStore,
        CustomersListStore,
        DrawerStore,
        FileUploadStore,
        IntlStore,
        LoginStore,
        NotificationQueueStore,
        OrderDetailsStore,
        OrderEmailStore,
        OrdersListStore,
        OrderStore,
        PageLoadingStore,
        ProductContentsStore,
        ProductDetailsStore,
        ProductsAddStore,
        ProductsHomepageStore,
        ProductsListStore,
        ProductSuggestionsStore,
        RegisterStore,
        ResetStore,
        ResponsiveStore
    ]
});

// Plug plugins
app.plug(apiPlugin);

/**
 * Export
 */
export default app;
