import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Manage Categories',
    icon: 'edit-2-outline',
    link: '/pages/catagories/category-list',
  }, 
  {
    title: 'Manage Subcategory',
    icon: 'layout-outline',
    link: '/pages/subcategories/subcategory-list',
  },
  {
    title: 'Manage Product',
    icon: 'layout-outline',
    link: '/pages/product/product-list',
  },
  {
    title: 'Customer',
    icon: 'keypad-outline',
    link: '/pages/customer',
  },
  {
    title: 'Orders',
    icon: 'keypad-outline',
    link: '/pages/orders/order-list',
  },
  {
    title: 'Events',
    icon: 'keypad-outline',
    link: '/pages/events/events-list',
  },
  
];
