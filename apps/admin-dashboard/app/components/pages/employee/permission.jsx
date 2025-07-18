
import React, { useState } from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid'
import { employee } from '../../../data/employee';


// Mapping checkbox state to SVG file names in public folder
const checkboxIcons = {
  checked: '/icons/Check box.svg',
  unchecked: '/icons/Check box outline blank.svg',
  indeterminate: '/icons/indeterminate check box.svg',
};

export default function Permission() {

  const [openGroups, setOpenGroups] = useState(
    // Initialize all groups as open
    employee.permissionGroup.reduce((acc, grp) => ({ ...acc, [grp.title]: true }), {})
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
            {employee.roles.map((role) => (
              <th key={role} className="min-w-[100px] px-4 py-3 font-light truncate">{role}</th>
            ))}
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-200' >
          {employee.permissionGroup.map((group) => (
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

                {employee.roles.map((role) => {
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
                    {employee.roles.map((role) => {
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