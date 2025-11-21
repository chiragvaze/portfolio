import React, { useEffect, useState } from 'react';
import { certificationAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: '',
    icon: 'fas fa-certificate',
    issueDate: ''
  });

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const response = await certificationAPI.getAll();
      setCertifications(response.data);
    } catch (error) {
      toast.error('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await certificationAPI.update(editingItem._id, formData);
        toast.success('Updated!');
      } else {
        await certificationAPI.create(formData);
        toast.success('Created!');
      }
      resetForm();
      loadCertifications();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this certification?')) {
      try {
        await certificationAPI.delete(id);
        toast.success('Deleted');
        loadCertifications();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', platform: '', icon: 'fas fa-certificate', issueDate: '' });
    setEditingItem(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Certifications</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Certification
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingItem ? 'Edit' : 'New'} Certification</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input className="input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Platform</label>
                <input className="input" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} required />
              </div>
              <div>
                <label className="label">Issue Date</label>
                <input className="input" value={formData.issueDate} onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={resetForm} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert._id} className="card">
            <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{cert.description}</p>
            <p className="text-sm font-medium text-blue-600 mb-3">{cert.platform}</p>
            {cert.issueDate && <p className="text-xs text-gray-500">Issued: {cert.issueDate}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={() => { setFormData(cert); setEditingItem(cert); setShowForm(true); }} className="btn btn-secondary flex-1 flex items-center justify-center gap-1">
                <Edit2 size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(cert._id)} className="btn btn-danger flex-1 flex items-center justify-center gap-1">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
