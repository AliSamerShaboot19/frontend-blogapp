import React, { useEffect } from "react";
import AdminLayout from "./AdminLayout";
import swal from "sweetalert";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../../redux/api/categoryApi";

const CateGoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const deleteCategoryHandler = (categoryID) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(categoryID));
        swal("Your category has been deleted!", { icon: "success" });
      } else {
        swal("Category is safe");
      }
    });
  };

  return (
    <AdminLayout title="Categories">
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Categories
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Title
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat, idx) => (
                <tr key={cat?._id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cat.title}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => deleteCategoryHandler(cat._id)}
                      className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                    >
                      <FaTrashAlt /> Delete
                    </button>
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

export default CateGoriesTable;
