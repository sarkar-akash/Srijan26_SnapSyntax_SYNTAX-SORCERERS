import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const useVault = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/vault');
      setEntries(response.data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load vault entries.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const addEntry = async (formData) => {
    const response = await toast.promise(
      api.post('/vault', {
        appName: formData.name,
        siteUrl: formData.url,
        username: formData.username,
        password: formData.password,
        notes: formData.notes,
      }),
      {
        loading: 'Encrypting & saving entry…',
        success: 'Entry added to vault.',
        error: (err) => err.response?.data?.message || 'Failed to add entry.',
      }
    );
    setEntries(prev => [response.data, ...prev]);
  };

  const updateEntry = async (id, formData) => {
    const response = await toast.promise(
      api.put(`/vault/${id}`, {
        appName: formData.name,
        siteUrl: formData.url,
        username: formData.username,
        password: formData.password,
        notes: formData.notes,
      }),
      {
        loading: 'Updating entry…',
        success: 'Entry updated successfully.',
        error: (err) => err.response?.data?.message || 'Failed to update entry.',
      }
    );
    setEntries(prev => prev.map(e => (e._id === id ? response.data : e)));
  };

  const deleteEntry = async (id) => {
    const confirmed = window.confirm('Delete this entry? This cannot be undone.');
    if (!confirmed) return;

    await toast.promise(
      api.delete(`/vault/${id}`),
      {
        loading: 'Deleting entry…',
        success: 'Entry deleted from vault.',
        error: (err) => err.response?.data?.message || 'Failed to delete entry.',
      }
    );
    setEntries(prev => prev.filter(e => e._id !== id));
  };

  // Instant client-side filter — no extra API round-trips
  const filteredEntries = entries.filter(e => {
    if (!searchText) return true;
    const q = searchText.toLowerCase();
    return (
      (e.appName || '').toLowerCase().includes(q) ||
      (e.username || '').toLowerCase().includes(q)
    );
  });

  return {
    entries,
    filteredEntries,
    loading,
    error,
    searchText,
    setSearchText,
    fetchEntries,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};

export default useVault;
