import Page404 from "containers/Page404/Page404";
import PageSearch from "containers/PageSearch";
import ProductDetailPage from "containers/ProductDetailPage/ProductDetailPage";
import SiteHeader from "containers/SiteHeader";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "shared/Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import { Page } from "./types";

export const pages: Page[] = [
  { path: "/", exact: true, component: PageSearch },
  { path: "/product-detail/:id/:name", component: ProductDetailPage },
];

const Routes = () => {
  return (
    <BrowserRouter basename="/ciseco">
      <ScrollToTop />
      <SiteHeader />
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
