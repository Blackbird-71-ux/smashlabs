# GitHub Secrets Configuration

This document explains how to configure the GitHub secrets used in the CI/CD pipeline for optimal functionality.

## Required Secrets

### Optional but Recommended

These secrets are not required for the pipeline to run, but they enable additional features:

#### 1. `CODECOV_TOKEN`
- **Purpose**: Upload test coverage reports to Codecov
- **How to get**: 
  1. Go to [codecov.io](https://codecov.io)
  2. Sign up/login with your GitHub account
  3. Add your repository
  4. Copy the upload token
- **How to configure**: 
  1. Go to your GitHub repository → Settings → Secrets and variables → Actions
  2. Click "New repository secret"
  3. Name: `CODECOV_TOKEN`
  4. Value: Your Codecov upload token

#### 2. `LHCI_GITHUB_APP_TOKEN`
- **Purpose**: Enable Lighthouse CI with GitHub integration for performance monitoring
- **How to get**:
  1. Install the Lighthouse CI GitHub App on your repository
  2. Get your token from the Lighthouse CI dashboard
- **How to configure**:
  1. Go to your GitHub repository → Settings → Secrets and variables → Actions
  2. Click "New repository secret"
  3. Name: `LHCI_GITHUB_APP_TOKEN`
  4. Value: Your Lighthouse CI token
- **Alternative**: If not configured, the pipeline will run basic Lighthouse audits and upload reports as artifacts

#### 3. `SNYK_TOKEN`
- **Purpose**: Enhanced security scanning with Snyk
- **How to get**:
  1. Sign up at [snyk.io](https://snyk.io)
  2. Go to Account Settings → API Token
  3. Copy your API token
- **How to configure**:
  1. Go to your GitHub repository → Settings → Secrets and variables → Actions
  2. Click "New repository secret"
  3. Name: `SNYK_TOKEN`
  4. Value: Your Snyk API token
- **Alternative**: If not configured, the pipeline will run `npm audit` for security scanning

## What happens without these secrets?

The CI pipeline is designed to work without any secrets configured:

- **Without `CODECOV_TOKEN`**: Coverage reports are still generated but not uploaded to Codecov
- **Without `LHCI_GITHUB_APP_TOKEN`**: Basic Lighthouse audits run and reports are uploaded as GitHub artifacts
- **Without `SNYK_TOKEN`**: Security scanning uses `npm audit` instead of Snyk

## Configuring Secrets

1. Navigate to your GitHub repository
2. Go to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Enter the secret name and value
5. Click **Add secret**

## Security Best Practices

- Never commit secrets to your repository
- Regularly rotate your tokens
- Use the principle of least privilege for API tokens
- Monitor secret usage in the Actions logs
- Consider using environment-specific secrets for different deployment stages

## Troubleshooting

If you see warnings about "Context access might be invalid", it means:
- The secret is referenced in the workflow but not configured in the repository
- This is expected behavior and the pipeline will gracefully handle missing secrets
- Configure the secrets following the instructions above to remove the warnings 