import React, { useEffect, useState } from 'react';
import { experienceAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    type: 'work',
    title: '',
    organization: '',
    description: '',
    startDate: '',
    endDate: '',
    current: false
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const response = await experienceAPI.getAll();
      setExperiences(response.data);
    } catch (error) {
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await experienceAPI.update(editingItem._id, formData);
        toast.success('Updated!');
      } else {
        await experienceAPI.create(formData);
        toast.success('Created!');
      }
      resetForm();
      loadExperiences();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await experienceAPI.delete(id);
        toast.success('Deleted');
        loadExperiences();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({ type: 'work', title: '', organization: '', description: '', startDate: '', endDate: '', current: false });
    setEditingItem(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experience & Education</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Item
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingItem ? 'Edit' : 'New'} Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Type</label>
              <select className="input" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                <option value="work">Work</option>
                <option value="education">Education</option>
                <option value="project">Project</option>
              </select>
            </div>
            <div>
              <label className="label">Title/Degree</label>
              <input className="input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <label className="label">Organization/School</label>
              <input className="input" value={formData.organization} onChange={(e) => setFormData({ ...formData, organization: e.target.value })} required />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Start Date</label>
                <input className="input" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              </div>
              <div>
                <label className="label">End Date</label>
                <input className="input" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} disabled={formData.current} />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.current} onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })} />
              <span className="text-sm">Currently here</span>
            </label>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="card">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded uppercase">{exp.type}</span>
                <h3 className="text-lg font-semibold mt-2">{exp.title}</h3>
                <p className="text-gray-600">{exp.organization}</p>
                <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setFormData(exp); setEditingItem(exp); setShowForm(true); }} className="btn btn-secondary p-2">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(exp._id)} className="btn btn-danger p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
