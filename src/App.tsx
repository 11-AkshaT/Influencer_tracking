import React, { useState } from 'react';
import { Influencer } from './types';
import { useInfluencers } from './hooks/useInfluencers';
import InfluencerTable from './components/InfluencerTable';
import InfluencerForm from './components/InfluencerForm';
import TableFilters from './components/TableFilters';
import { Users, Plus, X } from 'lucide-react';

function App() {
  const {
    influencers,
    loading,
    saving,
    error,
    sortConfig,
    statusFilter,
    addInfluencer,
    updateInfluencer,
    deleteInfluencer,
    togglePaidStatus,
    requestSort,
    setStatusFilter,
    getCampaignTotalViews,
  } = useInfluencers();

  const [showForm, setShowForm] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | null>(null);

  const handleAddInfluencer = () => {
    setEditingInfluencer(null);
    setShowForm(true);
  };

  const handleEditInfluencer = (influencer: Influencer) => {
    setEditingInfluencer(influencer);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingInfluencer(null);
  };

  const handleSubmitForm = async (influencerData: Omit<Influencer, 'id' | 'totalViews'>) => {
    if (editingInfluencer) {
      const updatedInfluencer: Influencer = {
        ...editingInfluencer,
        ...influencerData,
        totalViews: influencerData.viewsMedian * 5
      };
      await updateInfluencer(updatedInfluencer);
    } else {
      await addInfluencer(influencerData);
    }
    setShowForm(false);
    setEditingInfluencer(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="mr-3" size={28} />
              <h1 className="text-2xl font-bold">Influencer Campaign Tracker</h1>
            </div>
            <button
              onClick={handleAddInfluencer}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-800 hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <Plus className="mr-1" size={18} />
              Add Influencer
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {showForm ? (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingInfluencer ? 'Edit Influencer' : 'Add New Influencer'}
              </h2>
              <button
                onClick={handleCancelForm}
                className="inline-flex items-center text-gray-500 hover:text-gray-700"
              >
                <X size={18} className="mr-1" />
                Close
              </button>
            </div>
            <InfluencerForm
              onSubmit={handleSubmitForm}
              initialData={editingInfluencer || undefined}
              onCancel={handleCancelForm}
              saving={saving}
            />
          </div>
        ) : (
          <>
            <TableFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              campaignTotalViews={getCampaignTotalViews()}
            />
            
            <InfluencerTable
              influencers={influencers}
              onEdit={handleEditInfluencer}
              onDelete={deleteInfluencer}
              onTogglePaid={togglePaidStatus}
              onSort={requestSort}
              sortConfig={sortConfig}
              loading={loading}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;