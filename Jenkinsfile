pipeline {
    agent any
    environment {
        PROJECT_ID = 'ggamboac-201504429-01'
        CREDENTIALS_ID = 'ggamboac-201504429-01'

        CLUSTER_NAME = 'devops'
        LOCATION = 'us-central1-c'        

        CLUSTER_NAME_TEST = 'devops-demo-test'
        LOCATION_TEST = 'us-east1-c'

        CLUSTER_NAME_PROD = 'devops-demo-prod'
        LOCATION_PROD = 'us-west1-a'
                       
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage("Install Dependencies") {
            steps {
                sh "npm install"    
                sh "npm install mocha --save"                                
            }
        }        
        stage("Run Test") {
            steps {
                sh "npm run test"
            }
        }                
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("gustavogamboa/hello:${env.BUILD_ID}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }    
        stage('Deploy to GKE test cluster') {
            steps{
                sh "sed -i 's/hello:latest/hello:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME_TEST, location: env.LOCATION_TEST, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }        
        stage('Deploy to GKE production cluster') {
            steps{                                                         
                input message:"Proceed with final deployment?"
                step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME_PROD, location: env.LOCATION_PROD, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}