pipeline {
    agent any

    options {
        timeout(time: 60, unit: 'MINUTES')  // Match GitHub timeout
        buildDiscarder(logRotator(numToKeepStr: '10'))  // Keep last 10 builds
    }

    environment {
        BASE_URL = credentials('BASE_URL')         
        LOGIN_USER = credentials('LOGIN_USER')       
        LOGIN_PASSWORD = credentials('LOGIN_PASSWORD')    
        NODE_ENV = 'production'
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
                sh 'npm ci --prefer-offline --no-audit'
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
                  export LOGIN_PASSWORD=${LOGIN_PASSWORD}
                  npx playwright test --reporter=html,line
                '''
            }
            post {
                always {
                    // Archive test results regardless of success/failure
                    archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                    
                    // Publish HTML report if available
                    publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Test Report'
                    ])
                }
                failure {
                    echo 'Tests failed! Check the test results and reports for details.'
                }
                success {
                    echo 'All tests passed successfully!'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
