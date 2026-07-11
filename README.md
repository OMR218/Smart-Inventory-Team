# Smart Inventory & Team Monitoring System

A cloud-native, microservices-based inventory management and monitoring platform designed to demonstrate modern DevOps best practices, containerization, Infrastructure as Code (IaC), CI/CD, and distributed observability.

---

## 👥 Team Members

*   **Mahmoud Mohamed Sami Mohamed**
*   **Omar Mohamed Hussain**
*   **Ahmed Abdelrazek Moussa Hantera**
*   **Habiba Mohamed**
*   **Ahmed Abdelatty Omran Ali**
*   **Essam Elsayed Mahmoud Zayed**
*   **Marwan mohy mahmoud**

---

## 🚀 Key Features

*   **Microservices Architecture:** Decoupled, specialized services communicating via API Gateway and messaging protocols.
*   **Event-Driven & Caching:** RabbitMQ for asynchronous event-driven notifications; Redis for fast database caching.
*   **Infrastructure as Code (IaC):** Provisioned VPC, Security Groups, and EKS Cluster on AWS using Terraform.
*   **Orchestration & Deployments:** Managed using Kubernetes (K8s) manifests (Ingress, Services, Deployments, PVCs).
*   **Automated CI/CD:** Fully automated Jenkins pipeline handling build, unit/integration testing, Docker Hub registry uploads, and EKS deployments.
*   **Full-Stack Monitoring:** Observability with Prometheus & Grafana (Helm Kube-Prometheus-Stack) including custom inventory dashboard rules.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React | Modern UI dashboard |
| **API Gateway** | Node.js + Express | Centralized request routing & validation |
| **Backend Services** | Node.js + Express | Auth, Product, Order, Supplier, and Notification services |
| **Databases & Cache** | MongoDB + Redis | Main document store and high-performance cache |
| **Message Broker** | RabbitMQ | Service-to-service asynchronous notification events |
| **Infrastructure (IaC)** | Terraform | Automated AWS resources (VPC, EKS, NodeGroups) |
| **Container & Orchestration** | Docker + Kubernetes | Containerization, pods management, and Ingress routing |
| **CI/CD** | Jenkins | Multi-stage pipeline automation |
| **Monitoring / Helm** | Prometheus + Grafana | System observability and telemetry metrics |

---

## 📐 Architecture Diagram

```
                       ┌─────────────────────────┐
                       │      React Frontend     │ (Port 3000)
                       └────────────┬────────────┘
                                    │
                                    ▼
                       ┌─────────────────────────┐
                       │       API Gateway       │ (Port 8081)
                       └────────────┬────────────┘
                                    │
      ┌──────────────────────┬──────┴───────┬──────────────────────┐
      ▼                      ▼              ▼                      ▼
┌───────────┐          ┌───────────┐  ┌───────────┐          ┌───────────┐
│   Auth    │          │  Product  │  │   Order   │          │ Supplier  │
│  Service  │          │  Service  │  │  Service  │          │  Service  │
└─────┬─────┘          └─────┬─────┘  └─────┬─────┘          └─────┬─────┘
      │                      │              │                      │
      └──────────────┬───────┴──────────────┼─────────┬────────────┘
                     │                      │         │
                     ▼                      ▼         ▼
               ┌───────────┐          ┌───────────┐ ┌───────────┐
               │  MongoDB  │          │   Redis   │ │ RabbitMQ  │
               └───────────┘          └───────────┘ └─────┬─────┘
                                                          │ (Event Bus)
                                                          ▼
                                                    ┌───────────┐
                                                    │Notification│
                                                    │  Service  │
                                                    └───────────┘
```

---

## 📂 Project Structure

```
Smart-Inventory-Team-Monitoring/
├── api-gateway/            # Central entry point and routing proxy
├── auth-service/           # User authentication and token validation
├── product-service/        # Product catalogue and inventory database ops
├── order-service/          # Customer orders database management
├── supplier-service/       # Supplier contact and details registry
├── notification-service/   # Asynchronous email/alert dispatcher
├── frontend/               # React client web application
├── db/                     # DB initialization scripts
├── Terraform/              # Infrastructure code for AWS (EKS, VPC, SG)
├── k8s/                    # Kubernetes manifests and custom dashboard rules
├── helm/                   # Helm charts configuration (Prometheus & Grafana)
├── Jenkinsfile             # Declarative pipeline for CI/CD automation
├── docker-compose.yml      # Local dev multi-container execution
└── docker-compose.test.yml # Test suite composition
```

---

## ⚡ Getting Started

### Local Development (Docker Compose)
To launch all services, databases, and message brokers locally:

```bash
# Clone the repository and navigate to root
git clone <repository-url>
cd Smart-Inventory-Team-Monitoring

# Start all containers in the background
docker compose up --build -d
```
Access the application:
*   **Frontend UI:** `http://localhost:3000`
*   **API Gateway:** `http://localhost:8081`

To run integration tests:
```bash
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit
```

---

## ☁️ Production Deployment

### 1. Infrastructure Provisioning (Terraform)
Navigate to the `Terraform` folder to provision the VPC and EKS cluster on AWS:
```bash
cd Terraform
terraform init
terraform apply -auto-approve
```

### 2. Kubernetes & Monitoring Deployment (Helm)
Apply K8s manifests and set up Prometheus + Grafana stack for EKS cluster monitoring:
```bash
# Apply K8s microservice manifests
kubectl apply -f k8s/

# Install Prometheus Operator & Grafana via Helm
cd helm/monitoring
chmod +x install.sh
./install.sh
```

### 3. CI/CD Integration (Jenkins)
Configure a Jenkins project pointing to this repository. The `Jenkinsfile` will automate:
1. Building all Docker images.
2. Running integration tests.
3. Pushing artifacts to Docker Hub.
4. Deploying/updating resources in the AWS EKS Cluster.
