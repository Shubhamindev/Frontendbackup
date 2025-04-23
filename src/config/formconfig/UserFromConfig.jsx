import { Pencil } from 'lucide-react';

export const userFormConfig = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: ['ADMIN', 'READ-ONLY', 'CUSTOMER'],
  },
  {
    name: 'lastLogin',
    label: 'Last Login',
    type: 'date',
  },

  {
    name: 'actions',
    label: 'Actions',
    type: 'action',
    icon: Pencil,
  },
];
