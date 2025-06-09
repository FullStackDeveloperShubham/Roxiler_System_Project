import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStoreId, setEditingStoreId] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storeRes, userRes] = await Promise.all([
          fetch('http://localhost:5000/api/Store/getAllStore'),
          fetch('http://localhost:5000/api/user/getAllUsers')
        ]);

        const storeData = await storeRes.json();
        const userData = await userRes.json();

        setStores(storeData.allStores || []);
        setUsers(userData.allUsers || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
     
    fetchData();
  }, []);

  const handleDeleteStore = async (id) => {
    if (!window.confirm('Are you sure you want to delete this store?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/Store/deleteStore/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setStores(stores.filter(store => store._id !== id));
      }
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/user/deleteUser/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleStoreChange = (id, field, value) => {
    setStores(prev => prev.map(store => store._id === id ? { ...store, [field]: value } : store));
  };

  const handleUserChange = (id, field, value) => {
    setUsers(prev => prev.map(user => user._id === id ? { ...user, [field]: value } : user));
  };

  const handleSaveStore = async (id) => {
    const store = stores.find(s => s._id === id);
    try {
      const res = await fetch(`http://localhost:5000/api/Store/UpdateStore/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(store),
      });
      const data = await res.json();
      if (data.success) {
        setEditingStoreId(null);
      }
    } catch (error) {
      console.error('Error updating store:', error);
    }
  };

  const handleSaveUser = async (id) => {
    const user = users.find(u => u._id === id);
    try {
      const res = await fetch(`http://localhost:5000/api/user/updateUser/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.success) {
        setEditingUserId(null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Dashboard</h1>
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-10">
          {/* Stores Section */}
          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">🏬 All Stores</h2>
            <div className="overflow-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-indigo-100 text-left text-gray-700">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Address</th>
                    <th className="py-2 px-4">Rating</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stores.map((store) => (
                    <tr key={store._id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-4">
                        {editingStoreId === store._id ? (
                          <input
                            type="text"
                            value={store.name}
                            onChange={(e) => handleStoreChange(store._id, 'name', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          store.name
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingStoreId === store._id ? (
                          <input
                            type="email"
                            value={store.email}
                            onChange={(e) => handleStoreChange(store._id, 'email', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          store.email
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingStoreId === store._id ? (
                          <input
                            type="text"
                            value={store.address}
                            onChange={(e) => handleStoreChange(store._id, 'address', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          store.address
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingStoreId === store._id ? (
                          <input
                            type="number"
                            value={store.rating}
                            onChange={(e) => handleStoreChange(store._id, 'rating', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          store.rating
                        )}
                      </td>
                      <td className="py-2 px-4 space-x-2">
                        {editingStoreId === store._id ? (
                          <button
                            onClick={() => handleSaveStore(store._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingStoreId(store._id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                        )}
                        <button onClick={() => handleDeleteStore(store._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Users Section */}
          <section className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-teal-600">👥 All Users</h2>
            <div className="overflow-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-teal-100 text-left text-gray-700">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Address</th>
                    <th className="py-2 px-4">Created At</th>
                    <th className="py-2 px-4">Updated At</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-4">
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            value={user.name}
                            onChange={(e) => handleUserChange(user._id, 'name', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingUserId === user._id ? (
                          <input
                            type="email"
                            value={user.email}
                            onChange={(e) => handleUserChange(user._id, 'email', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {editingUserId === user._id ? (
                          <input
                            type="text"
                            value={user.address}
                            onChange={(e) => handleUserChange(user._id, 'address', e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          user.address
                        )}
                      </td>
                      <td className="py-2 px-4">{new Date(user.createdAt).toLocaleString()}</td>
                      <td className="py-2 px-4">{new Date(user.updatedAt).toLocaleString()}</td>
                      <td className="py-2 px-4 space-x-2">
                        {editingUserId === user._id ? (
                          <button
                            onClick={() => handleSaveUser(user._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => setEditingUserId(user._id)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                        )}
                        <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
