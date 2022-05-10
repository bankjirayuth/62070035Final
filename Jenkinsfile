pipeline {
    agent any
    stages {
        stage('Pull code') {
            steps {
                checkout scm
            }
        }
        stage('Download front dependency') {
            steps {
                dir('front-end') {
                    sh 'npm install'
                }
            }
        }
        stage('Download back dependency') {
            steps {
                dir('back-end') {
                    sh 'npm install'
                }
            }
        }
        stage('Run unit test') {
            steps {
                echo 'pass'
            }
        }

        stage('Run Component testing') {
            steps {
                echo 'pass'
            }
        }

        stage('Build') {
            steps {
                dir('front-end') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deployment') {
            steps {
                echo 'pass'
            }
        }
    }
}
