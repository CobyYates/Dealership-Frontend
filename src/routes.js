import Home from "./components/Home.vue";
import Cart from "./components/Cart.vue";
import AddVehicle from "./components/AddVehicle.vue";
import RESTful from "../views/RESTful.vue";
import Vehicle from "../views/Vehicle.vue";
import Trucks from "../views/Trucks.vue";
import SUVs from "../views/SUVs.vue";
import Cars from "../views/Cars.vue";
import AddRESTfulVehicle from "../views/AddRESTfulVehicle.vue";

export const routes = [
         { path: "/", component: Home },
         { path: "/add-vehicle", component: AddVehicle },
         { path: "/cart", component: Cart },
         { path: "/RESTful", component: RESTful },
         { path: "/vehicle/:id", component: Vehicle },
         { path: "/trucks", component: Trucks },
         { path: "/suvs", component: SUVs },
         { path: "/cars", component: Cars },
         { path: "/add-restful", component: AddRESTfulVehicle },
       ];
