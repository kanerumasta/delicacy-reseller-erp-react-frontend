import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./shared/pages/Layout";
import "../src/App.css";
import Dashboard from "../src/shared/pages/Dashboard";
import { ViewDelicacies } from "./modules/inventory/components/ViewDelicacies";

import Register from "./modules/authentication/Register";
import Variations from "./modules/inventory/components/Variations";
import Inventory from "./modules/inventory/components/Inventory";
import Login from "./modules/authentication/Login";

import AllRequisitions from "./modules/requisition/components/AllRequisitions";
import { createBrowserHistory } from "history";
import AddRequisition from "./modules/requisition/components/AddRequisition";
import MyRequisitions from "./modules/requisition/components/MyRequisitions";
import SelectItem from "./modules/requisition/components/SelectItem";
import { NextUIProvider } from "@nextui-org/react";
import Variation from "./modules/inventory2/Variation";
import DelicacyDetails from "./modules/inventory/components/DelicacyDetails";
import RequisitionItems from "./modules/requisition/components/RequisitionItems";
import MainPage from "./shared/pages/MainPage";
import ListStaff from "./modules/accounts/ListStaff";
import PurchaseOrders from "./modules/purchasing/pages/PurchaseOrders";
import CreatePurchaseOrder from "./modules/purchasing/pages/CreatePurchaseOrder";

const history = createBrowserHistory();
function App() {
  return (
    <NextUIProvider>
      <Router history={history}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/inventory/items" exact element={<Inventory />} />
            <Route
              path="/inventory/delicacies"
              exact
              element={<ViewDelicacies />}
            />
            <Route
              path="/inventory/delicacies/:delicacyId"
              exact
              element={<DelicacyDetails />}
            />
            <Route
              path="/requisitions/all"
              exact
              element={<AllRequisitions />}
            />
            <Route
              path="/requisitions/add"
              exact
              element={<AddRequisition />}
            />
            <Route
              path="/requisitions/add/select-item"
              exact
              element={<SelectItem />}
            />
            <Route path="/requisitions/my" exact element={<MyRequisitions />} />
            <Route
              path="/requisitions/my-requisitions/:requisitionCode"
              exact
              element={<RequisitionItems />}
            />

            <Route
              path="/purchasing/purchase-orders"
              exact
              element={<PurchaseOrders />}
            />
            <Route
              path="/purchasing/create-purchase-order/:requisitionId"
              exact
              element={<CreatePurchaseOrder />}
            />

            <Route path="/mybutton" exact element={<Variation />} />
            <Route path="/staff" exact element={<ListStaff />} />
          </Route>
          <Route path="/main" exact element={<MainPage />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/logout" exact element={<Login />} />
        </Routes>
      </Router>
    </NextUIProvider>
  );
}

export default App;
