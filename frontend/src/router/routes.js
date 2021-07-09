import Signin from '@/views/Signin';
import Dashboard from '@/views/dashboard/index';
import Currency from '@/views/dashboard/Currency';
import CreateCurrency from '@/views/dashboard/CreateCurrency';
import EditCurrency from '@/views/dashboard/EditCurrency';
import guestMiddleware from './middlewares/guest.middleware';
import authMiddleware from './middlewares/auth.middleware';
import store from '@/store/index';

import {
  _set_errors
} from '@/store/constants'

const routes = [
  {
    path: '/',
    name: 'signin',
    component: Signin,
    meta: {
      middleware: [
        guestMiddleware
      ]
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: {name: 'currency'},
    component: Dashboard,
    meta: {
      middleware: [
        authMiddleware
      ]
    },
    children: [
      {
        path: 'currency',
        name: 'currency',
        component: Currency,
        meta: {
          middleware: [
            authMiddleware
          ]
        },
      },
      {
        path: 'create',
        name: 'create-currency',
        component: CreateCurrency,
        beforeEnter: (to, from, next) => {
          store.commit(`currency/${_set_errors}`, null);
          next();
        },
        meta: {
          middleware: [
            authMiddleware
          ]
        },
      },
      {
        path: 'edit/:id',
        name: 'edit-currency',
        component: EditCurrency,
        beforeEnter: (to, from, next) => {
          store.commit(`currency/${_set_errors}`, null);
          next();
        },
        meta: {
          middleware: [
            authMiddleware
          ]
        },
      }
    ],
  },
  {
    path: '*',
    component: () => import('@/views/NotFound')
  }
];

export default routes;
