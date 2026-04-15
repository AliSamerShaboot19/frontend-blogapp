import React, { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { FaTrashAlt, FaEye, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getAllUsersProfiles } from "../../redux/api/profileApi";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUsersProfiles());
  }, [isProfileDeleted, dispatch]);

  const deleteUserHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(id));
        swal("User has been deleted!", { icon: "success" });
      } else {
        swal("User is safe");
      }
    });
  };
  console.log(profiles);

  return (
    <AdminLayout title="Users">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Users
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.map((user, idx) => (
                <tr key={user?._id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {user?.profilePhoto ? (
                        <img
                          src={user?.profilePhoto?.url}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <FaUserCircle className="w-6 h-6 text-gray-400" />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {user?.username}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-700">
                    {user?.email}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/profile/${user?._id}`}
                        className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                      >
                        <FaEye /> View
                      </Link>
                      <button
                        onClick={() => deleteUserHandler(user?._id)}
                        className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersTable;
