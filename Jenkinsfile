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
    }
}