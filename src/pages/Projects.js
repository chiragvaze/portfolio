import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: 'Project One',
            description: 'Description of project one.',
            link: 'https://linkto.projectone.com',
        },
        {
            id: 2,
            title: 'Project Two',
            description: 'Description of project two.',
            link: 'https://linkto.projecttwo.com',
        },
        {
            id: 3,
            title: 'Project Three',
            description: 'Description of project three.',
            link: 'https://linkto.projectthree.com',
        },
    ];

    return (
        <div className="projects">
            <h1>My Projects</h1>
            <div className="project-list">
                {projects.map(project => (
                    <ProjectCard 
                        key={project.id} 
                        title={project.title} 
                        description={project.description} 
                        link={project.link} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;