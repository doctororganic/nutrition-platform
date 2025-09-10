// Configuration for different environments
class Config {
  constructor() {
    this.environment = this.detectEnvironment();
    this.config = this.getConfig();
  }

  detectEnvironment() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    } else if (hostname.includes('staging') || hostname.includes('test')) {
      return 'staging';
    } else {
      return 'production';
    }
  }

  getConfig() {
    const configs = {
      development: {
        apiBaseUrl: 'http://localhost:8081',
        environment: 'development',
        debug: true,
        logLevel: 'debug'
      },
      staging: {
        apiBaseUrl: 'https://staging.nutrition-site.com',
        environment: 'staging',
        debug: true,
        logLevel: 'info'
      },
      production: {
        apiBaseUrl: 'https://nutrition-site.com',
        environment: 'production',
        debug: false,
        logLevel: 'error'
      }
    };

    return configs[this.environment] || configs.production;
  }

  get(key) {
    return this.config[key];
  }

  isDevelopment() {
    return this.environment === 'development';
  }

  isProduction() {
    return this.environment === 'production';
  }

  isStaging() {
    return this.environment === 'staging';
  }
}

// Global config instance
window.AppConfig = new Config();
