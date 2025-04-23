export  const addUserFormConfig = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
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
  ];
  