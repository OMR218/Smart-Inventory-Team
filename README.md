# Smart Inventory Management System (SIMS)

## Project Overview
The **Smart Inventory Management System (SIMS)** is designed to help businesses efficiently track inventory in real-time, generate low-stock alerts, and produce comprehensive reports. This project emphasizes **automation and DevOps practices**—students will containerize microservices, implement CI/CD pipelines, deploy on Kubernetes, and automate infrastructure with Terraform and Ansible.  
**Note:** No AI components are required.

---

## Problem Addressed
Many businesses face inefficient inventory tracking, leading to:  
- Stock-outs  
- Overstocking  

SIMS solves this by providing real-time tracking, automated alerts, and insightful reporting.

---

## Team Members
- **[Omar Mohamed Hussain Sayed]**   
- **[Ahmed Abdelatty Omran Ali]** 
- **[Ahmed Abdelrazek Moussa Abdelrazek]**
- **[Essam Elsayed Mahmoud]**   
- **[Mahmoud Mohamed Sami]** 
- **[Habiba Mohamed Ahmed Shwky]**
- **[Marwan Mohey  Mahmoud]** 

---

## Project Plan

### 1. Research & Analysis
- Identify business requirements and workflows for inventory tracking.  
- Define audience personas: warehouse managers, sales teams, and inventory clerks.  

### 2. Architecture & Design
- Microservices architecture for inventory and alert services.  
- CI/CD pipeline design using **Jenkins** for automated testing and deployment.  
- Kubernetes cluster design for scalable deployments.  

### 3. Development & Implementation
- Dockerize all services (Inventory, Alerts, Dashboard).  
- Build web dashboard for managers to view inventory status.  
- Implement **Prometheus** monitoring and **Grafana** dashboards.  
- Configure **Nginx** for secure access to the dashboard.  

### 4. Infrastructure Automation
- **Terraform** scripts for provisioning AWS EC2 instances, S3 buckets, and VPCs.  
- **Ansible** scripts for server setup, service deployment, and configuration management.  

### 5. Testing & Review
- Test CI/CD pipeline functionality for automated deployments.  
- Test Kubernetes deployment for scalability and fault tolerance.  
- Validate monitoring and alert services.  

### 6. Final Presentation
- Prepare slides showcasing architecture, CI/CD, Kubernetes deployment, and automation.  
- Demonstrate a live system with Dockerized services and dashboard monitoring.  

---

## Deliverables
- Inventory tracking microservice (Dockerized)  
- Low-stock alert service  
- Web dashboard for managers  
- CI/CD pipeline for automated updates  
- Kubernetes deployment for scalable services  
- Prometheus monitoring for system and container metrics  
- Nginx configuration for dashboard access  
- Terraform scripts for AWS infrastructure  
- Ansible scripts for server/service configuration  
- Git repository with all code, scripts, and documentation  

---

## Tools & Technologies
| Category                | Tools / Technology                   |
|-------------------------|-------------------------------------|
| CI/CD                   | Jenkins                              |
| Containerization        | Docker                               |
| Orchestration           | Kubernetes                           |
| Monitoring              | Prometheus, Grafana                  |
| Automation              | Ansible, Terraform                   |
| Cloud Infrastructure    | AWS EC2, S3, VPC                     |
| Web Access              | Nginx                                |
| Version Control         | Git                                  |

---

## Key Performance Indicators (KPIs)
- **System uptime:** ≥ 99%  
- **Inventory query response time:** ≤ 2 seconds  
- **User adoption rate:** ≥ 80% of intended users in the first month  
- **Stock-out reduction:** ≥ 50% in first quarter  

---

## Getting Started
1. Clone the repository:  
```bash
git clone https://github.com/yourusername/smart-inventory-system.git