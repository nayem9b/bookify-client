import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE = process.env.REACT_APP_API_URL || "/api";

const AllSeller = () => {
  const [queryText, setQueryText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const { data: sellers = [], refetch, isLoading, error } = useQuery({
    queryKey: ["users", "sellers", page, perPage],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/users?role=Seller`);
      if (!res.ok) throw new Error("Failed to fetch sellers");
      const data = await res.json();
      return data;
    },
  });

  const filtered = useMemo(() => {
    if (!queryText) return sellers;
    const q = queryText.toLowerCase();
    return sellers.filter((s) => (s.name || "").toLowerCase().includes(q) || (s.email || "").toLowerCase().includes(q));
  }, [sellers, queryText]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const doDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE", headers: { "content-type": "application/json" } });
      if (!res.ok) throw new Error("Delete failed");
      await res.json();
      toast.success("Seller deleted");
      setConfirmDelete(null);
      refetch();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const saveEdit = async (updates) => {
    try {
      const res = await fetch(`${API_BASE}/users/${editingUser._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Update failed");
      await res.json();
      toast.success("Seller updated");
      setEditingUser(null);
      refetch();
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };

  if (isLoading) return <div className="p-4">Loading sellers...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading sellers</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Sellers</h2>
        <div className="flex gap-2">
          <input
            aria-label="Search sellers"
            placeholder="Search name or email"
            value={queryText}
            onChange={(e) => { setQueryText(e.target.value); setPage(1); }}
            className="px-3 py-2 border rounded-md text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        <table className="w-full text-left table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((seller, i) => (
              <tr key={seller._id} className="border-t">
                <td className="px-4 py-2 align-top">{(page - 1) * perPage + i + 1}</td>
                <td className="px-4 py-2">{seller.name}</td>
                <td className="px-4 py-2">{seller.email}</td>
                <td className="px-4 py-2">{seller.role || "seller"}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingUser(seller)}
                      className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(seller)}
                      className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No sellers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">{total} result(s)</div>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2 py-1 rounded border disabled:opacity-50">Prev</button>
          <div className="px-2 py-1">{page} / {pages}</div>
          <button disabled={page >= pages} onClick={() => setPage((p) => Math.min(pages, p + 1))} className="px-2 py-1 rounded border disabled:opacity-50">Next</button>
        </div>
      </div>

      {/* Edit modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Edit Seller</h3>
            <EditForm user={editingUser} onCancel={() => setEditingUser(null)} onSave={saveEdit} />
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-md p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold">Delete seller</h3>
            <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete <strong>{confirmDelete.name}</strong> ({confirmDelete.email})?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setConfirmDelete(null)} className="px-3 py-1 rounded border">Cancel</button>
              <button onClick={() => doDelete(confirmDelete._id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditForm = ({ user, onCancel, onSave }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.role || "seller");

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave({ name, email, role }); }}>
      <label className="block text-sm">Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
      <label className="block text-sm">Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 px-3 py-2 border rounded" />
      <label className="block text-sm">Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mb-4 px-3 py-2 border rounded">
        <option value="seller">Seller</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
        <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
      </div>
    </form>
  );
};

export default AllSeller;
