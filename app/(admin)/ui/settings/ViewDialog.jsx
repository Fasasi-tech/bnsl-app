'use client';
import React, { useState, useEffect } from 'react';
import { useSingleRolesQuery, usePermissionsQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const ViewDialog = ({ userId, onClose }) => {
  const { data, isLoading, error } = useSingleRolesQuery(userId);
  const { data: permission, isLoading: loadingPermission, error: errorPermission } = usePermissionsQuery();

  const [assignedPermissions, setAssignedPermissions] = useState([]);

  useEffect(() => {
    if (data?.data?.user?.permission) {
      setAssignedPermissions(data.data.user.permission);
    }
  }, [data]);

  if (isLoading || loadingPermission) {
    return <LoaderBtn />;
  }

  if (error || errorPermission) {
    return <p className="text-red-500">{error?.message || errorPermission?.data?.message}</p>;
  }

  const handleCheckboxChange = (permId) => {
    if (assignedPermissions.includes(permId)) {
      setAssignedPermissions((prev) => prev.filter((id) => id !== permId));
    } else {
      setAssignedPermissions((prev) => [...prev, permId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Roles Permission</h2>
        <div className="grid gap-4 py-4">
          <div>
            {loadingPermission ? (
              <Loader />
            ) : (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">Permissions</th>
                      <th className="px-4 py-2 text-sm font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permission?.data?.user?.map((perm) => (
                      <tr key={perm._id} className="border-t border-gray-200">
                        <td className="px-4 py-2 text-sm text-gray-700">{perm.name}</td>
                        <td className="px-4 py-2">
                          <Checkbox
                            checked={assignedPermissions.includes(perm._id)}
                            onCheckedChange={() => handleCheckboxChange(perm._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant='orange' className="btn-secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewDialog;
