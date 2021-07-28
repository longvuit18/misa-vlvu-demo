import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Employee from "../views/Employee.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/employee",
		name: "Employee",
		component: Employee
	},
	{
		path: "/",
		name: "Dashboard",
		component: Dashboard
	},
	{
		path: "/report",
		name: "Report",
		component: Dashboard
	},
	{
		path: "/customer",
		name: "Customer",
		component: Dashboard
	},
	{
		path: "/buy",
		name: "Buy",
		component: Dashboard
	},
	{
		path: "/setting",
		name: "Setting",
		component: Dashboard
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
