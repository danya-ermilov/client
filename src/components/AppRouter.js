import { Routes, Route } from "react-router-dom";
import Shop from "../pages/Shop.js";
import Login from "../pages/Login.js";
import Signup from "../pages/Signup.js";
import User from "../pages/User.js";
import NotFound from "../pages/NotFound.js";
import Admin from "../pages/Admin.js";
import Basket from "../pages/Basket.js";
import Product from "../pages/Product.js";
import Author from "../pages/Author.js";
import AdminCategories from "../pages/AdminCategories.js";
import AdminBrands from "../pages/AdminBrands.js";
import AdminProducts from "../pages/AdminProducts.js";
import News from "../pages/News.js";

import { AppContext } from "./AppContext.js";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import Info from "../pages/Info.js";

const publicRoutes = [
  { path: "/", Component: Info },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/product/:id", Component: Product },
  { path: "/info", Component: Info },
  { path: "/user", Component: User },
  { path: "*", Component: NotFound },
  { path: "/market", Component: Shop },
];

const authRoutes = [
  { path: "/news", Component: News },
  { path: "/user", Component: User },
  { path: "/basket", Component: Basket },
  { path: "/author/:id", Component: Author },
];

const adminRoutes = [
  { path: "/admin", Component: Admin },
  { path: "/admin/categories", Component: AdminCategories },
  { path: "/admin/brands", Component: AdminBrands },
  { path: "/admin/products", Component: AdminProducts },
];

const AppRouter = observer(() => {
  const { user } = useContext(AppContext);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {user.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
    </Routes>
  );
});

export default AppRouter;
