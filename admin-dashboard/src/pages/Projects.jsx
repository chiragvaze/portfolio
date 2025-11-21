import React, { useEffect, useState } from 'react';
import { projectAPI } from '../services/api';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    technologies: [],
    category: 'web',
    status: 'completed',
    links: { live: '', github: '' }
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await projectAPI.update(editingProject._id, formData);
        toast.success('Project updated!');
      } else {
        await projectAPI.create(formData);
        toast.success('Project created!');
      }
      resetForm();
      loadProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await projectAPI.delete(id);
        toast.success('Project deleted');
        loadProjects();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      technologies: [],
      category: 'web',
      status: 'completed',
      links: { live: '', github: '' }
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const startEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || '',
      technologies: project.technologies || [],
      category: project.category,
      status: project.status,
      links: project.links || { live: '', github: '' }
    });
    setEditingProject(project);
    setShowForm(true);
  };

  if (loading) {
    return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={20} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingProject ? 'Edit' : 'New'} Project</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                className="input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                className="input"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Category</label>
                <select
                  className="input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select
                  className="input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Technologies (comma-separated)</label>
              <input
                className="input"
                value={formData.technologies.join(', ')}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()) })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Live URL</label>
                <input
                  className="input"
                  value={formData.links.live}
                  onChange={(e) => setFormData({ ...formData, links: { ...formData.links, live: e.target.value } })}
                />
              </div>
              <div>
                <label className="label">GitHub URL</label>
                <input
                  className="input"
                  value={formData.links.github}
                  onChange={(e) => setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })}
                />
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
        {projects.map((project) => (
          <div key={project._id} className="card">
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies?.slice(0, 3).map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{tech}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => startEdit(project)} className="btn btn-secondary flex-1 flex items-center justify-center gap-1">
                <Edit2 size={16} /> Edit
              </button>
              <button onClick={() => handleDelete(project._id)} className="btn btn-danger flex-1 flex items-center justify-center gap-1">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects yet. Add your first project!</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
