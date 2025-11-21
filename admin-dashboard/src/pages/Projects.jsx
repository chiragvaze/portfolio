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
    featured: false,
    links: { live: '', github: '' },
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);

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
      let projectData = { ...formData };
      
      // Upload image if selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);
        
        const uploadResponse = await projectAPI.uploadImage(
          editingProject?._id || 'temp',
          imageFormData
        );
        
        if (!editingProject) {
          // For new project, create first then upload image
          const createResponse = await projectAPI.create(formData);
          const projectId = createResponse.data._id;
          
          const imageFormData2 = new FormData();
          imageFormData2.append('image', imageFile);
          await projectAPI.uploadImage(projectId, imageFormData2);
          
          toast.success('Project created with image!');
          resetForm();
          loadProjects();
          return;
        } else {
          projectData.image = uploadResponse.data.url;
        }
      }
      
      if (editingProject) {
        await projectAPI.update(editingProject._id, projectData);
        toast.success('Project updated!');
      } else {
        await projectAPI.create(projectData);
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
      featured: false,
      links: { live: '', github: '' },
      image: ''
    });
    setImageFile(null);
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
      featured: project.featured || false,
      links: project.links || { live: '', github: '' },
      image: project.image || ''
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
              <label className="label">Project Title *</label>
              <input
                className="input"
                placeholder="e.g., E-commerce Platform"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="label">Short Description * (appears on cards)</label>
              <textarea
                className="input"
                rows="2"
                placeholder="A brief one-line description of your project..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label className="label">Detailed Description (optional)</label>
              <textarea
                className="input"
                rows="4"
                placeholder="Detailed explanation of features, challenges, and outcomes..."
                value={formData.longDescription}
                onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
              />
            </div>
            
            <div>
              <label className="label">Project Image</label>
              {formData.image && (
                <div className="mb-2">
                  <img src={formData.image} alt="Preview" className="w-32 h-32 object-cover rounded" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="input"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <p className="text-sm text-gray-500 mt-1">Upload a screenshot or preview image</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Category</label>
                <select
                  className="input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="desktop">Desktop App</option>
                  <option value="tool">Tool/Utility</option>
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
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="label">Technologies Used * (comma-separated)</label>
              <input
                className="input"
                placeholder="e.g., React, Node.js, MongoDB, Express"
                value={formData.technologies.join(', ')}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                required
              />
              <p className="text-sm text-gray-500 mt-1">Separate technologies with commas</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Live Demo URL (optional)</label>
                <input
                  className="input"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.links.live}
                  onChange={(e) => setFormData({ ...formData, links: { ...formData.links, live: e.target.value } })}
                />
              </div>
              <div>
                <label className="label">GitHub Repository (optional)</label>
                <input
                  className="input"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={formData.links.github}
                  onChange={(e) => setFormData({ ...formData, links: { ...formData.links, github: e.target.value } })}
                />
              </div>
            </div>
            
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                />
                <span>Mark as Featured Project</span>
              </label>
            </div>
            
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
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
