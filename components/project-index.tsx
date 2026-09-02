import { projects } from "@/content/projects";
import { ArrowUpRight } from "./icons";

export function ProjectIndex() {
  return <div className="project-index">{projects.map((project, index) => (
    <a href={project.href} target="_blank" rel="noreferrer" key={project.name}>
      <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
      <div><span className="project-category">{project.category}</span><h3>{project.name}</h3></div>
      <p>{project.description}</p>
      <span className="project-proof">{project.proof}</span>
      <span className="sr-only">Opens {project.name} on GitHub in a new tab</span>
      <ArrowUpRight />
    </a>
  ))}</div>;
}
