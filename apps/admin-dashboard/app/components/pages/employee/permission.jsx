
import React, { useState } from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid'

const roles = [
  'Owner',
  'Manager',
  'Supervisor',
  'Waiter',
  'Bartender',
  'Chef',
];

// Mapping checkbox state to SVG file names in public folder
const checkboxIcons = {
  checked: '/icons/Check box.svg',
  unchecked: '/icons/Check box outline blank.svg',
  indeterminate: '/icons/indeterminate check box.svg',
};

// Example permission data
const permissionGroups = [
  {
    title: 'Menu',
    state: {
      Owner: 'checked',
      Manager: 'indeterminate',
      Supervisor: 'indeterminate',
      Waiter: 'unchecked',
      Bartender: 'unchecked',
      Chef: 'unchecked',
    },
    children: [
      {
        title: 'Add items to the menu',
        state: {
          Owner: 'checked',
          Manager: 'checked',
          Supervisor: 'unchecked',
          Waiter: 'unchecked',
          Bartender: 'unchecked',
          Chef: 'unchecked',
        },
      },
      {
        title: 'Add categories to the menu',
        state: {
          Owner: 'checked',
          Manager: 'checked',
          Supervisor: 'unchecked',
          Waiter: 'unchecked',
          Bartender: 'unchecked',
          Chef: 'unchecked',
        },
      },
      {
        title: 'Edit and delete items',
        state: {
          Owner: 'checked',
          Manager: 'checked',
          Supervisor: 'unchecked',
          Waiter: 'unchecked',
          Bartender: 'unchecked',
          Chef: 'unchecked',
        },
      },
      {
        title: 'Generate menu bar-code',
        state: {
          Owner: 'checked',
          Manager: 'checked',
          Supervisor: 'unchecked',
          Waiter: 'unchecked',
          Bartender: 'unchecked',
          Chef: 'unchecked',
        },
      },
      
    ],
  },
  {
    title: 'Orders',
    state: {
      Owner: 'checked',
      Manager: 'indeterminate',
      Supervisor: 'indeterminate',
      Waiter: 'unchecked',
      Bartender: 'unchecked',
      Chef: 'unchecked',
    },
    children: [
      {
        title: 'Add items to the order',
        state: {
          Owner: 'checked',
          Manager: 'checked',
          Supervisor: 'unchecked',
          Waiter: 'unchecked',
          Bartender: 'unchecked',
          Chef: 'unchecked',
        },
      },

    ],
  },
  
];

export default function Permission() {

  const [openGroups, setOpenGroups] = useState(
    // Initialize all groups as open
    permissionGroups.reduce((acc, grp) => ({ ...acc, [grp.title]: true }), {})
  );

  const toggleGroup = (title) => {
    setOpenGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className='w-full h-fit overflow-auto rouded-lg border border-border-text rounded-lg'>

      <table className="min-w-full text-left bg-white text-xs rounded-lg">

        <thead className='font-normal text-sec-text rouded-lg bg-[#F5F5F6]'>
          <tr>
            <th className="min-w-[200px] px-4 py-3 font-light sticky left-0 z-40 bg-[#F5F5F6] shadow">Permission</th>
            {roles.map((role) => (
              <th key={role} className="min-w-[100px] px-4 py-3 font-light truncate">{role}</th>
            ))}
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-200' >
          {permissionGroups.map((group) => (
            <React.Fragment key={group.title}>
              {/* Group header row */}
              <tr className="bg-[#E2E6E9] text-left">
                <td className="flex items-center px-4 py-3 sticky left-0 z-50 bg-[#E2E6E9]">
                  <button
                    onClick={() => toggleGroup(group.title)}
                    className="mr-2 flex items-center"
                  >
                    {openGroups[group.title] ? (
                      <ChevronUpIcon className='w-4 h-4' />
                    ) : (
                      <ChevronDownIcon className='w-4 h-4' />
                    )}
                  </button>
                  <span className="font-medium">{group.title}</span>
                </td>

                {roles.map((role) => {
                  const state = group.state[role] || 'unchecked';
                  return (
                    <td key={role} className="px-4 py-3 truncate">
                      <img
                        src={checkboxIcons[state]}
                        alt={`${state} checkbox`}
                        className="inline-block"
                      />
                    </td>
                  );
                })}
              </tr>

              {/* Child rows, toggled */}
              {openGroups[group.title] &&
                group.children.map((perm) => (
                  <tr key={perm.title} >
                    <td className="pl-12 px-4 py-3 sticky left-0 z-50 bg-white">{perm.title}</td>
                    {roles.map((role) => {
                      const state = perm.state[role] || 'unchecked';
                      return (
                        <td key={role} className="px-4 py-3 truncate">
                          <img
                            src={checkboxIcons[state]}
                            alt={`${state} checkbox`}
                            className="inline-block"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </React.Fragment>
          ))}

        </tbody>
      </table>
    </div>
  );
}