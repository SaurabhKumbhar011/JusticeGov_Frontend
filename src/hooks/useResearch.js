import { useState } from "react";
import * as researchService from "../services/researchService";

export const useResearch = () => {
  const [projects, setProjects] = useState([]);
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await researchService.getProjects();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  const loadGrants = async () => {
    try {
      setLoading(true);
      const data = await researchService.getGrants();
      setGrants(data);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project) => {
    const newProject = await researchService.createProject(project);
    setProjects((prev) => [...prev, newProject]);
  };

  const addGrant = async (grant) => {
    const newGrant = await researchService.applyGrant(grant);
    setGrants((prev) => [...prev, newGrant]);
  };

  return {
    projects,
    grants,
    loading,
    loadProjects,
    loadGrants,
    addProject,
    addGrant
  };
};