# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Render - Client Site Routing

If you use Reach Router or React Router for client-side routing, you will need to direct all routing requests to index.html so they can be handled by your routing library.

You can do this easily by defining a Rewrite Rule for your static site. Go to the Redirects/Rewrites tab for your service and add a rule with the following values:

Source Path /\*
Destination Path /index.html
Action Rewrite

https://docs.render.com/deploy-create-react-app#using-client-side-routing
