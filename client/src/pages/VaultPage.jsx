import React, { useState } from 'react';
import VaultTopBar from '../components/Vault/VaultTopBar';
import VaultCard from '../components/Vault/VaultCard';
import VaultSidePanel from '../components/Vault/VaultSidePanel';
import EmptyState from '../components/Vault/EmptyState';
import useVault from '../hooks/useVault';

const VaultPage = () => {
  const {
    entries,
    filteredEntries,
    loading,
    error,
    searchText,
    setSearchText,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useVault();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentEditEntry, setCurrentEditEntry] = useState(null);
  const [viewMode, setViewMode] = useState('card');

  const handleAdd = () => {
    setCurrentEditEntry(null);
    setIsPanelOpen(true);
  };

  const handleEdit = (entry) => {
    setCurrentEditEntry(entry);
    setIsPanelOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEntry(id);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (currentEditEntry?._id) {
        await updateEntry(currentEditEntry._id, formData);
      } else {
        await addEntry(formData);
      }
      setIsPanelOpen(false);
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-on-surface-variant text-sm">Decrypting your sanctuary…</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center py-24 gap-3">
          <span className="material-symbols-outlined text-error text-5xl">cloud_off</span>
          <p className="text-on-surface font-bold text-lg">Connection failed</p>
          <p className="text-on-surface-variant text-sm">{error}</p>
        </div>
      );
    }

    if (entries.length === 0) {
      return <EmptyState onAdd={handleAdd} />;
    }

    return (
      <div className={viewMode === 'card' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20 items-start align-top" : "flex flex-col gap-3 pb-20"}>
        {filteredEntries.map(entry => (
          <VaultCard
            key={entry._id}
            entry={entry}
            onEdit={handleEdit}
            onDelete={handleDelete}
            viewMode={viewMode}
          />
        ))}
        {filteredEntries.length === 0 && searchText && (
          <div className="col-span-full py-12 text-center text-on-surface-variant bg-surface-container-low rounded-3xl border border-outline-variant/5">
            <span className="material-symbols-outlined text-4xl mb-4 opacity-50">search_off</span>
            <p>No entries found matching "{searchText}"</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 lg:py-10 flex flex-col min-h-full font-body">
      <VaultTopBar filter={searchText} setFilter={setSearchText} onAdd={handleAdd} />

      <div className="flex flex-col lg:flex-row gap-8 flex-1 relative">
        <div className="flex-1 w-full flex flex-col min-h-[50vh]">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-headline font-extrabold text-on-surface tracking-tight">Your Vault</h2>
              <p className="text-on-surface-variant mt-1 text-sm md:text-base">{entries.length} items secured in the digital sanctuary.</p>
            </div>
            {entries.length > 0 && (
              <div className="flex gap-2 bg-surface-container-low p-1 rounded-xl self-start sm:self-auto border border-outline-variant/10">
                <button 
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-lg shadow-sm transition-colors focus:outline-none ${viewMode === 'card' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors focus:outline-none ${viewMode === 'list' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  <span className="material-symbols-outlined text-lg">list</span>
                </button>
              </div>
            )}
          </div>

          {renderContent()}
        </div>

        {/* Render Panel contextually inside flex for Desktop */}
        {isPanelOpen && (
          <div className="hidden lg:block w-[400px] shrink-0 transform transition-all">
            <VaultSidePanel
              isOpen={isPanelOpen}
              onClose={() => setIsPanelOpen(false)}
              entry={currentEditEntry}
              onSave={handleSave}
            />
          </div>
        )}

        {/* Mobile Panel Anchor (Absolute fixed) */}
        <div className="lg:hidden">
          <VaultSidePanel
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            entry={currentEditEntry}
            onSave={handleSave}
          />
        </div>
      </div>

      {/* Floating Action Button (Mobile Only context) */}
      <button
        onClick={handleAdd}
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40 lg:hidden focus:outline-none"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};

export default VaultPage;
