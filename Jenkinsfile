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
                    myapp = docker.build("gustavogamboa/devops-demo:${env.BUILD_ID}")
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
            when { branch 'master' }
            steps{
                sh("kubectl get ns production  ||  kubectl create ns production ")
                sh "sed -i 's/devops-demo:latest/devops-demo:${env.BUILD_ID}/g' ./k8s/production/*.yaml"
                step([$class: 'KubernetesEngineBuilder', namespace:'production', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME_TEST, location: env.LOCATION_TEST, manifestPattern: './k8s/services/*.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])                
                step([$class: 'KubernetesEngineBuilder', namespace:'production', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME_TEST, location: env.LOCATION_TEST, manifestPattern: './k8s/production/*.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }        
        stage('Deploy to GKE production cluster') {
            when { branch 'master' }
            steps{                                                         
                input message:"Proceed with final deployment?"
                step([$class: 'KubernetesEngineBuilder', namespace: 'production', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME_PROD, location: env.LOCATION_PROD, manifestPattern: './k8s/services/*.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])                
                step([$class: 'KubernetesEngineBuilder', namespace: 'production', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME_PROD, location: env.LOCATION_PROD, manifestPattern: './k8s/production/*.yaml', credentialsId: env.CREDENTIALS_ID, verifyDeployments: true])
            }
        }
    }    
}