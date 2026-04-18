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
                sh '''
                    docker tag api-gateway omr21/api-gateway:latest
                    docker tag auth-service omr21/auth-service:latest
                    docker tag product-service omr21/product-service:latest
                    docker tag frontend omr21/frontend:latest

                    docker push omr21/api-gateway:latest
                    docker push omr21/auth-service:latest
                    docker push omr21/product-service:latest
                    docker push omr21/frontend:latest
                '''
            }
        }
    }
}