import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_BASE = process.env.REACT_APP_API_URL || "/api";

const AllBuyers = () => {
  const [queryText, setQueryText] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const { data: buyers = [], refetch, isLoading, error } = useQuery({
    queryKey: ["users", "buyers", page, perPage],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/users?role=Buyer`);
      if (!res.ok) throw new Error("Failed to fetch buyers");
      return res.json();
    },
  });

  const filtered = useMemo(() => {
    if (!queryText) return buyers;
    const q = queryText.toLowerCase();
    return buyers.filter((b) => (b.name || "").toLowerCase().includes(q) || (b.email || "").toLowerCase().includes(q));
  }, [buyers, queryText]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const doDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE", headers: { "content-type": "application/json" } });
      if (!res.ok) throw new Error("Delete failed");
      await res.json();
      toast.success("Buyer deleted");
      setConfirmDelete(null);
      refetch();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  if (isLoading) return <div className="p-4">Loading buyers...</div>;
  if (error) return <div className="p-4 text-red-600">Error loading buyers</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">All Buyers</h2>
        <div className="flex gap-2">
          <input
            aria-label="Search buyers"
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
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((buyer, i) => (
              <tr key={buyer._id} className="border-t">
                <td className="px-4 py-2">{(page - 1) * perPage + i + 1}</td>
                <td className="px-4 py-2">{buyer.name}</td>
                <td className="px-4 py-2">{buyer.email}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button onClick={() => setConfirmDelete(buyer)} className="px-2 py-1 bg-red-500 text-white rounded text-sm font-medium">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No buyers found</td>
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

      {/* Delete confirm */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-md p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold">Delete buyer</h3>
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

export default AllBuyers;
