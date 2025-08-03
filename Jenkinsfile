pipeline {
    agent { label 'linux' }  // Use an Ubuntu/Linux Jenkins agent

    options {
        timeout(time: 60, unit: 'MINUTES')  // Match GitHub timeout
    }

    environment {
        BASE_URL = credentials('BASE_URL')         
        LOGIN_USER = credentials('LOGIN_USER')       
        PASSWORD = credentials('LOGIN_PASSWORD')    
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                // Assuming NodeJS plugin is installed and configured with a 'node-lts' tool name
                tool name: 'node-lts', type: 'NodeJS'
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright tests') {
            steps {
                // Export env variables and run tests
                sh '''
                  export BASE_URL=${BASE_URL}
                  export LOGIN_USER=${LOGIN_USER}
                  export PASSWORD=${PASSWORD}
                  npx playwright test
                '''
            }
            post {
                failure {
                    archiveArtifacts artifacts: 'global-setup-error.png, test-results/**', allowEmptyArchive: true
                }
            }
        }

        stage('Archive Playwright Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
