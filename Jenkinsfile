pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh '''
                    docker build -t api-gateway ./api-gateway
                    docker build -t auth-service ./auth-service
                    docker build -t product-service ./product-service
                    docker build -t order-service ./order-service
                    docker build -t supplier-service ./supplier-service
                    docker build -t notification-service ./notification-service
                    docker build -t frontend ./frontend
                '''
            }
        }
        stage('Test') {
            steps {
                sh '''
                    docker compose -f docker-compose.test.yml up --build --abort-on-container-exit || \
                    docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
                '''
            }
            post {
                always {
                    sh '''
                        docker compose -f docker-compose.test.yml down --remove-orphans || \
                        docker-compose -f docker-compose.test.yml down --remove-orphans
                    '''
                }
            }
        }
        stage ('DockerHub Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh '''
                        docker tag api-gateway $DOCKERHUB_USERNAME/api-gateway:latest
                        docker tag auth-service $DOCKERHUB_USERNAME/auth-service:latest
                        docker tag product-service $DOCKERHUB_USERNAME/product-service:latest
                        docker tag order-service $DOCKERHUB_USERNAME/order-service:latest
                        docker tag supplier-service $DOCKERHUB_USERNAME/supplier-service:latest
                        docker tag notification-service $DOCKERHUB_USERNAME/notification-service:latest
                        docker tag frontend $DOCKERHUB_USERNAME/frontend:latest

                        docker push $DOCKERHUB_USERNAME/api-gateway:latest
                        docker push $DOCKERHUB_USERNAME/auth-service:latest
                        docker push $DOCKERHUB_USERNAME/product-service:latest
                        docker push $DOCKERHUB_USERNAME/order-service:latest
                        docker push $DOCKERHUB_USERNAME/supplier-service:latest
                        docker push $DOCKERHUB_USERNAME/notification-service:latest
                        docker push $DOCKERHUB_USERNAME/frontend:latest
                    '''
                }
                
            }
        }
        stage('Terraform init') {
            steps {
                dir('Terraform') {
                    sh 'terraform init'
                }
            }
        }
        stage('Terraform validate') {
            steps {
                dir('Terraform') {
                    sh 'terraform validate'
                }
            }
        }
        stage('Terraform plan') {
            steps {
                dir('Terraform') {
                    sh 'terraform plan'
                }
            }
        }
        stage('Terraform apply') {
            steps {
                dir('Terraform') {
                    sh 'terraform apply -auto-approve'
                }
            }
        }
        stage('Update kubeconfig'){
            steps {
                sh '''
                    aws eks update-kubeconfig \
                    --region us-east-1 \
                    --name dev-cluster
                '''
            }
        }
        stage('Wait for EKS Nodes') {
            steps {
                sh '''
                    kubectl wait --for=condition=Ready nodes --all --timeout=10m
                '''
            }
        }
        stage('Install NGINX Ingress Controller') {
            steps {
                sh '''
                    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
                    helm repo update

                    kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -

                    helm upgrade --install ingress-nginx ingress-nginx/ingress-nginx \
                      --namespace ingress-nginx \
                      --set controller.service.type=LoadBalancer
                    
                    kubectl rollout status deployment/ingress-nginx-controller \
                      -n ingress-nginx \
                      --timeout=5m
                '''
            }
        }
        stage('Deployment to EKS') {
            steps {
                sh '''
                    # Storage
                    kubectl apply -f k8s/storageclass.yaml
                    kubectl apply -f k8s/mongo-pvc.yaml

                    # Secrets & ConfigMaps
                    kubectl apply -f k8s/secret.yaml
                    kubectl apply -f k8s/mongo-init-configmap.yaml

                    # Database
                    kubectl apply -f k8s/mongo-deployment.yaml
                    kubectl apply -f k8s/mongo-cluster-ip-service.yaml

                    # Infrastructure Services
                    kubectl apply -f k8s/redis-deployment.yaml
                    kubectl apply -f k8s/rabbitmq-deployment.yaml

                    # Backend Services
                    kubectl apply -f k8s/api-gateway-deployment.yaml
                    kubectl apply -f k8s/api-gateway-cluster-ip-service.yaml

                    kubectl apply -f k8s/auth-service-deployment.yaml
                    kubectl apply -f k8s/auth-service-cluster-ip-service.yaml

                    kubectl apply -f k8s/product-service-deployment.yaml
                    kubectl apply -f k8s/product-service-cluster-ip-service.yaml

                    kubectl apply -f k8s/order-service-deployment.yaml

                    kubectl apply -f k8s/supplier-service-deployment.yaml

                    kubectl apply -f k8s/notification-service-deployment.yaml

                    # Frontend
                    kubectl apply -f k8s/frontend-deployment.yaml
                    kubectl apply -f k8s/frontend-cluster-ip-service.yaml

                    # Ingress
                    kubectl apply -f k8s/ingress-service.yaml
                '''
            }
        }
    }
}