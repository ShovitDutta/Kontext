pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ShovitDutta/kontext.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }
        stage('Lint & Build') {
            steps {
                bat 'npm run build'
            }
        }
    }
    post {
        success {
            echo 'Build successful!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}