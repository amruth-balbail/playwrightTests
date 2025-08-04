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
                script {
                    // Try to use NodeJS tool if available, otherwise use system Node.js
                    try {
                        tool name: 'node-lts', type: 'NodeJS'
                        echo 'Using Jenkins NodeJS tool'
                    } catch (Exception e) {
                        echo 'NodeJS tool not found, using system Node.js'
                        // Check if Node.js is available on the system
                        bat 'node --version || echo "Node.js not found on system"'
                    }
                }
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install dependencies') {
            steps {
                bat 'npm ci --prefer-offline --no-audit'
            }
        }

        stage('Run Playwright tests') {
            steps {
                // Export env variables and run tests
                bat '''
                  set BASE_URL=%BASE_URL%
                  set LOGIN_USER=%LOGIN_USER%
                  set LOGIN_PASSWORD=%LOGIN_PASSWORD%
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
